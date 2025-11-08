// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Dropdown functionality
function handleDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobile = window.innerWidth <= 768;

    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        // Remove previous listeners
        dropdownToggle.onclick = null;
        dropdownMenu && dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => item.onclick = null);

        if (isMobile) {
            dropdownToggle.onclick = function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            };
            // Close dropdown when a dropdown-item is tapped
            dropdownMenu && dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.onclick = function() {
                    dropdown.classList.remove('active');
                    // Also close mobile menu
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                };
            });
        } else {
            dropdownToggle.onclick = function(e) {
                // Desktop: check if it's an external link
                const href = dropdownToggle.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    // External link - allow navigation
                    return true;
                }
                // Internal anchor - prevent default and toggle
                e.preventDefault();
                dropdown.classList.toggle('active');
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            };
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', handleDropdowns);
window.addEventListener('resize', handleDropdowns);

// Smooth scrolling for navigation links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle if it's a same-page anchor
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Get navbar height
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                
                // Special handling for home section
                if (href === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Calculate target position with navbar offset
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Handle cross-page anchor links (e.g., experience.html#skills or index.html#projects)
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.includes('.html#')) {
        // This is a cross-page anchor link
        anchor.addEventListener('click', function(e) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            // Close dropdown if open
            const dropdown = anchor.closest('.dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            // Let the browser navigate normally - the target page will handle scrolling
        });
    }
});

// Scroll to anchor on page load if hash is present in URL
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const hash = window.location.hash;
        const target = document.querySelector(hash);
        if (target) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                
                // Special handling for home section
                if (hash === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }, 300); // Increased delay to ensure everything is loaded
        }
    }
});

// Note: Experience link now navigates to experience.html, so no special handling needed

// Navbar subtle effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero text
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add loading animation for profile photo
const profilePhoto = document.querySelector('.profile-photo img');
if (profilePhoto) {
    profilePhoto.addEventListener('load', () => {
        profilePhoto.style.opacity = '1';
        profilePhoto.style.transform = 'scale(1)';
    });
    
    profilePhoto.style.opacity = '0';
    profilePhoto.style.transform = 'scale(0.8)';
    profilePhoto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

// Profile picture toggle functionality
const profileAnimate = document.querySelector('.profile-animate');
if (profileAnimate) {
    let isToggled = false;
    
    profileAnimate.addEventListener('click', () => {
        isToggled = !isToggled;
        
        if (isToggled) {
            profileAnimate.classList.add('toggle-active');
        } else {
            profileAnimate.classList.remove('toggle-active');
        }
    });
    
    // Add hover hint
    profileAnimate.style.cursor = 'pointer';
    profileAnimate.title = 'Click to toggle gold effect';
}

// Pointer-reactive 3D tilt effect for profile photo
const pointerPhoto = document.querySelector('.pointer-reactive');
if (pointerPhoto) {
    pointerPhoto.addEventListener('mousemove', (e) => {
        const rect = pointerPhoto.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        pointerPhoto.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
        pointerPhoto.style.boxShadow = '0 30px 60px rgba(26,34,56,0.18), 0 30px 60px rgba(255,180,0,0.18)';
    });
    pointerPhoto.addEventListener('mouseleave', () => {
        pointerPhoto.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        pointerPhoto.style.boxShadow = '';
    });
}

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
});

// Observe skills for animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillsObserver.observe(category);
});

// Add hover effects for timeline items
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Add transition styles
document.querySelectorAll('.timeline-content').forEach(item => {
    item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
}); 