const menuIcon = document.getElementById("menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    navList.classList.toggle("active");  
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
