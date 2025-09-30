function getLocalNotes() {
    const notesJSON = localStorage.getItem('notes');
    return notesJSON ? JSON.parse(notesJSON) : [];
}

function setLocalNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function clearLocalNotes() {
    localStorage.removeItem('notes');
}

function updateArchiveUI() {
    const archive = document.getElementById('notesArchive');
    const notes = getLocalNotes();

    if (notes.length > 0) {
        archive.innerHTML = notes.map(note => {
            const formattedText = note.text.replace(/\n/g, '<br>');
            return `<div><b>${note.date}</b>: ${formattedText}</div>`;
        }).join('<br>');
    } else {
        archive.textContent = '[Empty]';
    }
}

function addNote() {
    const textarea = document.getElementById('noteInput');
    const newNoteText = textarea.value.trim();

    if (newNoteText === '') {
        alert(`It's empty. Try to input something in "Text input"`);
        return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString();

    const notes = getLocalNotes();
    notes.push({ text: newNoteText, date: formattedDate });

    setLocalNotes(notes);
    updateArchiveUI();
    textarea.value = '';
}

function clearNotes() {
    const confirmClear = confirm('Are you sure?');
    if (confirmClear) {
        clearLocalNotes();
        updateArchiveUI();
    }
}

document.getElementById('addBtn').addEventListener('click', addNote);
document.getElementById('clearBtn').addEventListener('click', clearNotes);
updateArchiveUI();
