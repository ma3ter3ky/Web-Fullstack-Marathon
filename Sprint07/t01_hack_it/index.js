const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const querystring = require('querystring');

class PasswordHasher {
    static hash(password, salt) {
        return crypto.createHash('sha256').update(password + salt).digest('hex');
    }
}

class SessionManager {
    constructor() {
        this.sessions = {};
    }

    saveSession(ip, password, salt, hash) {
        this.sessions[ip] = {password, salt, hash};
    }

    getSession(ip) {
        return this.sessions[ip];
    }

    clearSession(ip) {
        delete this.sessions[ip];
    }
}

class HackServer {
    constructor(port, htmlFile) {
        this.port = port;
        this.htmlFile = htmlFile;
        this.sessions = new SessionManager();
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }

    handleRequest(req, res) {
        const ip = req.connection.remoteAddress;
        if (req.method === 'GET') {
            this.serveInitialPage(res);
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = querystring.parse(body);
                if (data.action === 'Save') {
                    const hash = PasswordHasher.hash(data.password, data.salt);
                    this.sessions.saveSession(ip, data.password, data.salt, hash);
                    this.showHashedPage(res, hash);
                } else if (data.action === 'Guess') {
                    const session = this.sessions.getSession(ip);
                    if (!session) {
                        this.serveInitialPage(res);
                        return;
                    }
                    const guessedHash = PasswordHasher.hash(data.guess, session.salt);
                    if (guessedHash === session.hash) {
                        this.sessions.clearSession(ip);
                        this.serveInitialPageWithMessage(res, 'Hacked!');
                    } else {
                        this.showHashedPage(res, session.hash, 'Access denied!');
                    }
                } else if (data.action === 'Clear') {
                    this.sessions.clearSession(ip);
                    this.serveInitialPage(res);
                }
            });
        }
    }

    serveInitialPage(res) {
        fs.readFile(this.htmlFile, (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }

    serveInitialPageWithMessage(res, message) {
        fs.readFile(this.htmlFile, (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(`<p style="color:green;"><strong>${message}</strong></p>`);
                res.end(data);
            }
        });
    }

    showHashedPage(res, hash, error = null) {
        let errorMsg;
        if (error) {
            errorMsg = `<p style="color:red;"><strong>${error}</strong></p>`;
        } else {
            errorMsg = '';
        }
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hack It!</title>
                <meta name="description" content="t01. Hack it!">
            </head>
            <body>
            <main>
                <h1>Hack It!</h1>
                <p><strong>Hashed password:</strong> ${hash}</p>
                ${errorMsg}
                <form method="POST" action="/">
                    <label for="guess">Guess password:</label>
                    <input type="text" id="guess" name="guess" required>
                    <input type="submit" name="action" value="Guess">
                </form>
                <form method="POST" action="/">
                    <input type="submit" name="action" value="Clear">
                </form>
            </main>
            <script src="script.js"></script>
            </body>
            </html>
        `;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
}

const app = new HackServer(3000, 'index.html');
app.start();
