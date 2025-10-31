// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        hamburger.style.opacity = navMenu.classList.contains('active') ? '0.7' : '1';
    });
}

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }
    }
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content items
document.querySelectorAll('.item-container, .research-box, .skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href').slice(1);
        if (href === current) {
            link.style.color = '#0066cc';
            link.style.fontWeight = '600';
        } else {
            link.style.fontWeight = '500';
        }
    });
});

// Load animations
window.addEventListener('load', () => {
    // Animate hero section
    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
        heroRight.style.opacity = '0';
        heroRight.style.transform = 'translateY(30px)';
        heroRight.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroRight.style.opacity = '1';
            heroRight.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Mobile menu close on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
});
