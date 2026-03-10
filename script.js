// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 10;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if the scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.style.borderBottomColor = 'transparent';
        link.style.color = '';
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = 'var(--gold)';
            link.style.borderBottomColor = 'var(--gold)';
        }
    });
});

/* New form */
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let submissionSucceeded = false;

    const formData = new FormData(form);

    // Get the name input value
    const name = formData.get("name");

    // Create a custom subject
    const subject = `${name} sent a message through ArdenLawNY.com`;

    // Append the custom subject to the form data
    formData.append("subject", subject);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submissionSucceeded = true;
                result.style.display = "block";
                result.innerHTML = `${json.message} Someone from the offices of Arden Law will contact you shortly.`;
            } else {
                console.log(response);
                submissionSucceeded = false;
                result.style.display = "block";
                result.innerHTML = json.message;
            }
        })
        .catch((error) => {
            console.log(error);
            submissionSucceeded = false;
            result.style.display = "block";
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            if (submissionSucceeded) {
                form.reset();
                return;
            }

            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

/* End new form */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px 100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate3d(0, 0, 0) scale(1)';
            entry.target.style.filter = 'blur(0px)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations to cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.priorities .section-title, .priorities-grid .priority-block, .priorities-description, .value-card, .practice-card, .process-step, .benefit-card'
    );
    
    animatedElements.forEach((el, index) => {
        const horizontalOffset = index % 2 === 0 ? -34 : 34;
        el.style.opacity = '0';
        el.style.transform = `translate3d(${horizontalOffset}px, 40px, 0) scale(0.96)`;
        el.style.filter = 'blur(10px)';
        const stagger = Math.min(index * 0.03, 0.24);
        el.style.transition = `opacity 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${stagger}s, transform 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${stagger}s, filter 0.52s ease-out ${stagger}s`;
        observer.observe(el);
    });
});

// Phone and email are now native anchor tags, no JS click handlers needed

// Practice Card Flip Functionality for Mobile/Touch Devices
document.addEventListener('DOMContentLoaded', () => {
    const practiceCards = document.querySelectorAll('.practice-card');

    const isTouchDevice = ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice) return;

    practiceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Allow scrolling on back side text
            if (e.target.closest('.practice-description-detailed') && this.classList.contains('flipped')) {
                return;
            }
            
            // Close all other cards
            practiceCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
            
            // Toggle this card
            this.classList.toggle('flipped');
        });
    });

    // Close all cards when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.practice-card')) {
            practiceCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});

// Show overflow indicator only on practice cards with clipped detailed text.
document.addEventListener('DOMContentLoaded', () => {
    const updatePracticeOverflowState = () => {
        const practiceCardBacks = document.querySelectorAll('.practice-card-back');

        practiceCardBacks.forEach((cardBack) => {
            const detailedText = cardBack.querySelector('.practice-description-detailed');
            if (!detailedText) return;

            const hasOverflow = detailedText.scrollHeight > detailedText.clientHeight + 1;
            cardBack.classList.toggle('has-overflow', hasOverflow);
        });
    };

    updatePracticeOverflowState();
    window.addEventListener('resize', updatePracticeOverflowState);
});
