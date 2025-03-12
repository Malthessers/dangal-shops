document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            // If not already active, open the clicked one
            if (!isActive) {
                item.classList.add("active");
                const answer = item.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px"; 
            }
        });
    });
});

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
