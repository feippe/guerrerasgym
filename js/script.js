// ================================
// Navigation Scroll Effect
// ================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ================================
// Mobile Menu Toggle
// ================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ================================
// Smooth Scroll for Navigation Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Scroll to Top Button
// ================================
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopButton() {
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
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
if (yearElement && yearElement.textContent.includes('2024')) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
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
