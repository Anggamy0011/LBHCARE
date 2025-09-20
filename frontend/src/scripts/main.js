// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('LBH CARE website loaded successfully!');
    
    // Initialize components
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeButtons();
    initializeAnimations();
    initializeServices();
    initializeServiceAnimations();
    initializeLawyers();
    initializeParalegal();
    initializeParalegalAnimations();
    initializeConsultation();
    initializeKnowledgeCenter();
    initializeKnowledgeCenterAnimations();
    initializeAbout();
    initializeAboutAnimations();
    initializeFooter();
    initializeFooterAnimations();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight current section on scroll
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                navLinks.forEach(nav => nav.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, 10));
    
    console.log('Navigation initialized');
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', debounce(function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 20) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }, 10));
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    console.log('Mobile menu initialized');
}

// ===== BUTTON INTERACTIONS =====
function initializeButtons() {
    // Chat Lawyer Now button - removed event listener (now uses href)
    // Secondary button (Konsultasi Terpercaya) - removed event listener (now uses href)
    // Header chat button - removed event listener (now uses href)
    
    console.log('Button interactions initialized - using href navigation');
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-left, .hero-right, .stat-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// ===== SMOOTH SCROLL POLYFILL =====
function smoothScrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();
    
    const easeInOutQuart = (t, b, c, d) => {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
        t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
    };
    
    const animateScroll = () => {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuart(currentTime, start, change, duration));
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            element.scrollTop = to;
        }
    };
    animateScroll();
}

// ===== SERVICES FUNCTIONALITY =====
function initializeServices() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('.service-title').textContent;
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            // Show consultation modal or redirect
            showConsultationModal(serviceTitle);
        });
    });
    
    console.log('Services initialized');
}

function showConsultationModal(serviceType) {
    // For now, show an alert. Later can be replaced with a modal
    alert(`Anda akan berkonsultasi untuk ${serviceType}.\n\nFitur ini akan segera tersedia!`);
    
    // Optional: Log to console for analytics
    console.log(`Consultation requested for: ${serviceType}`);
}

// ===== SERVICE CARD ANIMATIONS =====
function initializeServiceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===== LAWYERS FUNCTIONALITY =====
function initializeLawyers() {
    const searchInput = document.getElementById('lawyerSearch');
    const specialistFilter = document.getElementById('specialistFilter');
    const locationFilter = document.getElementById('locationFilter');
    const applyFilterBtn = document.getElementById('applyFilter');
    const loadMoreBtn = document.getElementById('loadMoreLawyers');
    const chatButtons = document.querySelectorAll('.chat-btn');
    const callButtons = document.querySelectorAll('.call-btn');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterLawyers, 300));
    }
    
    // Filter functionality
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', filterLawyers);
    }
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreLawyers);
    }
    
    // Chat button functionality
    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lawyerCard = this.closest('.lawyer-card');
            const lawyerName = lawyerCard.querySelector('.lawyer-name').textContent.trim();
            startChatWithLawyer(lawyerName);
        });
    });
    
    // Call button functionality
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lawyerCard = this.closest('.lawyer-card');
            const lawyerName = lawyerCard.querySelector('.lawyer-name').textContent.trim();
            callLawyer(lawyerName);
        });
    });
    
    console.log('Lawyers functionality initialized');
}

function filterLawyers() {
    const searchTerm = document.getElementById('lawyerSearch').value.toLowerCase();
    const selectedSpecialist = document.getElementById('specialistFilter').value;
    const selectedLocation = document.getElementById('locationFilter').value;
    const lawyerCards = document.querySelectorAll('.lawyer-card');
    
    lawyerCards.forEach(card => {
        const lawyerName = card.querySelector('.lawyer-name').textContent.toLowerCase();
        const lawyerSpecialty = card.querySelector('.lawyer-specialty').textContent.toLowerCase();
        const specialistData = card.getAttribute('data-specialist').toLowerCase();
        const locationData = card.getAttribute('data-location').toLowerCase();
        
        const matchesSearch = lawyerName.includes(searchTerm) || lawyerSpecialty.includes(searchTerm);
        const matchesSpecialist = !selectedSpecialist || specialistData.includes(selectedSpecialist);
        const matchesLocation = !selectedLocation || locationData.includes(selectedLocation);
        
        if (matchesSearch && matchesSpecialist && matchesLocation) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide "no results" message and center few results
    const visibleCards = document.querySelectorAll('.lawyer-card[style*="display: block"], .lawyer-card:not([style*="display: none"])');
    const lawyersGrid = document.getElementById('lawyersGrid');
    
    if (visibleCards.length === 0) {
        showNoResultsMessage();
        lawyersGrid.classList.remove('few-results');
    } else {
        hideNoResultsMessage();
        // Add few-results class if there are 1-2 visible cards
        if (visibleCards.length <= 2) {
            lawyersGrid.classList.add('few-results');
        } else {
            lawyersGrid.classList.remove('few-results');
        }
    }
}

function loadMoreLawyers() {
    // Simulate loading more lawyers
    const loadMoreBtn = document.getElementById('loadMoreLawyers');
    const originalText = loadMoreBtn.innerHTML;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // In a real application, this would load more data from the server
        alert('Fitur memuat lebih banyak pengacara akan segera tersedia!');
        
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
    }, 1500);
}

