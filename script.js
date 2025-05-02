let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.slide-dots .dot');
let currentSlide = 0;
let intervalId = null;
let slideshow = document.querySelector('.slideshow');
let heroSection = document.querySelector('.hero');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function startSlideshow() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
}

function pauseSlideshow() {
    if (intervalId) clearInterval(intervalId);
}

// Arrow navigation
document.querySelector('.slide-arrow.left').addEventListener('click', () => {
    prevSlide();
    startSlideshow();
});
document.querySelector('.slide-arrow.right').addEventListener('click', () => {
    nextSlide();
    startSlideshow();
});

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        let idx = parseInt(dot.getAttribute('data-slide'));
        showSlide(idx);
        startSlideshow();
    });
});

// Pause on hover
heroSection.addEventListener('mouseenter', pauseSlideshow);
heroSection.addEventListener('mouseleave', startSlideshow);

// Initialize
showSlide(currentSlide);
startSlideshow();
