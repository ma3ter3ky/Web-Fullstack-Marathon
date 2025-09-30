const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const User = require('./models/user');

const PORT = 5055;
const sessions = {};

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

function parseCookies(cookieHeader = '') {
    return Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('=').map(decodeURIComponent))
    );
}

function renderLoginForm(message = '', status = '') {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Login</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <main>
        <h1>Login</h1>
        <form action="/login" method="POST">
          <label for="login">Login:</label>
          <input type="text" name="login" id="login" required />
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Login</button>
        </form>
        ${message ? `<div class="message ${status}">${message}</div>` : ''}
      </main>
    </body>
    </html>
  `;
}

function renderStatusPage(user) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Status</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <main>
        <h1>Welcome, ${user.fullname}</h1>
        <div class="status">You are logged in!</div>
        <form action="/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </main>
    </body>
    </html>
  `;
}

const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.sessionId;
    const currentUser = sessions[sessionId];

    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            if (currentUser) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(renderStatusPage(currentUser));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(renderLoginForm());
            }
        }

        if (req.url === '/style.css') {
            return serveFile(res, path.join(__dirname, 'public', 'style.css'), 'text/css');
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }

    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { login, password } = parse(body);

            if (!login || !password) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(renderLoginForm('All fields are required.', 'error'));
            }

            const user = await User.getByLogin(login);
            if (!user || !(await User.checkPassword(password, user.password))) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(renderLoginForm('Invalid login or password.', 'error'));
            }

            const sid = Date.now().toString();
            sessions[sid] = { login: user.login, fullname: user.fullname, role: user.role };

            res.writeHead(302, {
                'Set-Cookie': `sessionId=${sid}; HttpOnly`,
                'Location': '/'
            });
            res.end();
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/logout') {
        if (sessionId) delete sessions[sessionId];
        res.writeHead(302, {
            'Set-Cookie': 'sessionId=; Max-Age=0',
            'Location': '/'
        });
        return res.end();
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
