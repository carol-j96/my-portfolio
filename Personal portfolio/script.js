document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('hidden');
    sectionObserver.observe(section);
});
const photos = [
    { src: 'images/photo1.jpeg', alt: 'Photo 1' },
    { src: 'images/photo2.jpeg', alt: 'Photo 2' },
];
const grid = document.getElementById('galleryGrid');
photos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.addEventListener('load', () => img.classList.add('loaded'));

    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(photo.src, photo.alt));
    grid.appendChild(item);
});
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});