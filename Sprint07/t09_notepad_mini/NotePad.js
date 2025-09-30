export class NotePad {
    constructor() {
        this.storageKey = 'notepad_notes';
        this.notes = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
    }

    add(note) {
        this.notes.push(note);
        this.save();
    }

    delete(id) {
        this.notes = this.notes.filter(n => n.id !== id);
        this.save();
    }

    getAll() {
        return this.notes;
    }

    get(id) {
        return this.notes.find(n => n.id === id);
    }
}
