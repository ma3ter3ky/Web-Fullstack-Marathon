const PORT = 8080;
const HOST = 'localhost';

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET' && pathname === '/')
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(res);
    }
    else if (req.method === 'GET' && pathname === '/script.js')
    {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        fs.createReadStream('script.js').pipe(res);
    }
    else if (req.method === 'POST' && pathname === '/')
    {
        handleQuizSubmission(req, res);
    }
    else
    {
        res.writeHead(404);
        res.end('Not Found');
    }
});


function collectRequestBody(req, callback) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => callback(body));
}

function extractAnswer(body) {
    const params = new URLSearchParams(body);
    return params.get('answer');
}

function sendQuizResponse(res, answer) {
    const correct = (answer === 'stephen');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(correct ? 'Correct🤓' : 'Incorrect🥲');
}

function handleQuizSubmission(req, res) {
    collectRequestBody(req, body => {
        const answer = extractAnswer(body);
        console.log(`Answer submitted: ${answer}`);
        sendQuizResponse(res, answer);
    });

}


server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});

