const PORT = 8080;
const HOST = 'localhost';

const http = require('http');

const handleNormal = require('./normal-router');
const handleQuantum = require('./quantum-router');

const server = http.createServer((req, res) => {
    if (req.url === '/normal') {
        handleNormal(req, res);
    } else if (req.url === '/quantum') {
        handleQuantum(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
