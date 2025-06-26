// Smooth scroll on navbar click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('#','');
        const section = document.getElementById(targetId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: 'smooth'
            });
        }
        // highlight active link
        document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Navbar highlight on scroll
window.addEventListener('scroll', () => {
    const sections = Array.from(document.querySelectorAll('main section'));
    const navLinks = document.querySelectorAll('.nav-link');
    let scrollPos = window.scrollY + 70;
    sections.forEach((section, idx) => {
        if (scrollPos > section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            navLinks[idx].classList.add('active');
        }
    });
});

// Contact form fake submission
function submitContactForm() {
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('contact-status');
    status.textContent = "Sending...";
    setTimeout(() => {
        status.textContent = "Thank you for contacting me! I'll get back to you soon.";
        form.reset();
    }, 1300);
    return false;
}

// Animate on scroll using Animate.css
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.animate__fadeInUp, .animate__fadeInLeft, .animate__fadeInRight, .animate__zoomIn, .animate__bounceIn, .animate__pulse');
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('animate__animated');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);
