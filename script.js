// Sticky Navigation
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Number Counter Animation
const counters = document.querySelectorAll('.count');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            if (counter.getAttribute('data-target') === null) {
                counter.setAttribute('data-target', target);
                counter.innerText = '0';
            }
            
            const count = +counter.innerText;
            const targetVal = +counter.getAttribute('data-target');
            const inc = targetVal / speed;

            if (count < targetVal) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = targetVal;
            }
        };
        
        // Use IntersectionObserver to start counting only when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
};

animateCounters();

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll Animations on Scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: unobserve if you want it to animate only once
            // scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Auto-add scroll-fade class to major elements so we don't have to rewrite HTML
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-content p, .story-card, .team-card, .mvv-card, .why-card, .what-card, .event-card, .gallery-item, .testimony-card, .blog-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-fade');
        scrollObserver.observe(el);
    });
});

// Lightbox Functionality
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightboxBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    if (lightbox && lightboxImg && closeLightboxBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                lightbox.style.display = 'block';
                lightboxImg.src = e.target.src;
            });
        });

        closeLightboxBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }
});
// Auto-swipe for Testimony Grid (Infinite Interval)
document.addEventListener('DOMContentLoaded', () => {
    const testimonyGrid = document.querySelector('.testimony-grid');
    if (testimonyGrid) {
        setInterval(() => {
            const firstCard = testimonyGrid.querySelector('.testimony-card');
            const cardWidth = firstCard.offsetWidth;
            const gap = 40; // match CSS gap
            
            // Smoothly scroll to the right
            testimonyGrid.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });

            // After smooth scroll finishes, move the first element to the end instantly
            setTimeout(() => {
                testimonyGrid.appendChild(firstCard);
                // Adjust scroll position instantly to prevent jumping
                testimonyGrid.scrollBy({ left: -(cardWidth + gap), behavior: 'instant' });
            }, 600); // Wait 600ms for smooth scroll to finish
        }, 7000);
    }
});
