const http = require('http');
const fs = require('fs');
const path = require('path');
const authRoute = require('./routes/auth');
const reminderRoute = require('./routes/reminder');
const session = require('./session');

const server = http.createServer(async (req, res) => {
    const cookies = parseCookies(req);
    const sessionId = cookies.sessionId;
    const user = session.get(sessionId);

    if (req.method === 'GET' && req.url === '/style.css') {
        return serveFile(res, 'public/style.css', 'text/css');
    }

    if (user) {
        if (req.url === '/' || req.url === '/main') {
            return serveFile(res, 'views/main.html', 'text/html');
        }

        const handledByAuth = await authRoute(req, res, user);
        if (handledByAuth !== false) return;

        return serveFile(res, 'views/404.html', 'text/html', 404);
    }

    if (req.url === '/' || req.url === '/login') {
        const handledByAuth = await authRoute(req, res, null);
        if (handledByAuth !== false) return;
    }

    if (req.url === '/register' || req.url === '/reminder' || req.url === '/send-email') {
        const handledBy = await (req.url.startsWith('/reminder') ? reminderRoute : authRoute)(req, res, null);
        if (handledBy !== false) return;
    }

    serveFile(res, 'views/login.html', 'text/html');
});

function serveFile(res, filepath, contentType, statusCode = 200) {
    const fullPath = path.join(__dirname, filepath);
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Internal Server Error');
        }
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
    });
}

function parseCookies(req) {
    const cookieHeader = req.headers.cookie || '';
    return Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
}

server.listen(5055, () => {
    console.log('🌐 Server running at http://localhost:5055');
});
