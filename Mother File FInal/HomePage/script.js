const header = document.querySelector("header");
const subheader = document.querySelector(".subheader");
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const navLinks = document.querySelectorAll('.navlist a');
const slider = document.querySelector(".hero-slider");
const dots = document.querySelectorAll(".dot");
const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");
let currentIndex = 0;
let autoScroll;

// Header and Subheader Scroll Effects
if (header && subheader) {
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        const isScrolled = scrollPosition > 100;

        // Header Animation (Always Visible, but changes background when scrolling)
        if (scrollPosition > 50) {
            header.classList.add("sticky");
            header.style.background = "#ffffff";
            header.style.transform = "translateY(0)";
        } else {
            header.classList.remove("sticky");
            header.style.background = "transparent"; // Transparent when at the top
            header.style.boxShadow = "none";
            header.style.backdropFilter = "none";
        }

        // Subheader Animation (Appears smoothly when scrolled)
        if (isScrolled) {
            subheader.classList.add("show-subheader");
            subheader.style.transform = "translateY(0)";
            subheader.style.opacity = "1";
        } else {
            subheader.classList.remove("show-subheader");
            subheader.style.transform = "translateY(-20px)";
            subheader.style.opacity = "0";
        }
        
        // Fix active link styles during scroll
        if (scrollPosition > 50) {
            navLinks.forEach(link => {
                if (link.classList.contains('active')) {
                    link.style.color = 'var(--main-color)';
                }
            });
        }
    });
}

// Enhanced Mobile Menu Toggle
if (menu) {
    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        navlist?.classList.toggle("open");
    };
}

// Improved scroll and click handling
window.addEventListener('scroll', () => {
    menu?.classList.remove("bx-x");
    navlist?.classList.remove("open");
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navlist?.classList.contains("open") && 
        !navlist.contains(e.target) && 
        !menu.contains(e.target)) {
        menu?.classList.remove("bx-x");
        navlist?.classList.remove("open");
    }
});

// Ensure active link stays visible
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(item => item.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Scroll Reveal
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        distance: "30px",
        duration: 2600,
        reset: true,
    });
    sr.reveal(".some-class", { delay: 200, origin: "bottom" });
}

// Slider Functions
function jumpToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoScroll();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateSlider();
}

function updateSlider() {
    if (!slider) return;
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add("active");
    }
}

function startAutoScroll() {
    clearInterval(autoScroll); // Prevent multiple intervals
    autoScroll = setInterval(nextSlide, 3000);
}

function resetAutoScroll() {
    clearInterval(autoScroll);
    startAutoScroll();
}

// Initialize slider controls
if (heroNext) {
    heroNext.addEventListener("click", () => {
        nextSlide();
        resetAutoScroll();
    });
}

if (heroPrev) {
    heroPrev.addEventListener("click", () => {
        prevSlide();
        resetAutoScroll();
    });
}

// Initialize dots for slider
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => jumpToSlide(index));
});

// Set active page on load
document.addEventListener('DOMContentLoaded', function() {
    // Set active class based on current page
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage === '/' || currentPage.includes('index')) {
            // If home page, activate home link
            if (linkPath === '#home' || linkPath === 'index.html') {
                link.classList.add('active');
            }
        } else if (linkPath.includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // Start slider
    startAutoScroll();
    updateSlider();
});