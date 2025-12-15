/**
 * Lunetix Performance Optimizations
 * Additional performance enhancements for better user experience
 */

(function() {
    'use strict';
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            '/favicon.svg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Optimize images loading
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                if (!img.loading) {
                    img.loading = 'lazy';
                }
            });
        } else {
            // Fallback for browsers that don't support loading="lazy"
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Optimize font loading
    function optimizeFonts() {
        if ('fonts' in document) {
            // Preload Inter font
            const font = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)', {
                weight: '400 900',
                style: 'normal',
                display: 'swap'
            });
            
            font.load().then(() => {
                document.fonts.add(font);
            }).catch(err => {
                console.warn('Font loading failed:', err);
            });
        }
    }
    
    // Critical CSS inlining check
    function checkCriticalCSS() {
        const criticalCSS = `
            .hero { background: #FEF3C7; }
            .navbar { background: rgba(255, 255, 255, 0.95); }
            .ecosystem-grid { display: grid; }
        `;
        
        // Only inject if not already present
        if (!document.querySelector('#critical-css')) {
            const style = document.createElement('style');
            style.id = 'critical-css';
            style.textContent = criticalCSS;
            document.head.insertBefore(style, document.head.firstChild);
        }
    }
    
    // Performance monitoring
    function monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                
                // Report to analytics
                if (window.LunetixAnalytics) {
                    window.LunetixAnalytics.trackEvent('core_web_vitals', {
                        metric: 'LCP',
                        value: Math.round(lastEntry.startTime)
                    });
                }
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('FID:', fid);
                    
                    if (window.LunetixAnalytics) {
                        window.LunetixAnalytics.trackEvent('core_web_vitals', {
                            metric: 'FID',
                            value: Math.round(fid)
                        });
                    }
                });
            }).observe({ entryTypes: ['first-input'] });
            
            // Cumulative Layout Shift
            let clsValue = 0;
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                if (window.LunetixAnalytics) {
                    window.LunetixAnalytics.trackEvent('core_web_vitals', {
                        metric: 'CLS',
                        value: Math.round(clsValue * 1000) / 1000
                    });
                }
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // Resource hints optimization
    function addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // Initialize optimizations
    function init() {
        // Run immediately
        checkCriticalCSS();
        addResourceHints();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                preloadCriticalResources();
                optimizeImages();
                optimizeFonts();
                monitorPerformance();
            });
        } else {
            preloadCriticalResources();
            optimizeImages();
            optimizeFonts();
            monitorPerformance();
        }
        
        // Run when page is fully loaded
        window.addEventListener('load', () => {
            // Additional optimizations after load
            console.log('Lunetix performance optimizations loaded');
        });
    }
    
    // Start optimizations
    init();
    
})();