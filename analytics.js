/**
 * Lunetix Analytics Implementation
 * Professional analytics tracking with privacy compliance
 */

class LunetixAnalytics {
    constructor() {
        this.isEnabled = false;
        this.queue = [];
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.init();
    }

    init() {
        // Check if analytics is enabled and user has consented
        const consent = LunetixUtils.storage.get('analytics_consent', false);
        if (consent && window.LunetixConfig?.features?.analytics) {
            this.enable();
        }
        
        this.setupEventListeners();
    }

    enable() {
        this.isEnabled = true;
        this.processQueue();
        console.log('Analytics enabled');
    }

    disable() {
        this.isEnabled = false;
        console.log('Analytics disabled');
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserId() {
        let userId = LunetixUtils.storage.get('user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            LunetixUtils.storage.set('user_id', userId);
        }
        return userId;
    }

    track(event, properties = {}) {
        const eventData = {
            event,
            properties: {
                ...properties,
                timestamp: Date.now(),
                session_id: this.sessionId,
                user_id: this.userId,
                page_url: window.location.href,
                page_title: document.title,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                device_type: LunetixUtils.getDeviceType(),
                is_touch_device: LunetixUtils.isTouchDevice()
            }
        };

        if (this.isEnabled) {
            this.sendEvent(eventData);
        } else {
            this.queue.push(eventData);
        }
    }

    sendEvent(eventData) {
        // Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventData.event, eventData.properties);
        }

        // Send to custom analytics endpoint (if configured)
        if (window.LunetixConfig?.analytics?.endpoint) {
            this.sendToCustomEndpoint(eventData);
        }

        // Log for debugging
        if (window.LunetixConfig?.debug) {
            console.log('Analytics Event:', eventData);
        }
    }

    sendToCustomEndpoint(eventData) {
        fetch(window.LunetixConfig.analytics.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        }).catch(error => {
            console.warn('Failed to send analytics event:', error);
        });
    }

    processQueue() {
        while (this.queue.length > 0) {
            const eventData = this.queue.shift();
            this.sendEvent(eventData);
        }
    }

    setupEventListeners() {
        // Page view tracking
        this.track('page_view');

        // Scroll depth tracking
        let maxScrollDepth = 0;
        const trackScrollDepth = LunetixUtils.throttle(() => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (scrollDepth >= 25 && scrollDepth < 50) {
                    this.track('scroll_depth', { depth: 25 });
                } else if (scrollDepth >= 50 && scrollDepth < 75) {
                    this.track('scroll_depth', { depth: 50 });
                } else if (scrollDepth >= 75 && scrollDepth < 90) {
                    this.track('scroll_depth', { depth: 75 });
                } else if (scrollDepth >= 90) {
                    this.track('scroll_depth', { depth: 90 });
                }
            }
        }, 1000);

        window.addEventListener('scroll', trackScrollDepth, { passive: true });

        // Time on page tracking
        let startTime = Date.now();
        let isActive = true;

        const trackTimeOnPage = () => {
            if (isActive) {
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                this.track('time_on_page', { seconds: timeSpent });
            }
        };

        // Track time on page every 30 seconds
        setInterval(trackTimeOnPage, 30000);

        // Track when user becomes inactive
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isActive = false;
                trackTimeOnPage();
            } else {
                isActive = true;
                startTime = Date.now();
            }
        });

        // Track before page unload
        window.addEventListener('beforeunload', trackTimeOnPage);

        // Click tracking for important elements
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a, button, .btn');
            if (target) {
                const elementType = target.tagName.toLowerCase();
                const elementText = target.textContent.trim();
                const elementHref = target.href || '';
                const elementClass = target.className || '';

                this.track('element_click', {
                    element_type: elementType,
                    element_text: elementText,
                    element_href: elementHref,
                    element_class: elementClass
                });

                // Special tracking for product links
                if (elementHref.includes('vercel.app')) {
                    const productName = this.extractProductName(elementHref);
                    this.track('product_click', {
                        product_name: productName,
                        link_url: elementHref
                    });
                }
            }
        });

        // Form interaction tracking
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.tagName === 'FORM') {
                this.track('form_submit', {
                    form_id: form.id || 'unknown',
                    form_action: form.action || 'unknown'
                });
            }
        });

        // Error tracking
        window.addEventListener('error', (event) => {
            this.track('javascript_error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        // Performance tracking
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.track('page_performance', {
                        load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        first_byte: Math.round(perfData.responseStart - perfData.requestStart)
                    });
                }
            }, 0);
        });
    }

    extractProductName(url) {
        if (url.includes('lunotes')) return 'Lunotes';
        if (url.includes('lunotime')) return 'Lunotime';
        if (url.includes('calcelix')) return 'Calcelix';
        if (url.includes('lunomoney')) return 'Lunomoney';
        if (url.includes('lunomove')) return 'Lunomove';
        if (url.includes('lunosleep')) return 'Lunosleep';
        if (url.includes('lunocare')) return 'Lunocare';
        if (url.includes('lunohydra')) return 'Lunohydra';
        return 'Unknown';
    }

    // Public methods for manual tracking
    trackPageView(page = window.location.pathname) {
        this.track('page_view', { page });
    }

    trackEvent(event, properties = {}) {
        this.track(event, properties);
    }

    trackConversion(type, value = 0) {
        this.track('conversion', { type, value });
    }

    trackUserEngagement(action, category = 'engagement') {
        this.track('user_engagement', { action, category });
    }

    // GDPR Compliance methods
    requestConsent() {
        return new Promise((resolve) => {
            // Simple consent implementation
            const consent = confirm('This website uses analytics to improve user experience. Do you consent to analytics tracking?');
            LunetixUtils.storage.set('analytics_consent', consent);
            
            if (consent) {
                this.enable();
            }
            
            resolve(consent);
        });
    }

    revokeConsent() {
        LunetixUtils.storage.set('analytics_consent', false);
        this.disable();
        // Clear any stored analytics data
        LunetixUtils.storage.remove('user_id');
    }

    getConsentStatus() {
        return LunetixUtils.storage.get('analytics_consent', false);
    }
}

// Initialize analytics
window.LunetixAnalytics = new LunetixAnalytics();

// Auto-request consent if not already given
if (window.LunetixAnalytics.getConsentStatus() === null) {
    // Delay consent request to not interrupt user experience
    setTimeout(() => {
        window.LunetixAnalytics.requestConsent();
    }, 3000);
}