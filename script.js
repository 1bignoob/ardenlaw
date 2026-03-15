// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function syncNavbarHeightVar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
}

function syncBreadcrumbHeightVar() {
    const breadcrumb = document.querySelector('.breadcrumb-bar');
    const height = breadcrumb ? breadcrumb.offsetHeight : 0;
    document.documentElement.style.setProperty('--breadcrumb-height', `${height}px`);
}

window.addEventListener('resize', () => {
    syncNavbarHeightVar();
    syncBreadcrumbHeightVar();
});

document.addEventListener('DOMContentLoaded', () => {
    syncNavbarHeightVar();
    syncBreadcrumbHeightVar();
});

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

// Highlight current page in nav across all pages.
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const isHomePage = currentPath === 'index.html';

document.body.classList.toggle('home-page', isHomePage);
document.body.classList.toggle('subpage-page', !isHomePage);

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (href === currentPath) {
        link.classList.add('active-page');
        link.setAttribute('aria-current', 'page');
    }
});

// Insert breadcrumb under navbar on all pages.
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar || document.querySelector('.breadcrumb-bar')) return;

    const pageNames = {
        'index.html': 'Home',
        'about.html': 'About Our Firm',
        'practice-areas.html': 'Practice Areas',
        'car-accidents.html': 'Car Accidents',
        'truck-accidents.html': 'Truck Accidents',
        'slip-and-fall.html': 'Slip and Fall',
        'medical-malpractice.html': 'Medical Malpractice',
        'wrongful-death.html': 'Wrongful Death',
        'work-injuries.html': 'Work Injuries',
        'faq.html': 'FAQ',
        'contact.html': 'Contact'
    };

    if (isHomePage) return;
    const currentLabel = pageNames[currentPath] || currentPath.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const section = document.createElement('section');
    section.className = 'breadcrumb-bar';

    section.innerHTML =
        '<div class="container">' +
            '<nav class="breadcrumb" aria-label="Breadcrumb">' +
                '<ol class="breadcrumb-list">' +
                    '<li><a href="index.html">Home</a></li>' +
                    '<li><span class="current" aria-current="page">' + currentLabel + '</span></li>' +
                '</ol>' +
            '</nav>' +
        '</div>';

    navbar.insertAdjacentElement('afterend', section);
    document.body.classList.add('has-breadcrumb');
    syncBreadcrumbHeightVar();
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.currentTarget.classList.contains('dropdown-toggle')) {
            return;
        }
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Desktop dropdown: hover with small leave-delay so menu doesn't vanish on mouse gap
const dropdowns = document.querySelectorAll('.has-dropdown');
let dropdownTimeout = null;

dropdowns.forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            clearTimeout(dropdownTimeout);
            dropdowns.forEach(d => d.classList.remove('open'));
            this.classList.add('open');
        }
    });
    item.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768) {
            const self = this;
            dropdownTimeout = setTimeout(() => self.classList.remove('open'), 300);
        }
    });
});

// Mobile dropdown: tap toggle
document.querySelectorAll('.has-dropdown .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const parent = this.closest('.has-dropdown');
            if (!parent.classList.contains('open')) {
                e.preventDefault();
                parent.classList.add('open');
                dropdownOpen = true;
            }
        }
    });
});

