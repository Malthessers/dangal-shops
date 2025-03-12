let menu = document.querySelector("#menu-icon"); // Use # for ID
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
    menu.classList.toggle("bx-x"); // Fix classList usage
    navlist.classList.toggle("open");
};

window.onscroll = () => {
    menu.classList.remove("bx-x"); // Fix classList usage
    navlist.classList.remove("open");
};

const sr = ScrollReveal ({
        distance: '30px',
        duration: 2600,
        reset: true
})

document.addEventListener('DOMContentLoaded', function() {
    // Header and subheader elements
    const header = document.querySelector("header");
    const subheader = document.querySelector(".subheader");
    const menuIcon = document.querySelector('#menu-icon');
    const navList = document.querySelector('.navlist');
    
    // Mobile menu toggle
    if (menuIcon && navList) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('bx-x');
            navList.classList.toggle('open');
        });
    }

    // Handle scroll effects for subheader
    if (header && subheader) {
        window.addEventListener("scroll", function() {
            let scrollPosition = window.scrollY;
            
            // Subheader Animation - shows on scroll
            if (scrollPosition > 100) {
                subheader.classList.add("show-subheader");
            } else {
                subheader.classList.remove("show-subheader");
            }
        });
    }
    
    // Handle mobile megamenu click/tap
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link && window.innerWidth <= 670) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close mobile dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 670) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
});