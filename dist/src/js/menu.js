document.addEventListener('DOMContentLoaded', function() {
initHamburgerMenu();
console.log('Menu.js initialized');
});
function initHamburgerMenu() {
const hamburgerBtn = document.getElementById('hamburger-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const closeMenuBtn = document.getElementById('close-menu-btn');
if (!hamburgerBtn || !menuDropdown) {
console.warn('Menu elements not found');
return;
}
hamburgerBtn.addEventListener('click', function(e) {
e.stopPropagation();
toggleMenu();
});
if (closeMenuBtn) {
closeMenuBtn.addEventListener('click', function(e) {
e.stopPropagation();
closeMenu();
});
}
const menuLinks = menuDropdown.querySelectorAll('a');
menuLinks.forEach(link => {
link.addEventListener('click', function() {
closeMenu();
});
});
menuDropdown.addEventListener('click', function(e) {
if (e.target === menuDropdown) {
closeMenu();
}
});
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape') {
closeMenu();
}
});
}
function toggleMenu() {
const menuDropdown = document.getElementById('menu-dropdown');
if (menuDropdown.classList.contains('hidden')) {
openMenu();
} else {
closeMenu();
}
}
function openMenu() {
const menuDropdown = document.getElementById('menu-dropdown');
document.body.style.overflow = 'hidden';
menuDropdown.classList.remove('hidden');
menuDropdown.style.transform = 'translateX(100%)';
menuDropdown.style.opacity = '1';
requestAnimationFrame(() => {
menuDropdown.style.transition = 'transform 0.4s ease-out';
menuDropdown.style.transform = 'translateX(0)';
});
}
function closeMenu() {
const menuDropdown = document.getElementById('menu-dropdown');
if (!menuDropdown.classList.contains('hidden')) {
document.body.style.overflow = '';
menuDropdown.style.transition = 'transform 0.3s ease-in';
menuDropdown.style.transform = 'translateX(100%)';
setTimeout(() => {
menuDropdown.classList.add('hidden');
menuDropdown.style.transition = '';
menuDropdown.style.transform = '';
menuDropdown.style.opacity = '';
}, 300);
}
}
function handleMenuResize() {
const menuDropdown = document.getElementById('menu-dropdown');
if (window.innerWidth >= 1024 && window.scrollY <= 100) {
closeMenu();
}
}
window.addEventListener('resize', window.ThellBarrio?.debounce(handleMenuResize, 250) || handleMenuResize);