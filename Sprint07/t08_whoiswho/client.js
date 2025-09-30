let headers = [];
let rows = [];

document.getElementById('fileInput').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    headers = lines[0].split(',');

    rows = lines.slice(1).map(line => {
        const values = line.split(',');
        const row = {};
        headers.forEach((h, i) => row[h] = values[i] || '');
        return row;
    });

    renderFilters();
    renderTable(rows);
});

function renderFilters() {
    const filters = document.getElementById('filters');
    filters.innerHTML = '';
    const form = document.createElement('form');

    headers.forEach(h => {
        const label = document.createElement('label');
        label.textContent = h;
        const select = document.createElement('select');
        select.name = h;

        const unique = [...new Set(rows.map(r => r[h]))].sort();
        select.innerHTML = `<option value="">All</option>` +
            unique.map(v => `<option>${v}</option>`).join('');

        form.append(label, select);
    });

    const button = document.createElement('button');
    button.textContent = 'Apply Filters';
    form.append(button);
    filters.append(form);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const query = Object.fromEntries(new FormData(form));
        const filtered = rows.filter(row =>
            headers.every(h => !query[h] || row[h] === query[h])
        );
        renderTable(filtered);
    });
}

function renderTable(data) {
    const container = document.getElementById('table');
    container.innerHTML = '';
    if (data.length === 0) return container.textContent = 'No matching rows.';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.append(th);
    });
    thead.append(tr);
    table.append(thead);

    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(h => {
            const td = document.createElement('td');
            td.textContent = row[h];
            tr.append(td);
        });
        tbody.append(tr);
    });
    table.append(tbody);
    container.append(table);
}
