const carousel = document.getElementById('carousel');
const years = document.querySelectorAll('.year');
const progressIndicator = document.getElementById('progressIndicator');
const progressLine = document.querySelector('.progress-line');

let isDragging = false;

function updateCarousel(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  progressIndicator.style.left = `${(index / (years.length - 1)) * 100}%`;
  years.forEach((year, i) => {
    year.classList.toggle('active', i === index);
  });
}

// Inicializar con la primera slide activa
updateCarousel(0);

// Clic en los años
years.forEach((year, index) => {
  year.addEventListener('click', () => updateCarousel(index));
});

// Arrastrar con mouse
progressIndicator.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  handleMove(e.clientX);
});

// Arrastrar con touch
progressIndicator.addEventListener('touchstart', () => isDragging = true);
document.addEventListener('touchend', () => isDragging = false);
document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  if (e.touches.length > 0) {
    handleMove(e.touches[0].clientX);
  }
});

function handleMove(clientX) {
  const rect = progressLine.getBoundingClientRect();
  let percent = (clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  const index = Math.round(percent * (years.length - 1));
  updateCarousel(index);
}