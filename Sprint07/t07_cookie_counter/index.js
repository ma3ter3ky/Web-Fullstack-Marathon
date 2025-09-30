const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5055;
const MAX_ENTRIES = 100;

function parseCookies(cookieHeader) {
    const list = {};
    if (!cookieHeader) return list;
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        const value = rest.join('=');
        list[name.trim()] = decodeURIComponent(value);
    });
    return list;
}

function filterRecentVisits(visitsArray) {
    const oneMinuteAgo = Date.now() - 60_000;
    return visitsArray.filter(timestamp => timestamp > oneMinuteAgo);
}

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const cookies = parseCookies(req.headers.cookie);
        let visits = [];

        try {
            visits = JSON.parse(cookies.visits || '[]');
        } catch (e) {
            visits = [];
        }

        visits = filterRecentVisits(visits);
        visits.push(Date.now());

        if (visits.length > MAX_ENTRIES) {
            visits = visits.slice(-MAX_ENTRIES);
        }

        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading page.');
            }

            const output = html.replace('{{message}}', `You visited this site <strong>${visits.length}</strong> time(s) in last minute.`);
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Set-Cookie': `visits=${encodeURIComponent(JSON.stringify(visits))}; Path=/; HttpOnly`
            });

            res.end(output);
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
