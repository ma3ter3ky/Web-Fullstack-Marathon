const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const { fetchBodyFromURL } = require('./fetcher');

const PORT = 5055;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const html = fs.readFileSync('./index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    if (req.method === 'POST' && req.url === '/fetch') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { url } = parse(body);
            try {
                const bodyContent = await fetchBodyFromURL(url);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
          <h1>Fetched <body> content from ${url}</h1>
          <pre>${bodyContent}</pre>
          <a href="/">Back</a>
        `);
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h2>Error fetching: ${err.message}</h2><a href="/">Back</a>`);
            }
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
