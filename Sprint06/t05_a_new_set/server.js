const PORT = 8080;
const HOST = 'localhost';

const http = require('http');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');

function requestHander(req, res) {
    let filePath = '';
    let contentType = '';

    if (req.url === '/' || req.url === '/index.html') {
        filePath = './index.html';
        contentType = 'text/html';
    } else if (req.url === '/style.css') {
        filePath = './style.css';
        contentType = 'text/css';
    } else if (req.url === '/script.js') {
        filePath = './script.js';
        contentType = 'application/javascript';
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        const decoder = new StringDecoder('utf8');

        req.on('data', chunk => {
            body += decoder.write(chunk);
        });

        req.on('end', () => {
            body += decoder.end();

            const formData = new URLSearchParams(body);
            const name = formData.get('name');
            const email = formData.get('email');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
        <html>
        <head><title>Thank You</title></head>
        <body>
            <h1>Thank you!</h1>
            <p>We'll contact you via email</p>
            <a href="/">Back to form</a>
        </body>
        </html>
    `);
        });

        return;
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
}

const server = http.createServer((req, res) => {
    requestHander(req, res);
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});

