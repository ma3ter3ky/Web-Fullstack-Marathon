import { Note } from './Note.js';
import { NotePad } from './NotePad.js';

const form = document.getElementById('noteForm');
const listContainer = document.getElementById('notesList');
const detailsContainer = document.getElementById('noteDetails');
const pad = new NotePad();

function renderList() {
    listContainer.innerHTML = '';
    const notes = pad.getAll();
    if (notes.length === 0) {
        listContainer.textContent = 'No notes yet.';
        return;
    }
    const ul = document.createElement('ul');
    notes.forEach(n => {
        const li = document.createElement('li');

        const viewLink = document.createElement('a');
        viewLink.href = '#';
        viewLink.textContent = `${n.date} > ${n.name}`;
        viewLink.addEventListener('click', e => {
            e.preventDefault();
            renderDetails(n);
        });

        const delLink = document.createElement('a');
        delLink.href = '#';
        delLink.textContent = '[Delete]';
        delLink.style.marginLeft = '1em';
        delLink.addEventListener('click', e => {
            e.preventDefault();
            pad.delete(n.id);
            renderList();
            detailsContainer.innerHTML = '';
        });

        li.append(viewLink, delLink);
        ul.append(li);
    });
    listContainer.append(ul);
}

function renderDetails(note) {
    const noteDetailsTitle = document.getElementById('noteDetailsTitle');
    noteDetailsTitle.textContent = `Details of ${note.name}`;
    detailsContainer.innerHTML = `
    <p>name: <strong>${note.name}</strong></p>
    <p>importance: <strong>${note.importance}</strong></p>
    <p>date: <strong>${note.date}</strong></p>
    <p>text: <strong>${note.content}</strong></p>
  `;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.elements['noteName'].value.trim();
    const importance = form.elements['importance'].value;
    const content = form.elements['content'].value.trim();
    if (!name || !content) {
        alert('Name and content are required.');
        return;
    }
    const note = new Note(name, importance, content);
    pad.add(note);
    form.reset();
    renderList();
    detailsContainer.innerHTML = '';
});

renderList();
