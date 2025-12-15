/**
 * Professional Custom Cursor Implementation
 * DISABLED - Using default browser cursor
 */
(function() {
    'use strict';
    
    // Custom cursor disabled - return early
    return;
    
    class CustomCursor {
        constructor() {
            this.cursor = null;
            this.isVisible = false;
            this.init();
        }
        
        init() {
            this.createCursor();
            this.bindEvents();
            this.enableCustomCursor();
        }
        
        createCursor() {
            this.cursor = document.createElement('div');
            this.cursor.className = 'lunetix-cursor';
            
            // Apply styles programmatically for better performance
            Object.assign(this.cursor.style, {
                position: 'fixed',
                width: '0',
                height: '0',
                borderLeft: '12px solid #FBBF24',
                borderRight: '6px solid transparent',
                borderBottom: '12px solid transparent',
                borderTop: '6px solid transparent',
                transform: 'rotate(-45deg)',
                pointerEvents: 'none',
                zIndex: '9999',
                filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: '0',
                visibility: 'hidden'
            });
            
            document.body.appendChild(this.cursor);
        }
        
        enableCustomCursor() {
            document.body.classList.add('custom-cursor-enabled');
        }
        
        bindEvents() {
            // Optimized mouse move with RAF
            let rafId = null;
            
            document.addEventListener('mousemove', (e) => {
                if (rafId) cancelAnimationFrame(rafId);
                
                rafId = requestAnimationFrame(() => {
                    this.updatePosition(e.clientX, e.clientY);
                    this.showCursor();
                });
            }, { passive: true });
            
            // Mouse enter/leave document
            document.addEventListener('mouseenter', () => this.showCursor());
            document.addEventListener('mouseleave', () => this.hideCursor());
            
            // Interactive elements hover
            this.bindHoverEffects();
            
            // Click effects
            this.bindClickEffects();
        }
        
        updatePosition(x, y) {
            if (this.cursor) {
                this.cursor.style.left = `${x}px`;
                this.cursor.style.top = `${y}px`;
            }
        }
        
        showCursor() {
            if (!this.isVisible && this.cursor) {
                this.cursor.style.opacity = '1';
                this.cursor.style.visibility = 'visible';
                this.isVisible = true;
            }
        }
        
        hideCursor() {
            if (this.isVisible && this.cursor) {
                this.cursor.style.opacity = '0';
                this.cursor.style.visibility = 'hidden';
                this.isVisible = false;
            }
        }
        
        bindHoverEffects() {
            const interactiveSelectors = [
                'a', 'button', '.btn', '.nav-link', 
                '.product-card', '.app-card', '.app-node',
                '.social-link', '.quick-action', '.lang-btn'
            ];
            
            const elements = document.querySelectorAll(interactiveSelectors.join(', '));
            
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    this.cursor.style.borderLeftColor = '#F59E0B';
                    this.cursor.style.transform = 'rotate(-45deg) scale(1.2)';
                }, { passive: true });
                
                element.addEventListener('mouseleave', () => {
                    this.cursor.style.borderLeftColor = '#FBBF24';
                    this.cursor.style.transform = 'rotate(-45deg) scale(1)';
                }, { passive: true });
            });
        }
        
        bindClickEffects() {
            document.addEventListener('mousedown', () => {
                this.cursor.style.borderLeftColor = '#92400E';
                this.cursor.style.transform = 'rotate(-45deg) scale(0.9)';
            }, { passive: true });
            
            document.addEventListener('mouseup', () => {
                this.cursor.style.borderLeftColor = '#FBBF24';
                this.cursor.style.transform = 'rotate(-45deg) scale(1)';
            }, { passive: true });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new CustomCursor());
    } else {
        new CustomCursor();
    }
    
})();