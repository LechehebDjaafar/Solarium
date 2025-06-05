// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Cairo', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-right: 0.5rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroAnimation = document.querySelector('.hero-animation');
    
    if (heroAnimation) {
        heroAnimation.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Dynamic particles generation
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? 'var(--primary-blue)' : 'var(--accent-blue)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            opacity: ${Math.random() * 0.7 + 0.3};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.tech-card, .team-card, .stat-item');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('loading');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to visible elements
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.hero-content, .hero-animation');
        visibleElements.forEach(el => el.classList.add('loading'));
    }, 500);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 100));
// Simple Gallery with Popup
class SimpleGallery {
    constructor() {
        this.items = [];
        this.currentIndex = 0;
        this.modal = document.getElementById('popup-modal');
        this.init();
    }
    
    init() {
        this.items = Array.from(document.querySelectorAll('.gallery-item'));
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Gallery item clicks
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openPopup(index);
            });
        });
        
        // Modal controls
        document.getElementById('popup-close').addEventListener('click', () => {
            this.closePopup();
        });
        
        document.getElementById('popup-prev').addEventListener('click', () => {
            this.previousItem();
        });
        
        document.getElementById('popup-next').addEventListener('click', () => {
            this.nextItem();
        });
        
        // Backdrop click to close
        document.querySelector('.popup-backdrop').addEventListener('click', () => {
            this.closePopup();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closePopup();
                        break;
                    case 'ArrowLeft':
                        this.previousItem();
                        break;
                    case 'ArrowRight':
                        this.nextItem();
                        break;
                }
            }
        });
    }
    
    openPopup(index) {
        this.currentIndex = index;
        this.updatePopupContent();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closePopup() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video if playing
        const video = document.querySelector('#popup-media video');
        if (video) {
            video.pause();
        }
    }
    
    updatePopupContent() {
        const item = this.items[this.currentIndex];
        const type = item.dataset.type;
        const src = item.dataset.src;
        const title = item.dataset.title;
        const description = item.dataset.desc;
        
        // Update content
        document.getElementById('popup-title').textContent = title;
        document.getElementById('popup-description').textContent = description;
        document.getElementById('current-num').textContent = this.currentIndex + 1;
        document.getElementById('total-num').textContent = this.items.length;
        
        // Update media
        const mediaContainer = document.getElementById('popup-media');
        mediaContainer.innerHTML = '';
        
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            mediaContainer.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            mediaContainer.appendChild(video);
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('popup-prev');
        const nextBtn = document.getElementById('popup-next');
        
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex === this.items.length - 1;
    }
    
    previousItem() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePopupContent();
        }
    }
    
    nextItem() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.updatePopupContent();
        }
    }
}

// Initialize Simple Gallery
document.addEventListener('DOMContentLoaded', () => {
    new SimpleGallery();
});
