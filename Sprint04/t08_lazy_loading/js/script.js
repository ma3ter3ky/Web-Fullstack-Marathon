document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const message = document.getElementById('message');
    let loadedCount = 0;

    function loadVisibleImages() {
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                loadedCount++;
                message.textContent = `Loaded: ${loadedCount} / 20`;

                if (loadedCount === 20) {
                    message.style.background = 'green';
                    setTimeout(() => message.style.display = 'none', 3000);
                }
            }
        });
    }

    window.addEventListener('scroll', loadVisibleImages);
    window.addEventListener('resize', loadVisibleImages);
    loadVisibleImages();
});