function startChatWithLawyer(lawyerName) {
    // Add button animation
    const button = event.target.closest('.chat-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Get lawyer card to access data attributes
    const lawyerCard = button.closest('.lawyer-card');
    const whatsappNumber = lawyerCard.getAttribute('data-whatsapp');
    
    // Redirect to WhatsApp
    if (whatsappNumber) {
        // Format number for WhatsApp URL (remove any non-digit characters except +)
        const formattedNumber = whatsappNumber.replace(/[^0-9+]/g, '');
        const whatsappUrl = `https://wa.me/${formattedNumber}`;
        window.open(whatsappUrl, '_blank');
    } else {
        // Fallback if no WhatsApp number is specified
        alert(`Memulai chat dengan ${lawyerName}.\n\nFitur chat akan segera tersedia!`);
    }
    
    console.log(`Chat started with: ${lawyerName}`);
}

function callLawyer(lawyerName) {
    // Add button animation
    const button = event.target.closest('.call-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate calling lawyer
    alert(`Menghubungi ${lawyerName}.\n\nFitur panggilan akan segera tersedia!`);
    console.log(`Call initiated with: ${lawyerName}`);
}

function showNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) return;
    
    const lawyersGrid = document.getElementById('lawyersGrid');
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-results-message';
    noResultsDiv.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #718096;">
            <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: #4a5568;">Tidak ada pengacara ditemukan</h3>
            <p>Coba ubah filter pencarian atau kata kunci Anda</p>
        </div>
    `;
    lawyersGrid.appendChild(noResultsDiv);
}

function hideNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// ===== PARALEGAL FUNCTIONALITY =====
function initializeParalegal() {
    const searchInput = document.getElementById('paralegalSearch');
    const specialistFilter = document.getElementById('paralegalSpecialistFilter');
    const locationFilter = document.getElementById('paralegalLocationFilter');
    const applyFilterBtn = document.getElementById('applyParalegalFilter');
    const loadMoreBtn = document.getElementById('loadMoreParalegal');
    const chatButtons = document.querySelectorAll('.paralegal .chat-btn');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterParalegal, 300));
    }
    
    // Filter functionality
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', filterParalegal);
    }
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreParalegal);
    }
    
    // Chat button functionality
    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const paralegalCard = this.closest('.paralegal-card');
            const paralegalName = paralegalCard.querySelector('.paralegal-name').textContent.trim();
            startChatWithParalegal(paralegalName);
        });
    });
    
    console.log('Paralegal functionality initialized');
}

function filterParalegal() {
    const searchTerm = document.getElementById('paralegalSearch').value.toLowerCase();
    const selectedSpecialist = document.getElementById('paralegalSpecialistFilter').value;
    const selectedLocation = document.getElementById('paralegalLocationFilter').value;
    const paralegalCards = document.querySelectorAll('.paralegal-card');
    
    paralegalCards.forEach(card => {
        const paralegalName = card.querySelector('.paralegal-name').textContent.toLowerCase();
        const paralegalSpecialty = card.querySelector('.paralegal-specialty').textContent.toLowerCase();
        const specialistData = card.getAttribute('data-specialist').toLowerCase();
        const locationData = card.getAttribute('data-location').toLowerCase();
        
        const matchesSearch = paralegalName.includes(searchTerm) || paralegalSpecialty.includes(searchTerm);
        const matchesSpecialist = !selectedSpecialist || specialistData.includes(selectedSpecialist);
        const matchesLocation = !selectedLocation || locationData.includes(selectedLocation);
        
        if (matchesSearch && matchesSpecialist && matchesLocation) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide "no results" message
    const visibleCards = document.querySelectorAll('.paralegal-card[style*="display: block"], .paralegal-card:not([style*="display: none"])');
    if (visibleCards.length === 0) {
        showNoParalegalResultsMessage();
    } else {
        hideNoParalegalResultsMessage();
    }
}

function loadMoreParalegal() {
    // Simulate loading more paralegal
    const loadMoreBtn = document.getElementById('loadMoreParalegal');
    const originalText = loadMoreBtn.innerHTML;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // In a real application, this would load more data from the server
        alert('Fitur memuat lebih banyak paralegal akan segera tersedia!');
        
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
    }, 1500);
}

function startChatWithParalegal(paralegalName) {
    // Add button animation
    const button = event.target.closest('.chat-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Get paralegal card to access data attributes
    const paralegalCard = button.closest('.paralegal-card');
    const whatsappNumber = paralegalCard.getAttribute('data-whatsapp');
    
    // Redirect to WhatsApp
    if (whatsappNumber) {
        // Format number for WhatsApp URL (remove any non-digit characters except +)
        const formattedNumber = whatsappNumber.replace(/[^0-9+]/g, '');
        const whatsappUrl = `https://wa.me/${formattedNumber}`;
        window.open(whatsappUrl, '_blank');
    } else {
        // Fallback if no WhatsApp number is specified
        alert(`Memulai chat dengan ${paralegalName}.\n\nFitur chat akan segera tersedia!`);
    }
    
    console.log(`Chat started with paralegal: ${paralegalName}`);
}

