 const carousel = document.getElementById('carousel');
    const years = document.querySelectorAll('.year');
    const progressIndicator = document.getElementById('progressIndicator');
    const progressLine = document.querySelector('.progress-line');

    function updateCarousel(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        progressIndicator.style.left = `${(index / (years.length - 1)) * 100}%`;
        years.forEach(y => y.classList.remove('active'));
        years[index].classList.add('active');
    }

    years.forEach((year, index) => {
        year.addEventListener('click', () => updateCarousel(index));
    });

    let isDragging = false;

    progressIndicator.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);

    function startDrag(e) {
        isDragging = true;
    }

    function onDrag(e) {
        if (!isDragging) return;
        const rect = progressLine.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const index = Math.round(percent * (years.length - 1));
        updateCarousel(index);
    }

    function endDrag() {
        isDragging = false;
    }