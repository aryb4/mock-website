// Telegraph Motel Website JavaScript - Simplified Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Telegraph Motel website loaded successfully');
    
    // Initialize functionality safely
    try {
        initMobileMenu();
        initSmoothScrolling();
        initChatWidget();
        initScrollAnimations();
        initFormHandling();
    } catch (error) {
        console.log('Non-critical error:', error);
    }
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Chat Widget Functionality
function initChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatPopup = document.getElementById('chat-popup');
    const chatClose = document.getElementById('chat-close');
    
    if (!chatButton || !chatPopup || !chatClose) return;
    
    chatButton.addEventListener('click', function() {
        chatPopup.classList.toggle('active');
    });
    
    chatClose.addEventListener('click', function() {
        chatPopup.classList.remove('active');
    });
    
    // Chat options
    const chatOptions = document.querySelectorAll('.chat-option');
    chatOptions.forEach(option => {
        option.addEventListener('click', function() {
            const message = this.textContent;
            alert('Thank you for your interest in ' + message + '. Please call us at 313-666-6888 for immediate assistance!');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animateElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Form Handling
function initFormHandling() {
    // Booking Form
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your booking request! Please call 313-666-6888 to confirm your reservation.');
        });
    }
    
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you within 24 hours.');
        });
    }
    
    // Room booking buttons
    const roomButtons = document.querySelectorAll('.room-btn');
    roomButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Please call 313-666-6888 to book this room or use our online booking form above.');
        });
    });
    
    // Header book buttons
    const bookButtons = document.querySelectorAll('.book-btn, .btn-primary, .mobile-book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingSection = document.querySelector('.booking-card');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Active Navigation Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Set minimum date for booking form
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        checkoutInput.setAttribute('min', today);
        
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const nextDay = new Date(checkinDate);
            nextDay.setDate(checkinDate.getDate() + 1);
            checkoutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
        });
    }
});