function showNoParalegalResultsMessage() {
    const existingMessage = document.querySelector('.no-paralegal-results-message');
    if (existingMessage) return;
    
    const paralegalGrid = document.getElementById('paralegalGrid');
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-paralegal-results-message';
    noResultsDiv.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #718096;">
            <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: #4a5568;">Tidak ada paralegal ditemukan</h3>
            <p>Coba ubah filter pencarian atau kata kunci Anda</p>
        </div>
    `;
    paralegalGrid.appendChild(noResultsDiv);
}

function hideNoParalegalResultsMessage() {
    const existingMessage = document.querySelector('.no-paralegal-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// ===== PARALEGAL ANIMATIONS =====
function initializeParalegalAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe paralegal header
    const paralegalHeader = document.querySelector('.paralegal-header');
    if (paralegalHeader) {
        paralegalHeader.style.opacity = '0';
        paralegalHeader.style.transform = 'translateY(30px)';
        paralegalHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(paralegalHeader);
    }
    
    // Observe paralegal filter
    const paralegalFilter = document.querySelector('.paralegal-filter');
    if (paralegalFilter) {
        paralegalFilter.style.opacity = '0';
        paralegalFilter.style.transform = 'translateY(20px)';
        paralegalFilter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        paralegalFilter.style.transitionDelay = '0.2s';
        observer.observe(paralegalFilter);
    }
    
    // Observe paralegal cards
    const paralegalCards = document.querySelectorAll('.paralegal-card');
    paralegalCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${0.4 + (index * 0.1)}s`;
        observer.observe(card);
    });
    
    // Observe paralegal footer
    const paralegalFooter = document.querySelector('.paralegal-footer');
    if (paralegalFooter) {
        paralegalFooter.style.opacity = '0';
        paralegalFooter.style.transform = 'translateY(20px)';
        paralegalFooter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        paralegalFooter.style.transitionDelay = '0.6s';
        observer.observe(paralegalFooter);
    }
}

// ===== CONSULTATION FUNCTIONALITY =====
function initializeConsultation() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.querySelector('.chat-messages');
    const callBtn = document.querySelector('.consultation .call-btn');
    const videoBtn = document.querySelector('.consultation .video-btn');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const emojiBtn = document.querySelector('.emoji-btn');
    const chatOptions = document.querySelector('.chat-options');
    
    // Send message functionality
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Call functionality
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            alert('Fitur panggilan suara akan segera tersedia!');
        });
    }
    
    // Video call functionality
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            alert('Fitur video call akan segera tersedia!');
        });
    }
    
    // Attachment functionality
    if (attachmentBtn) {
        attachmentBtn.addEventListener('click', function() {
            alert('Fitur lampiran file akan segera tersedia!');
        });
    }
    
    // Emoji functionality
    if (emojiBtn) {
        emojiBtn.addEventListener('click', function() {
            const input = document.getElementById('chatInput');
            if (input) {
                input.value += ' 😊 ';
                input.focus();
            }
        });
    }
    
    // Chat options functionality
    if (chatOptions) {
        chatOptions.addEventListener('click', function() {
            alert('Menu opsi chat akan segera tersedia!');
        });
    }
    
    console.log('Consultation functionality initialized');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const messageText = chatInput.value.trim();
    if (messageText === '') return;
    
    // Create user message
    const userMessage = createMessage(messageText, 'user');
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate lawyer response after delay
    setTimeout(() => {
        const responses = [
            'Terima kasih atas informasinya. Saya akan bantu analisis situasi Anda.',
            'Berdasarkan keterangan Anda, ada beberapa langkah yang bisa kita ambil.',
            'Untuk kasus ini, kita perlu melihat detail kontrak kerja Anda.',
            'Saya memahami situasi Anda. Mari kita bahas langkah-langkah selanjutnya.',
            'Ini adalah kasus yang cukup umum. Ada beberapa hak yang bisa Anda tuntut.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const lawyerMessage = createMessage(randomResponse, 'lawyer');
        chatMessages.appendChild(lawyerMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
}

function createMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${currentTime}</div>
            </div>
            <div class="message-avatar">
                <div class="avatar-placeholder">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-placeholder lawyer-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
            </div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    }
    
    // Add fade-in animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    return messageDiv;
}

// ===== KNOWLEDGE CENTER FUNCTIONALITY =====
function initializeKnowledgeCenter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const faqItems = document.querySelectorAll('.faq-item');
    const topicCards = document.querySelectorAll('.topic-card');
    const articleCards = document.querySelectorAll('.article-card');
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Topic card click functionality
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topicTitle = this.querySelector('.topic-title').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show topic details (can be replaced with navigation to topic page)
            showTopicDetails(topicTitle);
        });
    });
    
    // Article card click functionality
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleTitle = this.querySelector('.article-title').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show article details (can be replaced with navigation to article page)
            showArticleDetails(articleTitle);
        });
    });
    
    console.log('Knowledge Center functionality initialized');
}

