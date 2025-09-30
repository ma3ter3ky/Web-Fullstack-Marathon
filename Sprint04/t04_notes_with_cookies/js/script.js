function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(name, value) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function updateArchiveUI() {
    const archive = document.getElementById('notesArchive');
    const notes = getCookie('notes');

    if (notes && notes !== '') {
        const formattedNotes = notes.replace(/(.{64})/g, '$1\n');
        archive.innerHTML = formattedNotes.replace(/\n/g, '<br>');
    } else {
        archive.textContent = '[Empty]';
    }
}

function addNote() {
    const textarea = document.getElementById('noteInput');
    const newNote = textarea.value.trim();

    if (newNote === '') {
        alert(`It's empty. Try to input something in "Text input"`);
        return;
    }

    let existingNotes = getCookie('notes');
    if (existingNotes && existingNotes !== '') {
        existingNotes += `\n` + newNote;
    } else {
        existingNotes = newNote;
    }

    setCookie('notes', existingNotes);
    updateArchiveUI();
    textarea.value = '';
}

function clearNotes() {
    const confirmClear = confirm('Are you sure?');
    if (confirmClear) {
        deleteCookie('notes');
        updateArchiveUI();
    }
}

document.getElementById('addBtn').addEventListener('click', addNote);
document.getElementById('clearBtn').addEventListener('click', clearNotes);

updateArchiveUI();