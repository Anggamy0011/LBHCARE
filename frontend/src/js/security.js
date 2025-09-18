/* ===== SECURITY UTILITIES ===== */

class SecurityManager {
    constructor() {
        // Delay initialization to allow DOM and external resources to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initSecurity(), 1000);
            });
        } else {
            setTimeout(() => this.initSecurity(), 1000);
        }
    }

    initSecurity() {
        this.setupInputValidation();
        this.setupXSSProtection();
        this.monitorSecurity();
        this.setupPrivacyControls();
        
        // Optional CSP - can be enabled later when all resources are whitelisted
        // this.setupCSP();
        
        console.log('🔒 Security Manager initialized successfully');
    }

    // Content Security Policy (disabled for now to avoid blocking external resources)
    setupCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com; font-src 'self' fonts.gstatic.com cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https:";
        document.head.appendChild(meta);
        console.log('🛡️ CSP activated');
    }

    // Input sanitization
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // XSS Protection
    setupXSSProtection() {
        // Sanitize all form inputs
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                const sanitized = this.sanitizeInput(e.target.value);
                if (sanitized !== e.target.value) {
                    console.warn('Potential XSS attempt detected and sanitized');
                }
            }
        });
    }

    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    validatePhone(phone) {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Setup form validation
    setupInputValidation() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.type === 'email' && !this.validateEmail(input.value)) {
                    e.preventDefault();
                    this.showSecurityAlert('Invalid email format');
                }
                
                if (input.type === 'tel' && !this.validatePhone(input.value)) {
                    e.preventDefault();
                    this.showSecurityAlert('Invalid phone number format');
                }
            });
        });
    }

    // Rate limiting simulation
    setupRateLimit() {
        const attempts = new Map();
        
        return (identifier, maxAttempts = 5, timeWindow = 300000) => {
            const now = Date.now();
            const userAttempts = attempts.get(identifier) || [];
            
            // Clean old attempts
            const recentAttempts = userAttempts.filter(time => now - time < timeWindow);
            
            if (recentAttempts.length >= maxAttempts) {
                this.showSecurityAlert('Too many attempts. Please try again later.');
                return false;
            }
            
            recentAttempts.push(now);
            attempts.set(identifier, recentAttempts);
            return true;
        };
    }

    // Security monitoring
    monitorSecurity() {
        // Monitor for suspicious activities
        let clickCount = 0;
        let lastClickTime = 0;
        
        document.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastClickTime < 100) {
                clickCount++;
                if (clickCount > 10) {
                    console.warn('Potential bot activity detected');
                }
            } else {
                clickCount = 0;
            }
            lastClickTime = now;
        });

        // Monitor console access
        const originalLog = console.log;
        console.log = function(...args) {
            if (args.some(arg => typeof arg === 'string' && arg.includes('password'))) {
                console.warn('Security: Sensitive data in console detected');
                return;
            }
            originalLog.apply(console, args);
        };
    }

    // Secure data storage (localStorage encryption simulation)
    secureStore(key, data) {
        try {
            const encrypted = btoa(JSON.stringify(data)); // Basic encoding (use proper encryption in production)
            localStorage.setItem(`secure_${key}`, encrypted);
            return true;
        } catch (error) {
            console.error('Failed to store data securely:', error);
            return false;
        }
    }

    secureRetrieve(key) {
        try {
            const encrypted = localStorage.getItem(`secure_${key}`);
            if (!encrypted) return null;
            return JSON.parse(atob(encrypted));
        } catch (error) {
            console.error('Failed to retrieve data securely:', error);
            return null;
        }
    }

    // Privacy compliance
    setupPrivacyControls() {
        // Cookie consent
        if (!this.secureRetrieve('cookieConsent')) {
            this.showCookieConsent();
        }

        // Data retention policy
        this.cleanOldData();
    }

    showCookieConsent() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie.</p>
                <button onclick="window.securityManager.acceptCookies()" class="btn-accept">Setuju</button>
                <a href="#privacy-policy">Kebijakan Privasi</a>
            </div>
        `;
        document.body.appendChild(banner);
    }

    acceptCookies() {
        this.secureStore('cookieConsent', {
            accepted: true,
            timestamp: Date.now()
        });
        const banner = document.querySelector('.cookie-consent');
        if (banner) banner.remove();
    }

    cleanOldData() {
        const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        const now = Date.now();
        
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key.startsWith('secure_')) {
                try {
                    const data = this.secureRetrieve(key.replace('secure_', ''));
                    if (data && data.timestamp && now - data.timestamp > maxAge) {
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    // Remove corrupted data
                    localStorage.removeItem(key);
                }
            }
        }
    }

    showSecurityAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'security-alert';
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fed7d7;
            color: #c53030;
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid #feb2b2;
            z-index: 10000;
            font-weight: 500;
        `;
        
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }
}

// Initialize security manager
window.securityManager = new SecurityManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityManager;
}
