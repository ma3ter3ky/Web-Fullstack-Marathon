class Slider {
    constructor() {
        this.images = [
            'assets/images/img1.jpg',
            'assets/images/img2.jpg',
            'assets/images/img3.jpg',
        ];
        this.currentImageIndex = 0;
        this.slider = document.getElementById('slider');
        this.leftButton = document.getElementById('left');
        this.rightButton = document.getElementById('right');
        this.leftButton.addEventListener('click', () => this.prevImage());
        this.rightButton.addEventListener('click', () => this.nextImage());
    }

    showImage() {
        this.slider.src = this.images[this.currentImageIndex];
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showImage();
    }

    prevImage() {
        this.currentImageIndex =
            (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
    }
}

const slider = new Slider();