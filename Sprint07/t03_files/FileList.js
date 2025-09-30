const fs = require('fs');
const path = require('path');

class FileList {
    constructor() {
        this.dir = path.join(__dirname, 'tmp');
    }

    getList() {
        if (!fs.existsSync(this.dir)) return [];
        return fs.readdirSync(this.dir);
    }

    hasFiles() {
        return this.getList().length > 0;
    }

    getHTMLList() {
        const files = this.getList();
        if (files.length === 0) return '<p>No files found.</p>';

        const listItems = files.map(file =>
            `<li><a href="/select?file=${encodeURIComponent(file)}">${file}</a></li>`
        ).join('');

        return `<ul>${listItems}</ul>`;
    }
}

module.exports = FileList;
