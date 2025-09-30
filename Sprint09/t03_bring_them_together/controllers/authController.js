const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');
const session = require('../session');
const User = require('../models/user');

function renderHTML(res, filepath) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Internal server error');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function renderResult(res, message, status = 'success') {
    const file = path.join(__dirname, '../views/result.html');
    fs.readFile(file, 'utf8', (err, html) => {
        if (err) return res.end('Error rendering result');
        html = html.replace('{{message}}', message).replace('{{status}}', status);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
}

module.exports = {
    renderRegisterForm(res) {
        const file = path.join(__dirname, '../views/register.html');
        renderHTML(res, file);
    },

    async register(req, res) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { login, password, confirm, fullname, email } = parse(body);

            if (!login || !password || !confirm || !fullname || !email) {
                return renderResult(res, 'All fields are required.', 'error');
            }

            if (password !== confirm) {
                return renderResult(res, 'Passwords do not match.', 'error');
            }

            const exists = await User.exists(login, email);
            if (exists) {
                return renderResult(res, 'Login or email already exists.', 'error');
            }

            const hashed = await bcrypt.hash(password, 10);
            await User.create({ login, password: hashed, fullname, email });
            return renderResult(res, 'Registration successful. <br><a href="/login"><button>Proceed to Login</button></a>');
        });
    },

    renderLoginForm(res) {
        const file = path.join(__dirname, '../views/login.html');
        renderHTML(res, file);
    },

    async login(req, res) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { login, password } = parse(body);
            const user = await User.getByLogin(login);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return renderResult(res, 'Invalid login or password.', 'error');
            }

            const sessionId = session.create(user);
            res.writeHead(302, {
                'Set-Cookie': `sessionId=${sessionId}; HttpOnly`,
                'Location': '/main'
            });
            res.end();

        });
    },

    logout(req, res) {
        res.writeHead(302, {
            'Set-Cookie': `sessionId=; Max-Age=0`,
            'Location': '/'
        });
        res.end();
    }
};
