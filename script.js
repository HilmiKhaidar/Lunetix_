/**
 * Lunetix Website - Professional JavaScript Implementation
 * Optimized for performance and user experience
 */

'use strict';

// Enhanced error handling with reporting
class ErrorHandler {
    static init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }
    
    static handleError(event) {
        const error = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack
        };
        
        console.error('JavaScript Error:', error);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': error.message,
                'fatal': false
            });
        }
    }
    
    static handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': `Promise rejection: ${event.reason}`,
                'fatal': false
            });
        }
    }
}

// Initialize error handling immediately
ErrorHandler.init();

// Resource loading error handler
function handleResourceError(event) {
    console.warn('Resource failed to load:', event.target.src || event.target.href);
    
    // Handle specific resource failures
    if (event.target.tagName === 'LINK' && event.target.rel === 'manifest') {
        console.log('Manifest loading failed - this is normal in development');
    }
    
    if (event.target.tagName === 'IMG') {
        // Provide fallback for images
        event.target.style.display = 'none';
    }
}

// Add resource error listeners
document.addEventListener('error', handleResourceError, true);

// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add js-enabled class for progressive enhancement
    document.body.classList.add('js-enabled');
    
    // Debug: Check if products section exists
    const productsSection = document.getElementById('products');
    const productCards = document.querySelectorAll('.product-card');
    const departmentSections = document.querySelectorAll('.department-section');
    const healthDepartment = document.querySelector('.department-section:last-of-type');
    
    console.log('Products section found:', !!productsSection);
    console.log('Product cards found:', productCards.length);
    console.log('Department sections found:', departmentSections.length);
    console.log('Health department found:', !!healthDepartment);
    
    // Ensure health department is visible
    if (healthDepartment) {
        healthDepartment.style.opacity = '1';
        healthDepartment.style.visibility = 'visible';
        healthDepartment.style.display = 'block';
        console.log('Health department visibility ensured');
    }
    
    // Ensure products are visible as fallback
    if (productCards.length > 0) {
        console.log('Setting up product visibility fallback');
        productCards.forEach((card, index) => {
            // Immediate fallback if animation fails
            setTimeout(() => {
                if (window.getComputedStyle(card).opacity === '0') {
                    console.log('Forcing visibility for product card:', index);
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            }, 1000);
        });
    }
    
    // Special handling for health department
    setTimeout(() => {
        const healthCards = document.querySelectorAll('.department-section:last-of-type .product-card');
        console.log('Health cards found:', healthCards.length);
        
        healthCards.forEach((card, index) => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.transform = 'translateY(0)';
            console.log(`Health card ${index + 1} visibility ensured`);
        });
    }, 500);
    
    // Smooth scrolling for navigation links with performance optimization
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 80;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                // Use requestAnimationFrame for smoother scrolling
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 800;
                let startTime = null;
                
                function scrollAnimation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeInOutCubic = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic);
                    
                    if (progress < 1) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }
                
                requestAnimationFrame(scrollAnimation);
            }
        });
    });
    
    // Optimized navbar scroll effect with throttling
    const navbar = document.querySelector('.navbar');
    let isScrolling = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        isScrolling = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    }, { passive: true });
    
    // Optimized hover effects for product cards with performance
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add will-change for better performance
        card.style.willChange = 'transform, box-shadow';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) translateZ(0)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        }, { passive: true });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) translateZ(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }, { passive: true });
    });
    
    // Add click functionality to ecosystem app nodes
    const appNodes = document.querySelectorAll('.app-node');
    const appCards = document.querySelectorAll('.app-card');
    const appUrls = {
        'Lunotes': 'https://lunotes.vercel.app/',
        'Lunotime': 'https://lunotime.vercel.app/',
        'Calcelix': 'https://calcelix.vercel.app/',
        'Lunomoney': 'https://lunomoney.vercel.app/',
        'Lunomove': 'https://lunomove.vercel.app/',
        'Lunosleep': 'https://lunosleep.vercel.app/',
        'Lunocare': 'https://lunocare.vercel.app/',
        'Lunohydra': 'https://lunohydra.vercel.app/'
    };
    
    // Handle both app nodes and app cards
    [...appNodes, ...appCards].forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const appName = this.querySelector('span').textContent;
            const url = appUrls[appName];
            if (url) {
                window.open(url, '_blank');
                
                // Track app clicks
                if (window.LunetixAnalytics) {
                    window.LunetixAnalytics.trackEvent('app_card_click', {
                        app_name: appName,
                        app_url: url
                    });
                }
            }
        });
        
        // Add cursor pointer
        element.style.cursor = 'pointer';
    });
    
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
        });
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Mobile App Notification
    const notifyMeBtn = document.getElementById('notifyMeBtn');
    
    if (notifyMeBtn) {
        notifyMeBtn.addEventListener('click', function() {
            const email = prompt('Masukkan email Anda untuk mendapatkan notifikasi mobile app:');
            
            if (email && email.includes('@')) {
                this.textContent = '✅ Notifikasi Diaktifkan';
                this.disabled = true;
                this.style.background = '#10B981';
                this.style.cursor = 'not-allowed';
                
                // Track mobile app interest
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'mobile_app_interest', {
                        'email': email
                    });
                }
                
                // Show success message
                setTimeout(() => {
                    alert('Terima kasih! Kami akan mengirimkan notifikasi ke ' + email + ' ketika aplikasi mobile tersedia.');
                }, 500);
            } else if (email) {
                alert('Email tidak valid. Silakan coba lagi.');
            }
        });
    }
    
    // Chat Widget
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const quickActions = document.querySelectorAll('.quick-action');
    
    if (chatButton && chatPopup) {
        chatButton.addEventListener('click', function() {
            chatPopup.style.display = chatPopup.style.display === 'none' ? 'block' : 'none';
        });
        
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatPopup.style.display = 'none';
            });
        }
        
        // Quick action buttons
        quickActions.forEach(action => {
            action.addEventListener('click', function() {
                const message = this.getAttribute('data-message');
                addChatMessage(message, 'user');
                
                // Simulate bot response
                setTimeout(() => {
                    let response = '';
                    if (message.includes('memulai')) {
                        response = 'Sangat mudah! Cukup klik salah satu aplikasi di atas (Lunotes, Lunotime, Calcelix, atau Lunomoney), buat akun gratis, dan Anda langsung bisa mulai menggunakan semua fitur yang tersedia.';
                    } else if (message.includes('perbedaan')) {
                        response = 'Lunotes untuk catatan, Lunotime untuk manajemen waktu, Calcelix untuk perhitungan, dan Lunomoney untuk keuangan. Semuanya terintegrasi dalam satu ecosystem!';
                    } else if (message.includes('mobile')) {
                        response = 'Ya! Kami sedang mengembangkan aplikasi mobile untuk iOS dan Android. Saat ini, semua aplikasi Lunetix sudah responsive dan dapat digunakan dengan nyaman di mobile browser.';
                    } else if (message.includes('gratis')) {
                        response = 'Ya, semua aplikasi dalam ekosistem Lunetix dapat digunakan secara gratis. Kami percaya bahwa tools untuk mengelola hidup harus dapat diakses oleh semua orang tanpa hambatan finansial.';
                    } else if (message.includes('aman') || message.includes('data')) {
                        response = 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi end-to-end dan disimpan dengan standar keamanan tinggi. Kami tidak pernah membagikan data personal Anda kepada pihak ketiga.';
                    } else if (message.includes('perangkat') || message.includes('device')) {
                        response = 'Tentu saja! Lunetix dapat diakses melalui web browser di komputer, tablet, dan smartphone. Data Anda akan tersinkronisasi otomatis di semua perangkat yang Anda gunakan.';
                    }
                    addChatMessage(response, 'bot');
                }, 1000);
            });
        });
        
        // Send message
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                // Simulate bot response
                setTimeout(() => {
                    addChatMessage('Terima kasih atas pesan Anda! Tim kami akan segera merespons. Untuk bantuan lebih lanjut, silakan email ke brand@lunetix.com', 'bot');
                }, 1000);
            }
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        function addChatMessage(message, sender) {
            const chatBody = document.querySelector('.chat-body');
            if (chatBody) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chat-message ${sender}-message`;
                messageDiv.innerHTML = `<p>${message}</p>`;
                chatBody.appendChild(messageDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }
    }
    
    // Language indicator function
    function showLanguageIndicator(language) {
        // Remove existing indicator if any
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
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(indicator)) {
                        document.body.removeChild(indicator);
                    }
                }, 300);
            }, 1500);
        }, 100);
    }

    // Language Switcher - Enhanced and Fixed
    function initializeLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        // Use more flexible selector to catch all elements with language attributes
        const elementsWithLang = document.querySelectorAll('[data-id], [data-en]');
        const elementsWithBothLang = document.querySelectorAll('[data-id][data-en]');
        
        console.log('Language Switcher initialized:', {
            buttons: langButtons.length,
            elementsWithLang: elementsWithLang.length,
            elementsWithBothLang: elementsWithBothLang.length
        });
        
        // Debug: Log first few elements to check attributes
        elementsWithBothLang.forEach((el, i) => {
            if (i < 3) {
                console.log(`Element ${i}:`, {
                    tag: el.tagName,
                    id: el.getAttribute('data-id'),
                    en: el.getAttribute('data-en'),
                    text: el.textContent.substring(0, 50) + '...'
                });
            }
        });
        
        if (langButtons.length === 0) {
            console.warn('No language buttons found');
            return;
        }
        
        function switchLanguage(selectedLang) {
            console.log('Switching to language:', selectedLang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-lang="${selectedLang}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Update content with better error handling and fallbacks
            let updatedCount = 0;
            elementsWithBothLang.forEach((element, index) => {
                const idText = element.getAttribute('data-id');
                const enText = element.getAttribute('data-en');
                
                if (idText || enText) {
                    try {
                        if (selectedLang === 'id') {
                            element.textContent = idText || enText; // Fallback to English if Indonesian not available
                        } else if (selectedLang === 'en') {
                            element.textContent = enText || idText; // Fallback to Indonesian if English not available
                        }
                        updatedCount++;
                        
                        // Add smooth transition animation
                        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        element.style.transform = 'translateY(-2px)';
                        element.style.opacity = '0.8';
                        
                        setTimeout(() => {
                            element.style.transform = 'translateY(0)';
                            element.style.opacity = '1';
                        }, 50);
                        
                    } catch (e) {
                        console.warn(`Error updating element ${index}:`, e, element);
                    }
                } else {
                    console.warn(`Element ${index} missing language attributes:`, element);
                }
            });
            
            console.log(`Updated ${updatedCount} elements`);
            
            // Show language change indicator
            showLanguageIndicator(selectedLang);
            
            // Save language preference
            try {
                localStorage.setItem('lunetix_language', selectedLang);
                console.log('Language preference saved:', selectedLang);
            } catch (e) {
                console.warn('Could not save language preference:', e);
            }
            
            // Update document language
            document.documentElement.setAttribute('lang', selectedLang === 'id' ? 'id' : 'en');
            
            // Dispatch custom event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: selectedLang } 
            }));
            
            // Update page title based on language
            const titleMap = {
                'id': 'Lunetix - Ecosystem Produktivitas Digital Terlengkap Indonesia',
                'en': 'Lunetix - Complete Digital Productivity Ecosystem Indonesia'
            };
            document.title = titleMap[selectedLang] || titleMap['id'];
        }
        
        // Add click event listeners
        langButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                console.log('Language button clicked:', selectedLang);
                
                if (selectedLang && (selectedLang === 'id' || selectedLang === 'en')) {
                    switchLanguage(selectedLang);
                } else {
                    console.error('Invalid language selected:', selectedLang);
                }
            });
        });
        
        // Load saved language preference or default to Indonesian
        const savedLang = localStorage.getItem('lunetix_language') || 'id';
        console.log('Loading saved language:', savedLang);
        
        // Initialize with saved language after DOM is ready
        setTimeout(() => {
            console.log('Initializing language switcher with:', savedLang);
            switchLanguage(savedLang);
        }, 300);
        
        // Add help text for keyboard shortcut
        console.log('💡 Tip: Press Ctrl/Cmd + L to quickly switch languages!');
        
        // Add keyboard shortcut (Ctrl/Cmd + L) for language switching
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                const currentLang = document.documentElement.getAttribute('lang') || 'id';
                const newLang = currentLang === 'id' ? 'en' : 'id';
                console.log('Keyboard shortcut triggered, switching to:', newLang);
                switchLanguage(newLang);
            }
        });
        
        // Return the switch function for external use
        return switchLanguage;
    }
    
    // Initialize language switcher
    const switchLanguage = initializeLanguageSwitcher();
    
    // Make switchLanguage globally available for debugging
    window.switchLanguage = switchLanguage;
    
    // Smooth Animated Counter with Easing
    function animateCounter(element, target, duration = 2500) {
        const start = 0;
        const startTime = performance.now();
        
        // Easing function for smooth animation
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = start + (target - start) * easedProgress;
            
            if (target === 99.9) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Final value to ensure accuracy
                if (target === 99.9) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.footer-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    
                    // Staggered animation - each counter starts with a delay
                    counters.forEach((counter, index) => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        
                        // Add fade-in animation to parent stat item
                        const statItem = counter.closest('.stat-item');
                        if (statItem) {
                            statItem.style.opacity = '0';
                            statItem.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                statItem.style.transition = 'all 0.6s ease';
                                statItem.style.opacity = '1';
                                statItem.style.transform = 'translateY(0)';
                                
                                // Start counter animation after fade-in
                                setTimeout(() => {
                                    animateCounter(counter, target);
                                }, 200);
                            }, index * 200); // Stagger delay
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        observer.observe(statsSection);
    }
    
    // Back to Top Button with Smooth Animations
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        let isVisible = false;
        
        // Throttled scroll handler for better performance
        let ticking = false;
        function updateBackToTop() {
            const scrolled = window.pageYOffset;
            const shouldShow = scrolled > 300;
            
            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                if (shouldShow) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });
        
        // Smooth scroll to top with custom easing
        backToTop.addEventListener('click', function() {
            const startPosition = window.pageYOffset;
            const startTime = performance.now();
            const duration = 800;
            
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }
            
            function scrollAnimation(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition * (1 - easedProgress));
                
                if (progress < 1) {
                    requestAnimationFrame(scrollAnimation);
                }
            }
            
            requestAnimationFrame(scrollAnimation);
        });
    }
    
    // Advanced Scroll Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                console.log('Element entering viewport:', element.className);
                
                // Add staggered animation delay
                setTimeout(() => {
                    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    
                    if (element.classList.contains('product-card')) {
                        element.classList.add('animate-fade-in-up');
                    } else if (element.classList.contains('app-card')) {
                        element.classList.add('animate-scale-in');
                    } else if (element.classList.contains('feature-item')) {
                        element.classList.add('animate-fade-in-left');
                    } else if (element.classList.contains('section-title')) {
                        element.classList.add('animate-fade-in-up');
                    } else if (element.classList.contains('section-subtitle')) {
                        element.classList.add('animate-fade-in-up');
                    } else {
                        element.classList.add('animate-fade-in-up');
                    }
                }, index * 100); // Stagger delay
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with fallback
    const animateElements = document.querySelectorAll('.product-card, .app-card, .feature-item, .section-title, .section-subtitle, .contact-item');
    console.log('Found elements for animation:', animateElements.length);
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        animationObserver.observe(el);
        
        // Fallback: Show elements after 3 seconds if animation doesn't trigger
        setTimeout(() => {
            if (el.style.opacity === '0') {
                console.log('Fallback animation for element:', index);
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        }, 3000 + (index * 100));
    });
    
    // Parallax Effect for Hero Section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::after, .ecosystem-grid');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Add floating animation to app cards with staggered delays
    const floatingAppCards = document.querySelectorAll('.app-card');
    floatingAppCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.classList.add('float-animation');
        
        // Add random rotation on hover for more dynamic feel
        card.addEventListener('mouseenter', function() {
            const randomRotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
            this.style.transform = `translateY(-8px) scale(1.02) rotate(${randomRotation}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
    
    // Micro-interactions for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
    
    // Performance monitoring and optimization
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        });
    });
    
    if ('PerformanceObserver' in window) {
        try {
            performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('Performance Observer not supported');
        }
    }
});

// Service Worker Registration for PWA functionality
if ('serviceWorker' in navigator && window.LunetixConfig?.features?.serviceWorker !== false) {
    window.addEventListener('load', () => {
        // Only register service worker in production
        if (location.protocol === 'https:' || location.hostname === 'localhost') {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, show update notification
                                console.log('New content available, please refresh.');
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.warn('Service Worker registration failed (this is normal in development):', error);
                });
        }
    });
}

// Page Load Animation and Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Lunetix website loaded in ${Math.round(loadTime)}ms`);
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add('animate-fade-in-up');
            }, index * 200);
        });
        
        // Animate ecosystem grid
        setTimeout(() => {
            const ecosystemGrid = document.querySelector('.ecosystem-grid');
            if (ecosystemGrid) {
                ecosystemGrid.style.opacity = '1';
                ecosystemGrid.classList.add('animate-scale-in');
            }
        }, 600);
    }, 100);
});

// Custom cursor removed - using default browser cursor

// Initialize hero animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hide hero elements initially for animation
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .ecosystem-grid');
    heroElements.forEach(element => {
        element.style.opacity = '0';
    });
});