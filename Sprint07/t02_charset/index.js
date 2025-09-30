const iconv = require('iconv-lite');
const http = require('http');
const fs = require('fs');
const url = require('url');

class CharsetConverter {
    static validCharsets() {
        return ['UTF-8', 'ISO-8859-1', 'Windows-1252'];
    }

    static convert(input, charset) {
        let buffer;
        if (charset === 'UTF-8') {
            buffer = iconv.encode(input, 'UTF-8');
        } else if (charset === 'ISO-8859-1') {
            buffer = iconv.encode(input, 'ISO-8859-1');
        } else if (charset === 'Windows-1252') {
            buffer = iconv.encode(input, 'Windows-1252');
        } else {
            buffer = Buffer.from(input);
        }
        console.log(buffer);
        return buffer.toString();
    }
}

class CharsetServer {
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
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const action = query.action;

        if (req.method !== 'GET') {
            this.sendResponse(res, 405, 'text/plain', 'Method Not Allowed');
            return;
        }

        if (!query.input || !query.charset || action === 'Clear') {
            this.serveInitialPage(res);
        } else {
            const input = query.input;
            let charsets = query.charset;
            if (!Array.isArray(charsets)) {
                charsets = [charsets];
            }

            const conversions = {};
            for (let cs of charsets) {
                conversions[cs] = CharsetConverter.convert(input, cs);
            }

            this.servePageWithResult(res, input, charsets, conversions);
        }
    }

    serveInitialPage(res) {
        const form = this.buildForm();
        const html = this.wrapHtml(form);
        this.sendResponse(res, 200, 'text/html', html);
    }

    servePageWithResult(res, input, charsets, conversions) {
        const form = this.buildForm(input, charsets);

        let resultHtml = `<p>Input string:</p><textarea readonly>${input}</textarea>`;
        for (let cs of charsets) {
            resultHtml += `
                <p>${cs}:</p>
                <textarea readonly>${conversions[cs]}</textarea>
            `;
        }

        const html = this.wrapHtml(form + resultHtml);
        this.sendResponse(res, 200, 'text/html', html);
    }

    buildForm(input = '', selectedCharsets = []) {
        const validCharsets = CharsetConverter.validCharsets();
        let charsetOptions = '';
        for (let cs of validCharsets) {
            if (selectedCharsets.includes(cs)) {
                charsetOptions += `<option value="${cs}" selected>${cs}</option>`;
            } else {
                charsetOptions += `<option value="${cs}">${cs}</option>`;
            }
        }

        return `
            <form method="GET" action="/">
                <label for="input">Change charset:</label>
                <input type="text" id="input" name="input" value="${input}" required>

                <label for="charset">Select charset or several charsets:</label>
                <select id="charset" name="charset" multiple size="3" required>
                    ${charsetOptions}
                </select>

                <input type="submit" name="action" value="Change charset">
                <input type="submit" name="action" value="Clear">
            </form>
        `;
    }

    wrapHtml(content) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Charset Converter</title>
            </head>
            <body>
                <main>
                    <h1>Charset</h1>
                    ${content}
                </main>
            </body>
            </html>
        `;
    }

    sendResponse(res, statusCode, contentType, content) {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
    }
}

const app = new CharsetServer(3000, 'index.html');
app.start();
