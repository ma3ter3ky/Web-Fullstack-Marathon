class TableSorter {
    constructor(tableElement, messageElement) {
        this.table = tableElement;
        this.message = messageElement;
        this.sortKey = null;
        this.sortDirection = 'ASC';
        this.headers = this.table.querySelectorAll('th');
        this.init();
    }

    init() {
        this.headers.forEach(header => {
            const key = header.dataset.key;
            if (!key) return;
            header.addEventListener('click', () => {
                this.sortBy(key);
            });
        });
    }

    sortBy(key) {
        if (this.sortKey === key) {
            this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
        } else {
            this.sortKey = key;
            this.sortDirection = 'ASC';
        }

        const columnIndex = Array.from(this.headers).findIndex(th => th.dataset.key === key);
        const tbody = this.table.querySelector('tbody');
        const rowsArray = Array.from(tbody.querySelectorAll('tr'));

        rowsArray.sort((rowA, rowB) => {
            const cellA = rowA.children[columnIndex].textContent.trim();
            const cellB = rowB.children[columnIndex].textContent.trim();
            const isNumeric = !isNaN(parseFloat(cellA)) && isFinite(cellA);
            if (isNumeric) {
                return this.sortDirection === 'ASC'
                    ? Number(cellA) - Number(cellB)
                    : Number(cellB) - Number(cellA);
            } else {
                return this.sortDirection === 'ASC'
                    ? cellA.localeCompare(cellB)
                    : cellB.localeCompare(cellA);
            }
        });

        tbody.innerHTML = '';
        rowsArray.forEach(row => tbody.appendChild(row));

        this.headers.forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });
        const currentHeader = this.headers[columnIndex];
        currentHeader.classList.add(this.sortDirection === 'ASC' ? 'sorted-asc' : 'sorted-desc');

        this.message.textContent = `Sorting by ${key}, order: ${this.sortDirection}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableElement = document.getElementById('heroTable');
    const messageElement = document.getElementById('message');
    new TableSorter(tableElement, messageElement);
});
