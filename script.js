document.addEventListener('DOMContentLoaded', () => {
    // Init EmailJS
    emailjs.init("82zL3PhXAorGW6ngj");

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            "IT Specialist",
            "Cyber Security",
            "Frontend Developer",
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            const currentChar = currentText.substring(0, charIndex);

            typingText.textContent = currentChar;

            if (!isDeleting && charIndex < currentText.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                setTimeout(type, 1000);
            }
        }
        setTimeout(type, 1000);
    }

    // Scroll animations
    function handleScroll() {
        const scrollPosition = window.scrollY;

        // Active nav link
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // EmailJS form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("service_t76aj0o", "template_a5hti7b", this)
                .then(() => {
                    document.getElementById("form-status").textContent = "Message sent successfully!";
                    this.reset();
                }, (error) => {
                    document.getElementById("form-status").textContent = "Failed to send message.";
                    console.error("EmailJS Error:", error);
                });
        });
    }
});
