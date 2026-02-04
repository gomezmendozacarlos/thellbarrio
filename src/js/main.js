// Main JavaScript file for Thell Barrio Landing Page
// Funcionalidades principales del sitio

document.addEventListener('DOMContentLoaded', function() {
    console.log('🤘 Thell Barrio Landing Page loaded successfully!');
    
    // Initialize all main functionalities
    initSmoothScrolling();
    initLazyLoading();
    
    // Log para debugging
    console.log('Main.js initialized');
});

/**
 * Initialize smooth scrolling for navigation links
 */
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
                
                // Close menu if open
                closeMenuIfOpen();
            }
        });
    });
}

/**
 * Initialize lazy loading for images and videos
 */
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

/**
 * Close menu if open (called from other modules)
 */
function closeMenuIfOpen() {
    const menuDropdown = document.getElementById('menu-dropdown');
    if (menuDropdown && !menuDropdown.classList.contains('hidden')) {
        // Restore body scroll
        document.body.style.overflow = '';
        menuDropdown.classList.add('hidden');
    }
}

/**
 * Utility function to format dates in Spanish
 */
function formatDateSpanish(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-MX', options);
}

/**
 * Utility function to debounce function calls
 */
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

function toggleBio() {
    const bioExtra = document.getElementById('bio-extra');
    const bioToggle = document.getElementById('bio-toggle');
    if (bioExtra.classList.contains('hidden')) {
        bioExtra.classList.remove('hidden');
        bioToggle.textContent = 'Leer menos';
    } else {
        bioExtra.classList.add('hidden');
        bioToggle.textContent = 'Leer más';
    }
}

// Export functions for use in other modules
window.ThellBarrio = {
    closeMenuIfOpen,
    formatDateSpanish,
    debounce,
    toggleBio
}; 