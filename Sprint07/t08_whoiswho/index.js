const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 5055;

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const html = fs.readFileSync(path.join(__dirname, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    if (req.method === 'GET' && req.url === '/client.js') {
        const js = fs.readFileSync(path.join(__dirname, 'client.js'));
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        return res.end(js);
    }

    res.writeHead(404);
    res.end('404 Not Found');
}).listen(5055, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
