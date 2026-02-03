document.addEventListener('DOMContentLoaded', function() {
console.log('🤘 Thell Barrio Landing Page loaded successfully!');
initSmoothScrolling();
initLazyLoading();
console.log('Main.js initialized');
});
function initSmoothScrolling() {
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href');
const targetSection = document.querySelector(targetId);
if (targetSection) {
const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
window.scrollTo({
top: offsetTop,
behavior: 'smooth'
});
closeMenuIfOpen();
}
});
});
}
function initLazyLoading() {
if ('IntersectionObserver' in window) {
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
if (img.dataset.src) {
img.src = img.dataset.src;
img.classList.remove('lazy');
observer.unobserve(img);
}
}
});
});
const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(img => imageObserver.observe(img));
}
}
function closeMenuIfOpen() {
const menuDropdown = document.getElementById('menu-dropdown');
if (menuDropdown && !menuDropdown.classList.contains('hidden')) {
document.body.style.overflow = '';
menuDropdown.classList.add('hidden');
}
}
function formatDateSpanish(date) {
const options = {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
};
return date.toLocaleDateString('es-MX', options);
}
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}
window.ThellBarrio = {
closeMenuIfOpen,
formatDateSpanish,
debounce
};