function showTopicDetails(topicTitle) {
    // For now, show an alert. Later can be replaced with modal or navigation
    alert(`Membuka topik: ${topicTitle}\n\nFitur detail topik akan segera tersedia!`);
    console.log(`Topic clicked: ${topicTitle}`);
}

function showArticleDetails(articleTitle) {
    // For now, show an alert. Later can be replaced with modal or navigation
    alert(`Membuka artikel: ${articleTitle}\n\nFitur baca artikel akan segera tersedia!`);
    console.log(`Article clicked: ${articleTitle}`);
}

// ===== KNOWLEDGE CENTER ANIMATIONS =====
function initializeKnowledgeCenterAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe topic cards
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// ===== FOOTER FUNCTIONALITY =====
function initializeFooter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const footerLinks = document.querySelectorAll('.footer-links a');
    const socialLinks = document.querySelectorAll('.social-link');
    const legalLinks = document.querySelectorAll('.legal-links a');
    
    // Newsletter subscription functionality
    if (subscribeBtn && newsletterEmail) {
        subscribeBtn.addEventListener('click', handleNewsletterSubscription);
        
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleNewsletterSubscription();
            }
        });
    }
    
    // Footer links functionality
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Social links functionality
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            alert(`Mengarahkan ke ${platform}.\n\nFitur social media akan segera tersedia!`);
            console.log(`Social link clicked: ${platform}`);
        });
    });
    
    // Legal links functionality
    legalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            
            alert(`Membuka halaman: ${linkText}\n\nHalaman legal akan segera tersedia!`);
            console.log(`Legal link clicked: ${linkText}`);
        });
    });
    
    console.log('Footer functionality initialized');
}

function handleNewsletterSubscription() {
    const emailInput = document.getElementById('newsletterEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    
    if (!emailInput || !subscribeBtn) return;
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        alert('Mohon masukkan email Anda');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Mohon masukkan email yang valid');
        emailInput.focus();
        return;
    }
    
    // Add loading state
    const originalText = subscribeBtn.innerHTML;
    subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    subscribeBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success state
        subscribeBtn.innerHTML = '<i class="fas fa-check"></i>';
        emailInput.value = '';
        
        alert(`Terima kasih! Email ${email} telah berhasil berlangganan newsletter LBH CARE.`);
        
        // Reset button after success
        setTimeout(() => {
            subscribeBtn.innerHTML = originalText;
            subscribeBtn.disabled = false;
        }, 2000);
        
        console.log(`Newsletter subscription: ${email}`);
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FOOTER ANIMATIONS =====
function initializeFooterAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe footer columns
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach(column => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(column);
    });
    
    // Observe footer bottom
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        footerBottom.style.opacity = '0';
        footerBottom.style.transform = 'translateY(20px)';
        footerBottom.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        footerBottom.style.transitionDelay = '0.4s';
        observer.observe(footerBottom);
    }
}

// ===== ABOUT FUNCTIONALITY =====
function initializeAbout() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add hover effect to icon
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon transform
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ===== ABOUT ANIMATIONS =====
function initializeAboutAnimations() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe about header
    const aboutHeader = document.querySelector('.about-header');
    if (aboutHeader) {
        aboutHeader.style.opacity = '0';
        aboutHeader.style.transform = 'translateY(30px)';
        aboutHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutHeader);
    }
    
    // Observe about cards with stagger effect
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        card.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        observer.observe(card);
    });
    
    // Parallax effect for background
    const aboutBg = document.querySelector('.about-section');
    if (aboutBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const section = aboutBg.getBoundingClientRect();
            const rate = scrolled * -0.5;
            
            if (section.top < window.innerHeight && section.bottom > 0) {
                aboutBg.style.backgroundPosition = `center ${rate}px`;
            }
        });
    }
}
