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
// Instagram Feed Integration
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Reemplaza 'TU_ACCESS_TOKEN_AQUI' con tu token de acceso de Instagram
    // Para obtener un token: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
    const accessToken = 'TU_ACCESS_TOKEN_AQUI'; // ¡IMPORTANTE! Reemplaza esto

    if (accessToken !== 'TU_ACCESS_TOKEN_AQUI') {
        const feed = new Instafeed({
            accessToken: accessToken,
            limit: 6, // Número de posts a mostrar
            template: `
                <div class="gallery-item">
                    <a href="{{link}}" target="_blank" rel="noopener">
                        <img src="{{image}}" alt="{{caption}}" loading="lazy">
                        <div class="gallery-overlay">
                            <div class="gallery-content">
                                <i class="fas fa-heart"></i>
                                <h4>{{likes}} likes</h4>
                            </div>
                        </div>
                    </a>
                </div>
            `,
            after: function() {
                // Agregar animaciones AOS después de cargar
                const items = document.querySelectorAll('#instafeed .gallery-item');
                items.forEach((item, index) => {
                    item.setAttribute('data-aos', 'zoom-in');
                    item.setAttribute('data-aos-delay', (index * 100).toString());
                });
                AOS.refresh();
            },
            error: function() {
                // Si hay error, mostrar las imágenes de fallback
                document.querySelector('.gallery-fallback').style.display = 'block';
                console.warn('Error cargando feed de Instagram. Mostrando imágenes de fallback.');
            }
        });
        feed.run();
    } else {
        // Si no hay token, mostrar fallback
        document.querySelector('.gallery-fallback').style.display = 'block';
        console.info('No se configuró token de Instagram. Mostrando imágenes de fallback.');
    }
});
