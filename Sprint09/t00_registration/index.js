const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const User = require('./models/user');

class Server {
    constructor(port = 3000) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`);
        });
    }

    handleRequest(req, res) {
        if (req.method === 'GET') {
            if (req.url === '/' || req.url === '/index.html') {
                this.sendFile(res, './public/index.html', 'text/html');
            } else if (req.url === '/style.css') {
                this.sendFile(res, './public/style.css', 'text/css');
            } else {
                this.send404(res);
            }
        } else if (req.method === 'POST' && req.url === '/register') {
            this.handleRegister(req, res);
        } else {
            this.send404(res);
        }
    }

    sendFile(res, filepath, contentType) {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                this.send404(res);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }

    send404(res) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

    handleRegister(req, res) {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
            try {
                const data = parse(body);
                const { login, password, confirm, fullname, email } = data;

                if (!login || !password || !confirm || !fullname || !email) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end('<h2>All fields are required!</h2>');
                }

                if (password !== confirm) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end('<h2>Passwords do not match!</h2>');
                }

                const exists = await User.exists(login, email);
                if (exists) {
                    res.writeHead(409, { 'Content-Type': 'text/html' });
                    return res.end('<h2>Login or email already used</h2>');
                }

                await User.create({ login, password, fullname, email });

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end('<h2>Registration successful</h2>');

            } catch (err) {
                console.error('Registration error:', err.message);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h2>Server error. Please try again later.</h2>');
                }
            }
        });
    }

}

new Server(5055).start();
