// ================================
// Navigation Scroll Effect
// ================================
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    if (navbar) {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
}

// ================================
// Enhanced Mobile Menu with Accessibility
// ================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    // Enhanced click handler with accessibility
    navToggle.addEventListener('click', function() {
        const isActive = navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', isActive);
        
        // Trap focus within menu when open
        if (isActive) {
            trapFocus(navMenu);
        } else {
            removeFocusTrap();
        }
    });
    
    // Keyboard support for menu toggle
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Focus trap functionality
let focusTrapElements = [];
let previousFocus = null;

function trapFocus(container) {
    previousFocus = document.activeElement;
    focusTrapElements = Array.from(container.querySelectorAll('a, button, [tabindex="0"]'));
    
    if (focusTrapElements.length > 0) {
        focusTrapElements[0].focus();
    }
    
    container.addEventListener('keydown', handleFocusTrap);
}

function handleFocusTrap(e) {
    if (e.key === 'Tab') {
        const firstElement = focusTrapElements[0];
        const lastElement = focusTrapElements[focusTrapElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
}

function removeFocusTrap() {
    if (previousFocus) {
        previousFocus.focus();
    }
    
    if (navMenu) {
        navMenu.removeEventListener('keydown', handleFocusTrap);
    }
    
    focusTrapElements = [];
    previousFocus = null;
}

function closeMobileMenu() {
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        removeFocusTrap();
    }
}

// Close mobile menu when clicking on a link or outside
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMobileMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (navToggle && navMenu && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target) && 
        navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ================================
// Enhanced Smooth Scroll with Offset Handling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight - 20; // Extra offset for better spacing
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jump
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// ================================
// Enhanced Scroll to Top Button with Progress Indicator
// ================================
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopButton() {
    if (scrollTopBtn) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
            // Add progress indicator
            scrollTopBtn.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard support
    scrollTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// ================================
// AOS (Animate On Scroll) Initialization
// ================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
}

// ================================
// Active Navigation Link on Scroll (handled by debounced scroll below)
// ================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

// ================================
// Prevent Right Click on Images (Optional Protection)
// ================================
// Uncomment if you want to protect images
// document.addEventListener('contextmenu', function(e) {
//     if (e.target.tagName === 'IMG') {
//         e.preventDefault();
//     }
// });

// ================================
// Add Loading Animation on Page Load
// ================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ================================
// Dynamic Year in Footer
// ================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement && yearElement.textContent.includes('2025')) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
}

// ================================
// WhatsApp Button Click Tracking (Optional Analytics)
// ================================
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
whatsappButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here if needed
    });
});

// ================================
// Parallax Effect for Hero Section (with RAF)
// ================================
const hero = document.querySelector('.hero');
let ticking = false;
const shouldUseParallax = hero !== null;

function updateParallax(scrollPos) {
    hero.style.transform = `translateY(${scrollPos * 0.5}px)`;
    ticking = false;
}

function handleParallax() {
    if (!shouldUseParallax) return;
    
    const scrollPos = window.pageYOffset;
    if (!ticking && scrollPos < window.innerHeight) {
        window.requestAnimationFrame(() => updateParallax(scrollPos));
        ticking = true;
    }
}

// ================================
// Lazy Loading for Images
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ================================
// Add Entrance Animation on Scroll
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.service-card, .class-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// Console Welcome Message
// ================================
console.log('%c¡Bienvenida a Guerreras GYM! 💪', 'color: #e99bc3; font-size: 20px; font-weight: bold;');
console.log('%cFormá parte de nuestra manada de guerreras', 'color: #ffffff; font-size: 14px;');

// ================================
// 3D Tilt Effect for Cards (Optimized)
// ================================
function add3DTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .class-card');
    
    cards.forEach(card => {
        let rafId = null;
        
        card.addEventListener('mousemove', (e) => {
            if (rafId) return; // Skip if already scheduled
            
            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                rafId = null;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Initialize 3D tilt effect after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', add3DTiltEffect);
} else {
    add3DTiltEffect();
}

// ================================
// Gallery Item Hover Effects (Optimized with CSS classes)
// ================================
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.classList.add('gallery-item-hover');
    });
    
    item.addEventListener('mouseleave', function() {
        this.classList.remove('gallery-item-hover');
    });
});

// ================================
// Parallax Effect Enhancement
// ================================
function addParallaxToSections() {
    const sections = document.querySelectorAll('.section');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scrolled = window.scrollY;
                const rate = scrolled * -0.3;
                entry.target.style.backgroundPositionY = `${rate}px`;
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        scrollObserver.observe(section);
    });
}

// Initialize parallax effect
if (window.innerWidth > 768) {
    addParallaxToSections();
}

// ================================
// Performance Optimization - Single Scroll Handler
// ================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Consolidated scroll handler with all scroll-related functionality
function handleScroll() {
    handleNavbarScroll();
    handleScrollTopButton();
    activateNavLink();
    handleParallax();
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(handleScroll, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// ================================
// Enhanced Performance and Loading States
// ================================

// Add loading states for buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.href && this.href.includes('wa.me')) {
                // Add loading state for WhatsApp buttons
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Initialize loading states
addLoadingStates();

// ================================
// Enhanced Analytics and User Tracking
// ================================

// Track button interactions
function trackUserInteraction(element, action) {
    // Placeholder for analytics tracking
    console.log(`User Interaction: ${action} on ${element.tagName}${element.className ? '.' + element.className : ''}`);
    
    // Add your analytics code here (Google Analytics, Facebook Pixel, etc.)
    // Example: gtag('event', action, { 'element': element.tagName });
}

// Add tracking to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            trackUserInteraction(this, 'click');
        });
    });
});

// ================================
// Enhanced Error Handling
// ================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Add error tracking here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Add error tracking here
});
