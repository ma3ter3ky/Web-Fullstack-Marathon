const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

class Server {
    constructor(port, htmlFile) {
        this.port = port;
        this.htmlFile = htmlFile;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }

    handleRequest(req, res) {
        if (req.method === 'GET') {
            this.handleGET(req, res);
        } else if (req.method === 'POST') {
            this.handlePOST(req, res);
        } else {
            this.sendResponse(res, 405, 'text/plain', 'Method Not Allowed');
        }
    }

    handleGET(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;

        if (Object.keys(query).length === 0) {
            this.serveFile(res, this.htmlFile);
        } else {
            let html = '<h1>Superhero Data</h1>';
            for (let key in query) {
                html += `<p><strong>${key}:</strong> ${query[key]}</p>`;
            }
            html += `
                <form method="GET" action="/">
                    <input type="submit" value="FORGET" />
                </form>
            `;
            this.sendResponse(res, 200, 'text/html', html);
        }
    }

    handlePOST(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const postData = querystring.parse(body);
            let html = '<h1>Superhero Data</h1>';
            for (let key in postData) {
                html += `<p><strong>${key}:</strong> ${postData[key]}</p>`;
            }
            html += `
                <form method="GET" action="/">
                    <input type="submit" value="FORGET" />
                </form>
            `;
            this.sendResponse(res, 200, 'text/html', html);
        });
    }

    serveFile(res, filename) {
        fs.readFile(filename, (err, data) => {
            if (err) {
                this.sendResponse(res, 500, 'text/plain', 'Error loading file');
            } else {
                this.sendResponse(res, 200, 'text/html', data);
            }
        });
    }

    sendResponse(res, statusCode, contentType, content) {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
    }
}

const app = new Server(3000, 'index.html');
app.start();
