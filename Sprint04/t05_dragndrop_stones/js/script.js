class Stone {
    constructor(element) {
        this.element = element;
        this.isDraggable = true;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.wasDragged = false;

        this.initEvents();
    }

    toggleDraggable() {
        if (this.wasDragged) {
            this.wasDragged = false;
            return;
        }
        this.isDraggable = !this.isDraggable;
        if (this.isDraggable) {
            this.element.classList.remove('disabled');
        } else {
            this.element.classList.add('disabled');
        }
    }

    onMouseDown(event) {
        if (!this.isDraggable) return;
        this.isDragging = true;
        this.offsetX = event.clientX - this.element.offsetLeft;
        this.offsetY = event.clientY - this.element.offsetTop;
    }

    onMouseMove(event) {
        if (!this.isDragging) return;
        this.element.style.left = (event.clientX - this.offsetX) + 'px';
        this.element.style.top = (event.clientY - this.offsetY) + 'px';
        this.wasDragged = true;
    }

    onMouseUp(event) {
        this.isDragging = false;
    }

    initEvents() {
        this.element.addEventListener('click', () => this.toggleDraggable());
        this.element.addEventListener('mousedown', (event) => this.onMouseDown(event));
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('mouseup', (event) => this.onMouseUp(event));
    }
}

const stone1 = new Stone(document.getElementById('stone1'));
const stone2 = new Stone(document.getElementById('stone2'));
const stone3 = new Stone(document.getElementById('stone3'));
const stone4 = new Stone(document.getElementById('stone4'));
const stone5 = new Stone(document.getElementById('stone5'));
const stone6 = new Stone(document.getElementById('stone6'));