export class Note {
    constructor(name, importance, content) {
        this.id = Date.now();
        this.date = new Date().toLocaleString();
        this.name = name;
        this.importance = importance;
        this.content = content;
    }
}
