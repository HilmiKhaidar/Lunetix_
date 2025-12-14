// Fast, no-delay website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect - instant
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    

    
    // Instant hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Add click functionality to ecosystem app nodes
    const appNodes = document.querySelectorAll('.app-node');
    const appUrls = {
        'Lunotes': 'https://lunotes.vercel.app/',
        'Lunotime': 'https://lunotime.vercel.app/',
        'Calcelix': 'https://calcelix.vercel.app/',
        'Lunomoney': 'https://lunomoney.vercel.app/'
    };
    
    appNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            e.stopPropagation();
            const appName = this.querySelector('span').textContent;
            const url = appUrls[appName];
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // Add cursor pointer
        node.style.cursor = 'pointer';
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
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}-message`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
    
    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-id][data-en]');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            elementsWithLang.forEach(element => {
                const idText = element.getAttribute('data-id');
                const enText = element.getAttribute('data-en');
                
                if (selectedLang === 'id') {
                    element.textContent = idText;
                } else {
                    element.textContent = enText;
                }
            });
            
            // Save language preference
            localStorage.setItem('language', selectedLang);
            
            // Update document language
            document.documentElement.setAttribute('lang', selectedLang === 'id' ? 'id' : 'en');
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('language') || 'id';
    const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    
    if (savedLangBtn) {
        savedLangBtn.click();
    }
    
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
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Lunetix website loaded in ${Math.round(loadTime)}ms`);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});