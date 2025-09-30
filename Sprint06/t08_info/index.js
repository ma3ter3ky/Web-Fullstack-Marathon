const PORT = 8080;
const HOST = 'localhost';

const http = require('http');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const fileName = path.basename(__filename);
    const cliArgs = process.argv.slice(2).join(' ');
    const serverIp = req.socket.localAddress;
    const clientIp = req.socket.remoteAddress;
    const protocol = 'HTTP/' + req.httpVersion;
    const method = req.method;
    const hostHeader = req.headers['host'];
    const userAgent = req.headers['user-agent'];
    const queryParams = parsedUrl.query;

    console.log(`Executed file: ${fileName}`);
    console.log(`CLI Arguments: ${cliArgs}`);
    console.log(`Server IP: ${serverIp}`);
    console.log(`Host (client hostname): ${hostHeader}`);
    console.log(`Protocol: ${protocol}`);
    console.log(`HTTP Method: ${method}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`Client IP: ${clientIp}`);
    console.log(`URL Parameters:`);

    for (const [key, value] of Object.entries(queryParams)) {
        console.log(`  ${key}: ${value}`);
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Info printed to console.\n');
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
