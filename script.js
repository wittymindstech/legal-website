// Basic interactivity for the legal website

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Improved sticky header effect on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for reveal animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before/after
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Mock dashboard link
    const dashboardLink = document.querySelector('a[href="#dashboard"]');
    if (dashboardLink) {
        dashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Dashboard feature coming soon! You will be able to track your cases here.');
        });
    }

    // Search interactivity
    const searchBtn = document.querySelector('.search-box .btn');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                alert(`Searching for: ${query} on Legal and Vakil\nConnecting you with verified experts...`);
            } else {
                alert('Please enter a service or lawyer name to search.');
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-question i');
            
            // Close others
            faqItems.forEach(other => {
                if (other !== item) {
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    const otherIcon = other.querySelector('.faq-question i');
                    if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
                }
            });

            // Toggle current
            if (answer) {
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    if (icon) icon.className = 'fas fa-chevron-down';
                } else {
                    answer.style.display = 'block';
                    if (icon) icon.className = 'fas fa-chevron-up';
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navBtns = document.querySelector('.nav-btns');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navBtns.classList.toggle('active');
            
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navBtns.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
});
