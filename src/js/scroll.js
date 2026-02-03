// Scroll functionality for Thell Barrio Landing Page
// Manejo del comportamiento del menú al hacer scroll

document.addEventListener('DOMContentLoaded', function() {
    initScrollBehavior();
    console.log('Scroll.js initialized');
});

/**
 * Initialize scroll-based menu behavior
 */
function initScrollBehavior() {
    const navbar = document.getElementById('navbar');
    const desktopMenu = document.getElementById('desktop-menu');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    if (!navbar || !desktopMenu || !hamburgerMenu) {
        console.warn('Navbar elements not found');
        return;
    }
    
    // Initial state
    updateNavbarState();
    
    // Listen to scroll events with debouncing for better performance
    const debouncedScrollHandler = window.ThellBarrio?.debounce(handleScroll, 16) || handleScroll;
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Also listen to resize events
    const debouncedResizeHandler = window.ThellBarrio?.debounce(updateNavbarState, 250) || updateNavbarState;
    window.addEventListener('resize', debouncedResizeHandler);
}

/**
 * Handle scroll events
 */
function handleScroll() {
    updateNavbarState();
    updateActiveNavLink();
}

/**
 * Update navbar state based on scroll position and screen size
 */
function updateNavbarState() {
    const navbar = document.getElementById('navbar');
    const desktopMenu = document.getElementById('desktop-menu');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 100;
    const isMobile = window.innerWidth < 1024; // md breakpoint
    
    // Navbar always stays transparent
    navbar.classList.remove('bg-white', 'bg-opacity-95', 'backdrop-blur-sm', 'border-b', 'border-gray-200');
    navbar.classList.add('bg-transparent');
    
    // Show/hide menus based on scroll and screen size
    if (isMobile || isScrolled) {
        // Show hamburger menu when mobile or scrolled
        desktopMenu.style.display = 'none';
        hamburgerMenu.style.display = 'flex';
        
        // Update hamburger button color
        const hamburgerBtn = hamburgerMenu.querySelector('button');
        if (hamburgerBtn) {
            hamburgerBtn.classList.add('text-white');
            hamburgerBtn.classList.remove('text-gray-900');
        }
    } else {
        // Show desktop menu when not scrolled on desktop
        desktopMenu.style.display = 'flex';
        hamburgerMenu.style.display = 'none';
        
        // Ensure desktop menu links are white (over hero image)
        const desktopMenuLinks = desktopMenu.querySelectorAll('a');
        desktopMenuLinks.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-gray-900');
        });
        
        // Close dropdown if it was open
        const menuDropdown = document.getElementById('menu-dropdown');
        if (menuDropdown && !menuDropdown.classList.contains('hidden')) {
            menuDropdown.classList.add('hidden');
        }
    }
}

/**
 * Update active navigation link based on current section
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    // Only select links from desktop menu, not from dropdown
    const desktopMenuLinks = document.querySelectorAll('#desktop-menu a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 120; // Offset for fixed navbar
    
    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav links - only for desktop menu (dropdown keeps its own colors)
    desktopMenuLinks.forEach(link => {
        const href = link.getAttribute('href');
        const sectionId = href.substring(1); // Remove # from href
        
        if (sectionId === currentSection) {
            link.classList.add('text-orange-primary');
            link.classList.remove('text-white', 'text-gray-900');
        } else {
            link.classList.remove('text-orange-primary');
            // Always use white text since navbar is transparent
            link.classList.add('text-white');
            link.classList.remove('text-gray-900');
        }
    });
}

/**
 * Smooth scroll to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export scroll utilities
if (window.ThellBarrio) {
    window.ThellBarrio.scrollToTop = scrollToTop;
    window.ThellBarrio.isInViewport = isInViewport;
} 