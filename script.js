// ===== DOM Elements =====
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');
const navLinks = document.querySelectorAll('.nav-link');
const navHamburger = document.querySelector('.nav-hamburger');
const navbar = document.getElementById('navbar');
const mobileNav = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-bar');
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// ===== Music Control =====
let isMusicPlaying = true;

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicText.textContent = 'Music: OFF';
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicText.textContent = 'Music: ON';
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        isMusicPlaying = true;
    }
}

// Ensure music autoplays (with user interaction)
document.addEventListener('click', function() {
    if (bgMusic.paused && isMusicPlaying) {
        bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
    }
}, { once: true });

// ===== Navigation =====
function toggleMenu() {
    mobileNav.classList.toggle('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileNav.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Skill Bar Animation =====
function animateSkillBars() {
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        const fill = bar.querySelector('.skill-fill');
        fill.style.width = `${percent}%`;
    });
}

// Trigger on scroll
window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.clientHeight;
    
    if (window.scrollY > sectionTop - 400) {
        animateSkillBars();
    }
});

// ===== Typed.js Effect =====
const textArray = ["Maths Lover", "Future Space Explorer", "AI Enthusiast", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) {
            cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 500);
    }
}

// Start typing on load
document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) {
        setTimeout(type, newTextDelay);
    }
});

// ===== Contact Form =====
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
    }
    
    // Simulate form submission
    const btnSubmit = contactForm.querySelector('button');
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btnSubmit.disabled = true;
    
    setTimeout(() => {
        btnSubmit.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btnSubmit.style.background = 'var(--success)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Send Again';
            btnSubmit.style.background = 'var(--accent)';
            btnSubmit.disabled = false;
        }, 2000);
    }, 1500);
});

// ===== Particles.js Background =====
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#7c3aed"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7c3aed",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
});

// ===== Scroll Reveal Animation =====
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    reset: true
});

scrollReveal.reveal('.hero-content', { delay: 300 });
scrollReveal.reveal('.about-content', { interval: 200 });
scrollReveal.reveal('.skill-category', { interval: 200 });
scrollReveal.reveal('.achievement-card', { interval: 200 });
scrollReveal.reveal('.contact-container', { interval: 200 });

// ===== Theme Toggle (Future Enhancement) =====
// Can be expanded to include light/dark mode toggle
const themeToggle = document.createElement('div');
themeToggle.id = 'themeToggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '6rem';
themeToggle.style.right = '2rem';
themeToggle.style.background = 'var(--secondary)';
themeToggle.style.color = 'var(--text)';
themeToggle.style.width = '50px';
themeToggle.style.height = '50px';
themeToggle.style.borderRadius = '50%';
themeToggle.style.display = 'flex';
themeToggle.style.justifyContent = 'center';
themeToggle.style.alignItems = 'center';
themeToggle.style.cursor = 'pointer';
themeToggle.style.zIndex = '1000';
themeToggle.style.transition = 'all 0.3s ease';
themeToggle.style.border = '2px solid var(--accent)';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

document.body.appendChild(themeToggle);

// ===== Dynamic Year in Footer =====
document.querySelector('.footer-copyright p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Aayan Kumar Chauhan. All rights reserved.`;

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.background = 'var(--primary)';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.zIndex = '9999';
    preloader.style.transition = 'opacity 0.5s ease';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.border = '5px solid var(--secondary)';
    loader.style.borderTop = '5px solid var(--accent)';
    loader.style.borderRadius = '50%';
    loader.style.width = '50px';
    loader.style.height = '50px';
    loader.style.animation = 'spin 1s linear infinite';
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});

// Add spin animation for preloader
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);