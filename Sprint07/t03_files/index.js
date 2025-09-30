const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const File = require('./File');
const FileList = require('./FileList');

class FileServer {
    constructor(port, templateFile) {
        this.port = port;
        this.templateFile = templateFile;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (req.method === 'GET' && pathname === '/') {
            this.renderMainPage(res);
        } else if (req.method === 'POST' && pathname === '/create') {
            this.handleCreate(req, res);
        } else if (req.method === 'GET' && pathname === '/select') {
            this.handleSelect(res, parsedUrl.query.file);
        } else if (req.method === 'POST' && pathname === '/delete') {
            this.handleDelete(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }

    handleCreate(req, res) {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const data = querystring.parse(body);
            if (data.filename && data.content) {
                const file = new File(data.filename);
                file.write(data.content);
            }
            this.redirect(res, '/');
        });
    }

    handleSelect(res, fileName) {
        if (!fileName) {
            this.redirect(res, '/');
            return;
        }

        const file = new File(fileName);
        const content = file.read();
        this.renderMainPage(res, fileName, content);
    }

    handleDelete(req, res) {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const data = querystring.parse(body);
            if (data.file) {
                const file = new File(data.file);
                file.delete();
            }
            this.redirect(res, '/');
        });
    }

    renderMainPage(res, selectedFile = null, selectedContent = '') {
        const fileList = new FileList();
        const fileListHtml = fileList.getHTMLList();

        let currentFileHtml = '';
        if (selectedFile) {
            currentFileHtml = `
                <section id="current-file">
                    <h2>Current File</h2>
                    <p><strong>${selectedFile}</strong></p>
                    <textarea readonly rows="10" cols="50">${selectedContent}</textarea>
                    <form method="POST" action="/delete">
                        <input type="hidden" name="file" value="${selectedFile}">
                        <input type="submit" value="Delete File">
                    </form>
                </section>
            `;
        }

        fs.readFile(this.templateFile, (err, template) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading template');
            } else {
                let html = template.toString();
                html = html.replace('<!-- FILE_LIST -->', fileListHtml);
                html = html.replace('<!-- CURRENT_FILE -->', currentFileHtml);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            }
        });
    }

    redirect(res, location) {
        res.writeHead(302, { Location: location });
        res.end();
    }
}

const app = new FileServer(3000, 'main.html');
app.start();
