const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const nodemailer = require('nodemailer');
const config = require('../config.json');
const User = require('../models/user');

let tempUser = null;

function renderHTML(res, filepath) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Server error');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function renderResult(res, message, status = 'success') {
    const file = path.join(__dirname, '../views/result.html');
    fs.readFile(file, 'utf8', (err, html) => {
        if (err) return res.end('Render error');
        html = html.replace('{{message}}', message).replace('{{status}}', status);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
}

module.exports = {
    renderForm(res) {
        const file = path.join(__dirname, '../views/reminder.html');
        renderHTML(res, file);
    },

    async findUser(req, res) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { identity } = parse(body);
            const user = await User.getByLoginOrEmail(identity);

            if (!user) {
                return renderResult(res, 'User not found.', 'error');
            }

            tempUser = user;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
        <main>
          <h1>Confirm Password Reminder</h1>
          <p>Send password to: <strong>${user.email}</strong></p>
          <form action="/send-email" method="POST">
            <button>Send</button>
          </form>
        </main>
      `);
        });
    },

    async sendEmail(req, res) {
        if (!tempUser) {
            return renderResult(res, 'Session expired. Try again.', 'error');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.email_pass
            }
        });

        try {
            await transporter.sendMail({
                from: config.email,
                to: tempUser.email,
                subject: 'Your Password Reminder',
                text: `Login: ${tempUser.login}\nPassword: ${tempUser.password}`
            });

            renderResult(res, 'Password sent to your email.');
            tempUser = null;
        } catch (err) {
            renderResult(res, 'Failed to send email.', 'error');
        }
    }
};
