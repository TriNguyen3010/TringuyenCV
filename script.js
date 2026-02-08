document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once

                // Clean up animation classes after they finish to restore smooth hover effects
                setTimeout(() => {
                    entry.target.classList.remove(
                        'visible',
                        'fade-in',
                        'fade-in-up',
                        'timeline-slide-in-right',
                        'timeline-slide-in-left',
                        'delay-100',
                        'delay-200',
                        'delay-300'
                    );
                }, 2000); // Wait for transition (1s) + delay (max 0.3s) + buffer
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .timeline-slide-in-right, .timeline-slide-in-left');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Mobile Menu Toggle (Simple Implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    // Reusable Typing Effect Function
    function typeWriter(elementId, words, waitTime = 3000) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting speed
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = waitTime; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 4. Word Switch Animation (Experience <-> Work)
    typeWriter('typing-text', ["Experience", "Work"], 2000);

    // 5. Backstory Typing Animation
    typeWriter('backstory-typing-text', ["Backstory", "Journey"], 2000);

    // 6. Hero Subtitle Typing Animation (Game <-> AI)
    typeWriter('hero-swap-text', ["Game", "AI"], 2000);

    // 7. Video Start at 4s & Intro Fade
    const video = document.querySelector('.video-bg');
    if (video) {
        // Create Intro Overlay
        const overlay = document.createElement('div');
        overlay.className = 'intro-overlay';
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: '9999',
            transition: 'opacity 3s ease-in-out', // Slow fade
            pointerEvents: 'none'
        });
        document.body.appendChild(overlay);

        // Set Video Start Time
        video.currentTime = 4;

        // Ensure time is set once metadata loads
        const setTime = () => {
            video.currentTime = 4;
            video.removeEventListener('loadedmetadata', setTime);
        };
        if (video.readyState >= 1) {
            setTime();
        } else {
            video.addEventListener('loadedmetadata', setTime);
        }

        // Fade out overlay
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 3000);
        }, 500);
    }


    // 6. Active Navigation Link Highlighting via IntersectionObserver (More reliable)
    const sections = document.querySelectorAll('section');
    // Ensure we select BOTH nav links AND the logo link
    const navItems = document.querySelectorAll('.nav-links a, .logo a');

    const sectionObserverOptions = {
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle 20% of screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                if (currentId) {
                    navItems.forEach(a => {
                        // Check if href matches
                        const href = a.getAttribute('href');
                        if (href === `#${currentId}`) {
                            a.classList.add('active');
                        } else {
                            a.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
