// Telegraph Motel Website JavaScript - Email Submission + Confirmation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Telegraph Motel website loaded successfully');

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

// ----- Mobile Menu -----
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        menu.classList.toggle('active');
        const spans = btn.querySelectorAll('span');
        spans.forEach((span, i) => {
            if (menu.classList.contains('active')) {
                if (i === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (i === 1) span.style.opacity = '0';
                if (i === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// ----- Smooth Scrolling -----
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = target.offsetTop - headerHeight;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
}

// ----- Chat Widget -----
function initChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatPopup = document.getElementById('chat-popup');
    const chatClose = document.getElementById('chat-close');
    if (!chatButton || !chatPopup || !chatClose) return;

    chatButton.addEventListener('click', () => chatPopup.classList.toggle('active'));
    chatClose.addEventListener('click', () => chatPopup.classList.remove('active'));

    document.querySelectorAll('.chat-option').forEach(option => {
        option.addEventListener('click', function() {
            const message = this.textContent;
            showTemporaryMessage(`✅ Thank you for your interest in "${message}". Please call us at 313-666-6888 for immediate assistance!`, chatPopup);
        });
    });
}

// ----- Scroll Animations -----
function initScrollAnimations() {
    const animateEls = document.querySelectorAll('.animate-on-scroll');
    if (!animateEls.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ----- Forms (Email + Confirmation) -----
function initFormHandling() {
    const bookingForm = document.querySelector('.booking-form');
    const contactForm = document.querySelector('.contact-form');

    // --- Booking Form ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const adults = document.getElementById('adults').value;
            const kids = document.getElementById('kids').value;

            const subject = `Booking Request from Telegraph Motel Website`;
            const body = `Check-in: ${checkin}%0D%0ACheck-out: ${checkout}%0D%0AAdults: ${adults}%0D%0AKids: ${kids}`;
            window.location.href = `mailto:info@telegraphmotel.com?subject=${subject}&body=${body}`;

            showFormConfirmation(bookingForm, '🏨 Thank you! Your booking request has been received. Please call 313-666-6888 to confirm your reservation.');
            bookingForm.reset();
        });
    }

    // --- Contact Form ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputs = contactForm.querySelectorAll('input, textarea');
            const name = inputs[0].value + " " + inputs[1].value;
            const email = inputs[2].value;
            const phone = inputs[3].value;
            const message = inputs[4].value;

            const subject = `New Message from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
            window.location.href = `mailto:info@telegraphmotel.com?subject=${subject}&body=${body}`;

            showFormConfirmation(contactForm, '✅ Thank you! Your message has been sent. We’ll contact you within 24 hours.');
            contactForm.reset();
        });
    }

    // --- Scroll buttons ---
    document.querySelectorAll('.book-btn, .btn-primary, .mobile-book-btn, .room-btn')
        .forEach(btn => btn.addEventListener('click', () => {
            document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth' });
        }));
}

// ----- Helpers -----
function showFormConfirmation(form, message) {
    let existing = form.querySelector('.form-confirmation');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.classList.add('form-confirmation');
    msg.textContent = message;
    form.appendChild(msg);

    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.5s ease';
    setTimeout(() => (msg.style.opacity = '1'), 50);
    setTimeout(() => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500);
    }, 4000);
}

function showTemporaryMessage(text, container) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.padding = '10px';
    msg.style.background = '#ecf8ff';
    msg.style.borderRadius = '8px';
    msg.style.marginTop = '10px';
    msg.style.fontSize = '0.9rem';
    msg.style.color = '#2c3e50';
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// ----- Active Nav Highlight -----
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(s => {
        if (window.pageYOffset >= s.offsetTop - 200) current = s.id;
    });
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
});

// ----- Booking Date Limits -----
document.addEventListener('DOMContentLoaded', function() {
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    if (checkin && checkout) {
        const today = new Date().toISOString().split('T')[0];
        checkin.min = today;
        checkout.min = today;
        checkin.addEventListener('change', function() {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkout.min = nextDay.toISOString().split('T')[0];
        });
    }
});