// Simple Custom Cursor - No Delay
document.addEventListener('DOMContentLoaded', function() {
    // Only enable on desktop
    if (window.innerWidth <= 768) return;
    
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '0';
    cursor.style.height = '0';
    cursor.style.borderLeft = '12px solid #FBBF24';
    cursor.style.borderRight = '6px solid transparent';
    cursor.style.borderBottom = '12px solid transparent';
    cursor.style.borderTop = '6px solid transparent';
    cursor.style.transform = 'rotate(-45deg)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.filter = 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))';
    document.body.appendChild(cursor);
    
    // Mouse move - instant response
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .faq-question, .nav-link, .product-card, .app-card, .app-node');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.borderLeftColor = '#F59E0B';
            cursor.style.transform = 'rotate(-45deg) scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.borderLeftColor = '#FBBF24';
            cursor.style.transform = 'rotate(-45deg) scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', function() {
        cursor.style.borderLeftColor = '#92400E';
        cursor.style.transform = 'rotate(-45deg) scale(0.9)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.borderLeftColor = '#FBBF24';
        cursor.style.transform = 'rotate(-45deg) scale(1)';
    });
});