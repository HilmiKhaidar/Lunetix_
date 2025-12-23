/**
 * Lunetix Website - Simple JavaScript Implementation
 */

'use strict';

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
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
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
                }
            });
            
            console.log(`Updated ${updatedCount} elements`);
            
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
        
        return switchLanguage;
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
                const idText = this.getAttribute('data-id');
                
                if (href === '#departments' || href === '#hero' || href === '#about') {
                    e.preventDefault();
                    
                    if (href === '#hero') {
                        // Scroll to hero section
                        const heroSection = document.querySelector('#hero');
                        if (heroSection) {
                            heroSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } else if (href === '#about') {
                        // Scroll to about section
                        const aboutSection = document.querySelector('#about');
                        if (aboutSection) {
                            aboutSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } else if (idText === 'Produktivitas') {
                        scrollToDepartment(0);
                    } else if (idText === 'Kesehatan') {
                        scrollToDepartment(1);
                    } else if (idText === 'Islam') {
                        scrollToDepartment(2);
                    } else {
                        scrollToDepartment(0);
                    }
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
        
        return scrollToDepartment;
    }
    
    // Initialize horizontal scroll
    const scrollToDepartment = initHorizontalScroll();
    window.scrollToDepartment = scrollToDepartment;
    
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
    
    // Enhanced app card interactions
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
        
        card.style.cursor = 'pointer';
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target && href !== '#departments') {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});