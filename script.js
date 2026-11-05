/**
 * Portfolio Script — Joshua Chacko George
 * Handles: navigation, mobile menu (with submenu bug fix),
 *          smooth scrolling, contact form, animations.
 */

(function () {
    'use strict';

    /* ============================================================
       NAVIGATION — hamburger stays open while Experience expands
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    const mobileNavQuery = window.matchMedia('(max-width: 768px)');

    function isMobileNav() {
        return mobileNavQuery.matches;
    }

    function closeMenu() {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
            const toggle = d.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    if (hamburger && navMenu) {
        function openMenu() {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
        }

        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (hamburger.classList.contains('active')) closeMenu();
            else openMenu();
        });

        /* One delegated listener. Resize cannot stack duplicate handlers. */
        navMenu.addEventListener('click', (e) => {
            const toggle = e.target.closest('.dropdown-toggle');
            if (toggle && isMobileNav()) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = toggle.closest('.dropdown');
                if (!dropdown) return;
                const willOpen = !dropdown.classList.contains('active');
                document.querySelectorAll('.dropdown').forEach(other => {
                    other.classList.remove('active');
                    const otherToggle = other.querySelector('.dropdown-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                });
                if (willOpen) {
                    dropdown.classList.add('active');
                    toggle.setAttribute('aria-expanded', 'true');
                }
                return;
            }

            const link = e.target.closest('a');
            if (!link || !isMobileNav()) return;
            if (link.classList.contains('dropdown-toggle')) return;
            closeMenu();
        });

        document.addEventListener('click', (e) => {
            if (isMobileNav()) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
                return;
            }
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /* ============================================================
       SMOOTH SCROLLING — same-page anchors only
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                closeMenu();

                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;

                if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
                }
            });
        });
    });

    /* Cross-page anchor links — close menu, let browser navigate */
    document.querySelectorAll('a[href*=".html#"]').forEach(anchor => {
        anchor.addEventListener('click', () => closeMenu());
    });

    /* Scroll to hash on page load */
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.hash) {
            const hash = window.location.hash;
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(() => {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    if (hash === '#home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const pos = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                        window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
                    }
                }, 300);
            }
        }
    });

    /* ============================================================
       NAVBAR SCROLL EFFECT
       ============================================================ */
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 20);
    }, { passive: true });

    /* ============================================================
       CONTACT FORM — opens mailto compose window
       Accurately communicates that this opens the user's email app.
       ============================================================ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name    = (this.querySelector('input[name="name"]')?.value || '').trim();
            const email   = (this.querySelector('input[name="email"]')?.value || '').trim();
            const subject = (this.querySelector('input[name="subject"]')?.value || '').trim();
            const message = (this.querySelector('textarea[name="message"]')?.value || '').trim();

            if (!name || !email || !subject || !message) {
                showModal('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showModal('Please enter a valid email address.');
                return;
            }

            // Build a mailto: link that opens the visitor's email client
            const to      = 'joshuapalathinkalxx3@gmail.com';
            const sub     = encodeURIComponent(`Portfolio Contact: ${subject}`);
            const body    = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            );
            const mailtoUrl = `mailto:${to}?subject=${sub}&body=${body}`;

            showModal(
                'Your email application will now open with this message pre-filled. ' +
                'Please review and click Send in your email app to deliver the message.'
            );

            // Small delay so the modal shows before the browser switches apps
            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 400);
        });
    }

    function showModal(text) {
        const modal    = document.getElementById('message-modal');
        const modalTxt = document.getElementById('message-modal-text');
        if (modal && modalTxt) {
            // Safe: use textContent, not innerHTML
            modalTxt.textContent = text;
            modal.classList.add('active');
        } else {
            alert(text);
        }
    }

    const messageModalClose = document.getElementById('message-modal-close');
    if (messageModalClose) {
        messageModalClose.addEventListener('click', () => {
            const modal = document.getElementById('message-modal');
            if (modal) modal.classList.remove('active');
        });
    }

    /* ============================================================
       INTERSECTION OBSERVER ANIMATIONS
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

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

        document.querySelectorAll('.timeline-item, .skill-category, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Skills animation
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
        });

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-item').forEach(item => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach(cat => skillsObserver.observe(cat));

        // Stats counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statH3 = entry.target.querySelector('h3');
                    if (statH3) {
                    const raw = (statH3.textContent || '').trim();
                    const match = raw.match(/^(\d+)(.*)$/);
                    if (match) animateCounter(statH3, parseInt(match[1], 10), match[2] || '');
                    }
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat').forEach(stat => statsObserver.observe(stat));
    });

    function animateCounter(el, target, suffix, duration = 1500) {
        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            el.textContent = Math.floor(progress * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
    }

    /* Timeline hover effects */
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    /* ============================================================
       TYPING ANIMATION for hero h1
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle && !prefersReduced) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 40);
        }
    });

    function typeWriter(element, text, speed) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    /* ============================================================
       PROFILE PHOTO INTERACTIONS
       ============================================================ */
    const profileAnimate = document.querySelector('.profile-animate');
    if (profileAnimate) {
        profileAnimate.style.cursor = 'pointer';
        profileAnimate.title = 'Click to toggle effect';
        let toggled = false;
        profileAnimate.addEventListener('click', () => {
            toggled = !toggled;
            profileAnimate.classList.toggle('toggle-active', toggled);
        });
    }

    /* ============================================================
       HERO BLUEPRINT CURSOR FOLLOW
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--cursor-x', `${x}%`);
            hero.style.setProperty('--cursor-y', `${y}%`);
        }, { passive: true });
    });

    /* ============================================================
       CERTIFICATION FILTER (experience.html)
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput  = document.getElementById('cert-search');
        const filterChips  = document.querySelectorAll('.cert-filter-chip');
        const cards        = document.querySelectorAll('.certification-card');
        const noResults    = document.getElementById('cert-no-results');

        if (!searchInput && !filterChips.length) return;

        let activeFilter = 'all';

        function applyFilters() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visible = 0;

            cards.forEach(card => {
                const issuer  = (card.dataset.issuer || '').toLowerCase();
                const title   = (card.querySelector('h3')?.textContent || '').toLowerCase();
                const issuerH = (card.querySelector('h4')?.textContent || '').toLowerCase();

                const matchesFilter = activeFilter === 'all' || issuer === activeFilter.toLowerCase();
                const matchesQuery  = !query || title.includes(query) || issuerH.includes(query);

                if (matchesFilter && matchesQuery) {
                    card.classList.remove('cert-hidden');
                    visible++;
                } else {
                    card.classList.add('cert-hidden');
                }
            });

            if (noResults) {
                noResults.hidden = visible > 0;
            }
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeFilter = chip.dataset.filter;
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
    });

})();