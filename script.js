const carousel = document.getElementById('carousel');
const years = document.querySelectorAll('.year');
const progressIndicator = document.getElementById('progressIndicator');
const progressLine = document.querySelector('.progress-line');

let isDragging = false;

function updateCarousel(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    progressIndicator.style.left = `${(index / (years.length - 1)) * 100}%`;

    years.forEach(year => year.classList.remove('active'));
    years[index].classList.add('active');
}

// Click en años
years.forEach((year, index) => {
    year.addEventListener('click', () => updateCarousel(index));
});

// Eventos de mouse (PC)
progressIndicator.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', onMouseDrag);
document.addEventListener('mouseup', endDrag);

// Eventos táctiles (móviles/tablets)
progressIndicator.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', onTouchDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
}

function onMouseDrag(e) {
    if (!isDragging) return;
    const rect = progressLine.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    const index = Math.round(percent * (years.length - 1));
    updateCarousel(index);
}

function onTouchDrag(e) {
    if (!isDragging || e.touches.length === 0) return;
    const rect = progressLine.getBoundingClientRect();
    let percent = (e.touches[0].clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    const index = Math.round(percent * (years.length - 1));
    updateCarousel(index);
}

function endDrag() {
    isDragging = false;
}