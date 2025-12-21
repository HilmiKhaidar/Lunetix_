/**
 * Lunetix Website - Professional JavaScript Implementation
 * Clean horizontal scroll layout with language switching
 */

'use strict';

// Enhanced error handling
class ErrorHandler {
    static init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }
    
    static handleError(event) {
        console.error('JavaScript Error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    }
    
    static handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
    }
}

// Initialize error handling
ErrorHandler.init();

// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lunetix website initialized');
    
    // Language Switcher Implementation
    function initializeLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const elementsWithLang = document.querySelectorAll('[data-id][data-en]');
        
        console.log('Language switcher initialized:', {
            buttons: langButtons.length,
            elements: elementsWithLang.length
        });
        
        function switchLanguage(selectedLang) {
            console.log('Switching to language:', selectedLang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-lang="${selectedLang}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Update content
            let updatedCount = 0;
            elementsWithLang.forEach(element => {
                const idText = element.getAttribute('data-id');
                const enText = element.getAttribute('data-en');
                
                if (idText || enText) {
                    if (selectedLang === 'id') {
                        element.textContent = idText || enText;
                    } else if (selectedLang === 'en') {
                        element.textContent = enText || idText;
                    }
                    updatedCount++;
                    
                    // Add smooth transition
                    element.style.transition = 'all 0.3s ease';
                    element.style.transform = 'translateY(-2px)';
                    element.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        element.style.transform = 'translateY(0)';
                        element.style.opacity = '1';
                    }, 50);
                }
            });
            
            console.log(`Updated ${updatedCount} elements`);
            
            // Show language indicator
            showLanguageIndicator(selectedLang);
            
            // Save preference
            try {
                localStorage.setItem('lunetix_language', selectedLang);
            } catch (e) {
                console.warn('Could not save language preference:', e);
            }
            
            // Update document language
            document.documentElement.setAttribute('lang', selectedLang === 'id' ? 'id' : 'en');
        }
        
        // Add click event listeners
        langButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                if (selectedLang && (selectedLang === 'id' || selectedLang === 'en')) {
                    switchLanguage(selectedLang);
                }
            });
        });
        
        // Load saved language or default to Indonesian
        const savedLang = localStorage.getItem('lunetix_language') || 'id';
        setTimeout(() => switchLanguage(savedLang), 300);
        
        // Keyboard shortcut (Ctrl/Cmd + L)
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                const currentLang = document.documentElement.getAttribute('lang') || 'id';
                const newLang = currentLang === 'id' ? 'en' : 'id';
                switchLanguage(newLang);
            }
        });
        
        return switchLanguage;
    }
    
    // Language indicator function
    function showLanguageIndicator(language) {
        const existingIndicator = document.querySelector('.language-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'language-indicator';
        indicator.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            ${language.toUpperCase()}
        `;
        
        // Add styles
        Object.assign(indicator.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(16, 185, 129, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateY(-10px)',
            transition: 'all 0.3s ease',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
        });
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translateY(0)';
            setTimeout(() => {
                indicator.style.opacity = '0';
                indicator.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (document.body.contains(indicator)) {
                        document.body.removeChild(indicator);
                    }
                }, 300);
            }, 1500);
        }, 100);
    }
    
    // Initialize language switcher
    const switchLanguage = initializeLanguageSwitcher();
    window.switchLanguage = switchLanguage; // For debugging
    
    // Horizontal Scroll Navigation
    function initHorizontalScroll() {
        const departmentsSection = document.querySelector('.departments-section');
        const departments = document.querySelectorAll('.department');
        const navDots = document.querySelectorAll('.nav-dot');
        
        if (!departmentsSection || departments.length === 0) {
            console.log('Horizontal scroll elements not found');
            return;
        }
        
        console.log('Initializing horizontal scroll for', departments.length, 'departments');
        
        let currentDepartment = 0;
        
        // Scroll to specific department
        function scrollToDepartment(index) {
            if (index >= 0 && index < departments.length) {
                const targetDepartment = departments[index];
                targetDepartment.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'start'
                });
                updateActiveDot(index);
                currentDepartment = index;
            }
        }
        
        // Update active navigation dot
        function updateActiveDot(activeIndex) {
            navDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Navigation dot click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                scrollToDepartment(index);
            });
        });
        
        // Navigation link handlers for specific departments
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#productivity') {
                    e.preventDefault();
                    scrollToDepartment(0); // Productivity is index 0
                } else if (href === '#health') {
                    e.preventDefault();
                    scrollToDepartment(1); // Health is index 1
                } else if (href === '#islamic') {
                    e.preventDefault();
                    scrollToDepartment(2); // Islamic is index 2
                } else if (href === '#departments') {
                    e.preventDefault();
                    scrollToDepartment(0); // Default to first department
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentDepartment > 0) {
                scrollToDepartment(currentDepartment - 1);
            } else if (e.key === 'ArrowRight' && currentDepartment < departments.length - 1) {
                scrollToDepartment(currentDepartment + 1);
            }
        });
        
        // Scroll detection for updating active dot
        let scrollTimeout;
        departmentsSection.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollLeft = departmentsSection.scrollLeft;
                const departmentWidth = window.innerWidth;
                const activeIndex = Math.round(scrollLeft / departmentWidth);
                if (activeIndex !== currentDepartment) {
                    updateActiveDot(activeIndex);
                    currentDepartment = activeIndex;
                }
            }, 100);
        });
        
        // Return function to allow external navigation
        return scrollToDepartment;
    }
    
    // Initialize horizontal scroll
    const scrollToDepartment = initHorizontalScroll();
    
    // Make scrollToDepartment globally available for debugging
    window.scrollToDepartment = scrollToDepartment;
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's a department link (handled by horizontal scroll)
            if (targetId === '#productivity' || targetId === '#health' || targetId === '#islamic' || targetId === '#departments') {
                return; // Let the horizontal scroll handler take care of it
            }
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = 80;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced navbar scroll effect
    const navbar = document.querySelector('.floating-navbar');
    let isScrolling = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
        }
        
        isScrolling = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    }, { passive: true });
    
    // App card click functionality
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const link = this.querySelector('a[href^="http"]');
            if (link) {
                window.open(link.href, '_blank');
                console.log('App opened:', link.href);
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
    
    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll('.app-card, .btn-primary, .btn-secondary, .app-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('app-card') 
                ? 'translateY(-8px) scale(1.02)' 
                : 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('app-card') 
                ? 'translateY(0) scale(1)' 
                : 'translateY(0)';
        });
    });
    
    // Performance monitoring
    const loadTime = performance.now();
    console.log(`Lunetix website loaded in ${Math.round(loadTime)}ms`);
    
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
        });
    });
});

// Page load optimizations
window.addEventListener('load', function() {
    console.log('All resources loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Initialize hero animations
document.addEventListener('DOMContentLoaded', function() {
    // Prepare hero elements for animation
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-cta');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
});