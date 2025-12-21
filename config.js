/**
 * Lunetix Website Configuration
 * Centralized configuration for better maintainability
 */
window.LunetixConfig = {
    // Application URLs
    apps: {
        lunotes: 'https://lunotes.vercel.app/',
        lunotime: 'https://lunotime.vercel.app/',
        calcelix: 'https://calcelix.vercel.app/',
        lunomoney: 'https://lunomoney.vercel.app/',
        lunomove: 'https://lunomove.vercel.app/',
        lunosleep: 'https://lunosleep.vercel.app/',
        lunocare: 'https://lunocare.vercel.app/',
        lunohydra: 'https://lunohydra.vercel.app/',
        alquran: 'https://alquran-digital-seven.vercel.app/'
    },
    
    // Social media links
    social: {
        instagram: 'https://instagram.com/lunetix',
        twitter: 'https://x.com/lunetix',
        linkedin: 'https://linkedin.com/company/lunetix'
    },
    
    // Contact information
    contact: {
        email: 'brand@lunetix.com',
        website: 'lunetix.vercel.app'
    },
    
    // Feature flags
    features: {
        customCursor: true,
        chatWidget: true,
        analytics: true,
        performanceMonitoring: true,
        serviceWorker: true,
        lazyLoading: true,
        smoothScrolling: true
    },
    
    // Animation settings
    animations: {
        duration: {
            fast: 200,
            normal: 300,
            slow: 500
        },
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    // Performance thresholds
    performance: {
        maxLoadTime: 3000,
        maxLCP: 2500,
        maxFID: 100,
        maxCLS: 0.1
    },
    
    // Debug mode (set to false in production)
    debug: false,
    
    // Logging configuration
    logging: {
        level: 'info', // error, warn, info, debug
        endpoint: null // Set to your logging service endpoint
    },
    
    // Analytics configuration
    analytics: {
        endpoint: null, // Custom analytics endpoint
        trackingId: 'GA_MEASUREMENT_ID'
    },
    
    // Version info
    version: '1.0.0',
    buildDate: new Date().toISOString()
};