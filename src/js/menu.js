// Menu functionality for Thell Barrio Landing Page
// Manejo del menú hamburguesa y navegación adaptativa

document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu functionality
    initHamburgerMenu();
    
    console.log('Menu.js initialized');
});

/**
 * Initialize hamburger menu functionality
 */
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    
    if (!hamburgerBtn || !menuDropdown) {
        console.warn('Menu elements not found');
        return;
    }
    
    // Toggle menu on hamburger button click
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu on close button click
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }
    
    // Close menu when clicking on menu links
    const menuLinks = menuDropdown.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking on backdrop (but not on menu content)
    menuDropdown.addEventListener('click', function(e) {
        // Only close if clicking on the backdrop (the fullscreen overlay)
        if (e.target === menuDropdown) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

/**
 * Toggle menu visibility
 */
function toggleMenu() {
    const menuDropdown = document.getElementById('menu-dropdown');
    
    if (menuDropdown.classList.contains('hidden')) {
        openMenu();
    } else {
        closeMenu();
    }
}

/**
 * Open menu
 */
function openMenu() {
    const menuDropdown = document.getElementById('menu-dropdown');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    menuDropdown.classList.remove('hidden');
    
    // Add slide-in animation from right to left
    menuDropdown.style.transform = 'translateX(100%)';
    menuDropdown.style.opacity = '1';
    
    requestAnimationFrame(() => {
        menuDropdown.style.transition = 'transform 0.4s ease-out';
        menuDropdown.style.transform = 'translateX(0)';
    });
}

/**
 * Close menu
 */
function closeMenu() {
    const menuDropdown = document.getElementById('menu-dropdown');
    
    if (!menuDropdown.classList.contains('hidden')) {
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Slide out animation to the right
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

/**
 * Handle menu state based on screen size
 */
function handleMenuResize() {
    const menuDropdown = document.getElementById('menu-dropdown');
    
    // Close menu if screen becomes desktop size and not scrolled
    if (window.innerWidth >= 1024 && window.scrollY <= 100) {
        closeMenu();
    }
}

// Listen for window resize
window.addEventListener('resize', window.ThellBarrio?.debounce(handleMenuResize, 250) || handleMenuResize); 