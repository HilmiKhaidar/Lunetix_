/**
 * Lunetix Logger
 * Professional logging system with different levels and remote reporting
 */

class LunetixLogger {
    constructor() {
        this.levels = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3
        };
        
        this.currentLevel = window.LunetixConfig?.debug ? this.levels.DEBUG : this.levels.INFO;
        this.logs = [];
        this.maxLogs = 100;
        
        this.init();
    }
    
    init() {
        // Override console methods for better tracking
        this.originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };
        
        // Intercept console methods if in production
        if (!window.LunetixConfig?.debug) {
            console.error = (...args) => {
                this.error(...args);
                this.originalConsole.error(...args);
            };
            
            console.warn = (...args) => {
                this.warn(...args);
                this.originalConsole.warn(...args);
            };
        }
    }
    
    log(level, message, data = {}) {
        if (level > this.currentLevel) return;
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: Object.keys(this.levels)[level],
            message,
            data,
            url: window.location.href,
            userAgent: navigator.userAgent,
            sessionId: window.LunetixAnalytics?.sessionId || 'unknown'
        };
        
        // Add to logs array
        this.logs.push(logEntry);
        
        // Keep only recent logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        // Send critical errors to remote logging
        if (level === this.levels.ERROR) {
            this.sendToRemote(logEntry);
        }
        
        // Store in localStorage for debugging
        this.storeLocally(logEntry);
        
        return logEntry;
    }
    
    error(message, data = {}) {
        return this.log(this.levels.ERROR, message, data);
    }
    
    warn(message, data = {}) {
        return this.log(this.levels.WARN, message, data);
    }
    
    info(message, data = {}) {
        return this.log(this.levels.INFO, message, data);
    }
    
    debug(message, data = {}) {
        return this.log(this.levels.DEBUG, message, data);
    }
    
    sendToRemote(logEntry) {
        // Send to analytics if available
        if (window.LunetixAnalytics) {
            window.LunetixAnalytics.track('error_logged', {
                error_level: logEntry.level,
                error_message: logEntry.message,
                error_data: JSON.stringify(logEntry.data)
            });
        }
        
        // Send to remote logging service if configured
        if (window.LunetixConfig?.logging?.endpoint) {
            fetch(window.LunetixConfig.logging.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logEntry)
            }).catch(err => {
                this.originalConsole.error('Failed to send log to remote:', err);
            });
        }
    }
    
    storeLocally(logEntry) {
        try {
            const storedLogs = JSON.parse(localStorage.getItem('lunetix_logs') || '[]');
            storedLogs.push(logEntry);
            
            // Keep only last 50 logs in localStorage
            if (storedLogs.length > 50) {
                storedLogs.shift();
            }
            
            localStorage.setItem('lunetix_logs', JSON.stringify(storedLogs));
        } catch (e) {
            // localStorage might be full or unavailable
            this.originalConsole.warn('Failed to store log locally:', e);
        }
    }
    
    getLogs(level = null) {
        if (level !== null) {
            return this.logs.filter(log => this.levels[log.level] === level);
        }
        return this.logs;
    }
    
    getStoredLogs() {
        try {
            return JSON.parse(localStorage.getItem('lunetix_logs') || '[]');
        } catch (e) {
            return [];
        }
    }
    
    clearLogs() {
        this.logs = [];
        try {
            localStorage.removeItem('lunetix_logs');
        } catch (e) {
            this.originalConsole.warn('Failed to clear stored logs:', e);
        }
    }
    
    exportLogs() {
        const allLogs = {
            current: this.logs,
            stored: this.getStoredLogs(),
            exported_at: new Date().toISOString(),
            user_agent: navigator.userAgent,
            url: window.location.href
        };
        
        const blob = new Blob([JSON.stringify(allLogs, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lunetix-logs-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Performance logging
    performance = {
        mark: (name) => {
            if ('performance' in window && performance.mark) {
                performance.mark(name);
                this.debug(`Performance mark: ${name}`);
            }
        },
        
        measure: (name, startMark, endMark) => {
            if ('performance' in window && performance.measure) {
                try {
                    performance.measure(name, startMark, endMark);
                    const measure = performance.getEntriesByName(name)[0];
                    this.info(`Performance measure: ${name}`, {
                        duration: measure.duration,
                        start: measure.startTime
                    });
                    return measure.duration;
                } catch (e) {
                    this.warn(`Failed to measure performance: ${name}`, { error: e.message });
                }
            }
        },
        
        logPageLoad: () => {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        this.info('Page load performance', {
                            loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                            domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                            firstByte: Math.round(perfData.responseStart - perfData.requestStart),
                            domInteractive: Math.round(perfData.domInteractive - perfData.navigationStart)
                        });
                    }
                }, 0);
            });
        }
    };
}

// Initialize logger
window.LunetixLogger = new LunetixLogger();

// Start performance logging
window.LunetixLogger.performance.logPageLoad();

// Global error handlers
window.addEventListener('error', (event) => {
    window.LunetixLogger.error('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
    });
});

window.addEventListener('unhandledrejection', (event) => {
    window.LunetixLogger.error('Unhandled Promise Rejection', {
        reason: event.reason,
        promise: event.promise
    });
});

// Export for debugging
if (window.LunetixConfig?.debug) {
    window.exportLogs = () => window.LunetixLogger.exportLogs();
    window.clearLogs = () => window.LunetixLogger.clearLogs();
    window.getLogs = (level) => window.LunetixLogger.getLogs(level);
}