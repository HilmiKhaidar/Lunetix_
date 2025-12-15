/**
 * Lunetix Resource Optimization
 * Advanced optimization techniques for better performance
 */

class LunetixOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeImages();
        this.optimizeResources();
        this.setupIntersectionObserver();
        this.preloadCriticalResources();
    }
    
    // Optimize images with lazy loading and WebP support
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding="async" for better performance
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // WebP support detection and conversion
            this.addWebPSupport(img);
        });
    }
    
    // Add WebP support with fallback
    addWebPSupport(img) {
        if (this.supportsWebP()) {
            const src = img.src;
            if (src && !src.includes('.webp')) {
                // Create WebP version URL (assuming WebP versions exist)
                const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Test if WebP version exists
                this.testImageExists(webpSrc).then(exists => {
                    if (exists) {
                        img.src = webpSrc;
                    }
                });
            }
        }
    }
    
    // Test WebP support
    supportsWebP() {
        if (this._webpSupport !== undefined) {
            return this._webpSupport;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        this._webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return this._webpSupport;
    }
    
    // Test if image exists
    testImageExists(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
    
    // Optimize resource loading
    optimizeResources() {
        // Defer non-critical CSS
        this.deferNonCriticalCSS();
        
        // Optimize font loading
        this.optimizeFonts();
        
        // Preconnect to external domains
        this.preconnectExternalDomains();
    }
    
    // Defer non-critical CSS
    deferNonCriticalCSS() {
        const nonCriticalCSS = [
            'components.css'
        ];
        
        nonCriticalCSS.forEach(cssFile => {
            const link = document.querySelector(`link[href="${cssFile}"]`);
            if (link) {
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                };
            }
        });
    }
    
    // Optimize font loading
    optimizeFonts() {
        // Add font-display: swap to improve loading performance
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
            }
        });
    }
    
    // Preconnect to external domains
    preconnectExternalDomains() {
        const domains = [
            'https://vercel.app',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://www.googletagmanager.com'
        ];
        
        domains.forEach(domain => {
            if (!document.querySelector(`link[href="${domain}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                document.head.appendChild(link);
            }
        });
    }
    
    // Setup Intersection Observer for animations
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe sections for animation
            const sections = document.querySelectorAll('section, .department-section, .product-card');
            sections.forEach(section => {
                observer.observe(section);
            });
        }
    }
    
    // Preload critical resources
    preloadCriticalResources() {
        const criticalResources = [
            { href: '/favicon.svg', as: 'image' },
            { href: '/site.webmanifest', as: 'manifest' }
        ];
        
        criticalResources.forEach(resource => {
            const existingLink = document.querySelector(`link[href="${resource.href}"]`);
            if (!existingLink) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                document.head.appendChild(link);
            }
        });
    }
    
    // Critical CSS inlining (for future implementation)
    inlineCriticalCSS() {
        // This would inline critical CSS for above-the-fold content
        // Implementation depends on build process
        console.log('Critical CSS inlining ready for implementation');
    }
    
    // Resource hints optimization
    optimizeResourceHints() {
        // Add prefetch for likely next pages
        const prefetchResources = [
            'https://lunotes.vercel.app/',
            'https://lunotime.vercel.app/',
            'https://calcelix.vercel.app/',
            'https://lunomoney.vercel.app/'
        ];
        
        prefetchResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    // Performance monitoring
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                
                if (window.LunetixAnalytics) {
                    window.LunetixAnalytics.trackEvent('performance_lcp', {
                        value: Math.round(lastEntry.startTime)
                    });
                }
            });
            
            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP monitoring not supported');
            }
            
            // Monitor First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('FID:', fid);
                    
                    if (window.LunetixAnalytics) {
                        window.LunetixAnalytics.trackEvent('performance_fid', {
                            value: Math.round(fid)
                        });
                    }
                });
            });
            
            try {
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID monitoring not supported');
            }
        }
    }
}

// Initialize optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.LunetixOptimizer = new LunetixOptimizer();
    });
} else {
    window.LunetixOptimizer = new LunetixOptimizer();
}

// Export for global use
window.LunetixOptimizer = LunetixOptimizer;