const fs = require('fs');
const path = require('path');

class File {
    constructor(fileName) {
        this.dir = path.join(__dirname, 'tmp');
        this.path = path.join(this.dir, fileName);
        this.name = fileName;
    }

    write(content) {
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir, { recursive: true });
        }
        fs.appendFileSync(this.path, content + '\n', 'utf8');
    }

    read() {
        if (fs.existsSync(this.path)) {
            return fs.readFileSync(this.path, 'utf8');
        }
        return '';
    }

    delete() {
        if (fs.existsSync(this.path)) {
            fs.unlinkSync(this.path);
        }
    }
}

module.exports = File;