// Close dropdown when clicking outside - nested behavior for mobile
let dropdownOpen = false;
document.addEventListener('click', function(e) {
    const clickedInsideNavbar = e.target.closest('.navbar');
    if (!e.target.closest('.has-dropdown') && !clickedInsideNavbar) {
        const openDropdowns = document.querySelectorAll('.has-dropdown.open');
        
        if (window.innerWidth <= 768) {
            // Mobile: nested close behavior
            if (openDropdowns.length > 0 && dropdownOpen) {
                // First click: close submenu only
                openDropdowns.forEach(el => el.classList.remove('open'));
                dropdownOpen = false;
            } else if (openDropdowns.length === 0 && navMenu.classList.contains('active')) {
                // Second click: close main menu
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        } else {
            // Desktop: close all dropdowns
            openDropdowns.forEach(el => el.classList.remove('open'));
        }
    }
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
        if (!link.getAttribute('href') || !link.getAttribute('href').startsWith('#')) {
            return;
        }
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

if (form) {
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
                result.innerHTML = `${json.message} Someone from the offices of Arden Law Firm will contact you shortly.`;
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
    }); // end form.addEventListener
} // end if(form)

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
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    
    animatedElements.forEach((el, index) => {
        const horizontalOffset = isMobileViewport ? 0 : (index % 2 === 0 ? -34 : 34);
        el.style.opacity = '0';
        el.style.transform = `translate3d(${horizontalOffset}px, 40px, 0) scale(0.96)`;
        el.style.filter = 'blur(10px)';
        const stagger = Math.min(index * 0.03, 0.24);
        el.style.transition = `opacity 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${stagger}s, transform 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${stagger}s, filter 0.52s ease-out ${stagger}s`;
        observer.observe(el);
    });
});

// Phone and email are now native anchor tags, no JS click handlers needed

/* SETTLEMENT CAROUSEL COMMENTED OUT — uncomment to restore (mirrors assets/data/settlements.json)
document.addEventListener('DOMContentLoaded', () => {
    const settlements = [
        { name: "Maria Rodriguez", amount: "$2.8M" },
        { name: "James Patterson", amount: "$1.5M" },
        { name: "Sarah Chen", amount: "$3.2M" },
        { name: "Michael Torres", amount: "$2.1M" },
        { name: "Jennifer Walsh", amount: "$4.7M" },
        { name: "David Rothstein", amount: "$1.9M" },
        { name: "Amanda Cohen", amount: "$3.5M" },
        { name: "Robert Mitchell", amount: "$2.6M" },
        { name: "Lisa Nakamura", amount: "$5.1M" },
        { name: "Christopher White", amount: "$2.3M" },
        { name: "Daniel Fitzgerald", amount: "$3.9M" },
        { name: "Rachel Hernandez", amount: "$4.2M" },
        { name: "Kevin O'Brien", amount: "$2.5M" },
        { name: "Sophia Martinez", amount: "$5.8M" },
        { name: "Brandon Lee", amount: "$3.1M" },
        { name: "Nicole Patel", amount: "$4.6M" },
        { name: "Alexander Kim", amount: "$2.9M" },
        { name: "Jasmine Williams", amount: "$6.2M" },
        { name: "Tyler Jackson", amount: "$3.7M" },
        { name: "Emma Davis", amount: "$4.9M" }
    ];

    const container = document.getElementById('settlementsContainer');
    if (!container) return;

    const shuffled = settlements.slice().sort(() => Math.random() - 0.5);

    shuffled.forEach((settlement) => {
        const card = document.createElement('div');
        card.className = 'settlement-card';
        card.innerHTML =
            '<div class="settlement-case">' +
                '<div class="settlement-name">' + settlement.name + '</div>' +
                '<div class="settlement-amount">Settlement: ' + settlement.amount + '</div>' +
            '</div>';
        container.appendChild(card);
    });

    let current = 0;
    const total = shuffled.length;

    function getVisible() {
        if (window.innerWidth <= 560) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        if (window.innerWidth <= 1280) return 4;
        return 5;
    }

    function getStepPx() {
        const card = container.querySelector('.settlement-card');
        if (!card) return 0;
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        return card.offsetWidth + gap;
    }

    function advance() {
        const visible = getVisible();
        const maxIndex = total - visible;

        if (current >= maxIndex) {
            // Silently reset to start
            container.style.transition = 'none';
            current = 0;
            container.style.transform = 'translateX(0)';
            requestAnimationFrame(() => requestAnimationFrame(() => {
                container.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }));
        } else {
            current++;
            container.style.transform = 'translateX(-' + (current * getStepPx()) + 'px)';
        }
    }

    // Reset position on resize so cards don't get stuck mid-scroll
    window.addEventListener('resize', () => {
        current = 0;
        container.style.transition = 'none';
        container.style.transform = 'translateX(0)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
            container.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }));
    });

    setInterval(advance, 4000);
}); */
