const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const User = require('./models/user');
const nodemailer = require('nodemailer');
const config = require('./config.json');

let tempUser = null;

function serveFile(res, filepath, contentType) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

function renderReminderPage(user) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Send Password</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <main>
        <h1>Send Password</h1>
        <p>Send password to: <strong>${user.email}</strong></p>
        <form action="/send-email" method="POST">
          <button type="submit">Send</button>
        </form>
      </main>
    </body>
    </html>
  `;
}

function renderMessage(msg) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Reminder</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <main>
        <h1>Password Reminder</h1>
        <div class="message">${msg}</div>
      </main>
    </body>
    </html>
  `;
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            return serveFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
        }

        if (req.url === '/style.css') {
            return serveFile(res, path.join(__dirname, 'public', 'style.css'), 'text/css');
        }

        res.writeHead(404);
        return res.end('404 Not Found');
    }

    if (req.method === 'POST' && req.url === '/reminder') {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
            const { identity } = parse(body);
            const user = await User.getByLoginOrEmail(identity);

            if (!user) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(renderMessage('No user found with that login or email.'));
            }

            tempUser = user;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderReminderPage(user));
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/send-email') {
        if (!tempUser) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(renderMessage('Session expired. Start again.'));
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.email_pass
            }
        });

        const mailOptions = {
            from: config.email,
            to: tempUser.email,
            subject: 'Your Password Reminder',
            text: `Your login: ${tempUser.login}\nYour password: ${tempUser.password}`
        };

        try {
            transporter.sendMail(mailOptions);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderMessage('Password sent successfully.'));
        } catch (err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderMessage('Failed to send email.'));
        }

        tempUser = null;
        return;
    }

    res.writeHead(404);
    res.end('404 Not Found');
});

server.listen(5055, () => {
    console.log('Server running at http://localhost:5055');
});
