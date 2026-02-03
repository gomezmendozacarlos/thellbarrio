document.addEventListener('DOMContentLoaded', function() {
initScrollBehavior();
console.log('Scroll.js initialized');
});
function initScrollBehavior() {
const navbar = document.getElementById('navbar');
const desktopMenu = document.getElementById('desktop-menu');
const hamburgerMenu = document.getElementById('hamburger-menu');
if (!navbar || !desktopMenu || !hamburgerMenu) {
console.warn('Navbar elements not found');
return;
}
updateNavbarState();
const debouncedScrollHandler = window.ThellBarrio?.debounce(handleScroll, 16) || handleScroll;
window.addEventListener('scroll', debouncedScrollHandler);
const debouncedResizeHandler = window.ThellBarrio?.debounce(updateNavbarState, 250) || updateNavbarState;
window.addEventListener('resize', debouncedResizeHandler);
}
function handleScroll() {
updateNavbarState();
updateActiveNavLink();
}
function updateNavbarState() {
const navbar = document.getElementById('navbar');
const desktopMenu = document.getElementById('desktop-menu');
const hamburgerMenu = document.getElementById('hamburger-menu');
const scrollY = window.scrollY;
const isScrolled = scrollY > 100;
const isMobile = window.innerWidth < 1024; // md breakpoint
navbar.classList.remove('bg-white', 'bg-opacity-95', 'backdrop-blur-sm', 'border-b', 'border-gray-200');
navbar.classList.add('bg-transparent');
if (isMobile || isScrolled) {
desktopMenu.style.display = 'none';
hamburgerMenu.style.display = 'flex';
const hamburgerBtn = hamburgerMenu.querySelector('button');
if (hamburgerBtn) {
hamburgerBtn.classList.add('text-white');
hamburgerBtn.classList.remove('text-gray-900');
}
} else {
desktopMenu.style.display = 'flex';
hamburgerMenu.style.display = 'none';
const desktopMenuLinks = desktopMenu.querySelectorAll('a');
desktopMenuLinks.forEach(link => {
link.classList.add('text-white');
link.classList.remove('text-gray-900');
});
const menuDropdown = document.getElementById('menu-dropdown');
if (menuDropdown && !menuDropdown.classList.contains('hidden')) {
menuDropdown.classList.add('hidden');
}
}
}
function updateActiveNavLink() {
const sections = document.querySelectorAll('section[id]');
const desktopMenuLinks = document.querySelectorAll('#desktop-menu a[href^="#"]');
let currentSection = '';
const scrollPosition = window.scrollY + 120; // Offset for fixed navbar
sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
currentSection = section.getAttribute('id');
}
});
desktopMenuLinks.forEach(link => {
const href = link.getAttribute('href');
const sectionId = href.substring(1); // Remove # from href
if (sectionId === currentSection) {
link.classList.add('text-orange-primary');
link.classList.remove('text-white', 'text-gray-900');
} else {
link.classList.remove('text-orange-primary');
link.classList.add('text-white');
link.classList.remove('text-gray-900');
}
});
}
function scrollToTop() {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
}
function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}
if (window.ThellBarrio) {
window.ThellBarrio.scrollToTop = scrollToTop;
window.ThellBarrio.isInViewport = isInViewport;
}