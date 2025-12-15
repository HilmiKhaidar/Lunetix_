/**
 * Lunetix Utility Functions
 * Helper functions for better performance and user experience
 */

class LunetixUtils {
    /**
     * Debounce function to limit function calls
     */
    static debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }

    /**
     * Throttle function to limit function calls
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Lazy load images with intersection observer
     */
    static initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Preload critical resources
     */
    static preloadCriticalResources() {
        const criticalResources = [
            { href: '/styles.css', as: 'style' },
            { href: '/script.js', as: 'script' },
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
            document.head.appendChild(link);
        });
    }

    /**
     * Check if user prefers reduced motion
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Get device type
     */
    static getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    /**
     * Check if device supports touch
     */
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Format numbers with locale
     */
    static formatNumber(number, locale = 'id-ID') {
        return new Intl.NumberFormat(locale).format(number);
    }

    /**
     * Smooth scroll to element
     */
    static smoothScrollTo(element, offset = 0) {
        if (!element) return;
        
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 800);
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    /**
     * Local storage with error handling
     */
    static storage = {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('Failed to save to localStorage:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('Failed to read from localStorage:', e);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.warn('Failed to remove from localStorage:', e);
                return false;
            }
        }
    };

    /**
     * Analytics helper
     */
    static analytics = {
        track(event, data = {}) {
            if (typeof gtag !== 'undefined') {
                gtag('event', event, data);
            }
        },

        trackPageView(page) {
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_path: page
                });
            }
        },

        trackTiming(name, value) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: name,
                    value: Math.round(value)
                });
            }
        }
    };

    /**
     * Performance monitoring
     */
    static performance = {
        measureLCP() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                    LunetixUtils.analytics.trackTiming('LCP', lastEntry.startTime);
                });
                
                try {
                    observer.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('LCP measurement not supported');
                }
            }
        },

        measureFID() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                        LunetixUtils.analytics.trackTiming('FID', entry.processingStart - entry.startTime);
                    });
                });
                
                try {
                    observer.observe({ entryTypes: ['first-input'] });
                } catch (e) {
                    console.warn('FID measurement not supported');
                }
            }
        },

        measureCLS() {
            if ('PerformanceObserver' in window) {
                let clsValue = 0;
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                    LunetixUtils.analytics.trackTiming('CLS', clsValue * 1000);
                });
                
                try {
                    observer.observe({ entryTypes: ['layout-shift'] });
                } catch (e) {
                    console.warn('CLS measurement not supported');
                }
            }
        }
    };
}

// Initialize utilities when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        LunetixUtils.initLazyLoading();
        LunetixUtils.performance.measureLCP();
        LunetixUtils.performance.measureFID();
        LunetixUtils.performance.measureCLS();
    });
} else {
    LunetixUtils.initLazyLoading();
    LunetixUtils.performance.measureLCP();
    LunetixUtils.performance.measureFID();
    LunetixUtils.performance.measureCLS();
}

// Export for global use
window.LunetixUtils = LunetixUtils;