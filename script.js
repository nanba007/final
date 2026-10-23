// =========================
// HAMBURGER MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";
    });
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    if (
        !navbar.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navbar.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";
    }
});


// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle = document.getElementById("themeToggle");

// Load previously selected theme
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

// Update theme button
function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute("aria-pressed", isDark);
}

updateThemeButton();

// Change theme when clicked
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem(
        "portfolioTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


// =========================
// ACTIVE NAVIGATION LINK
// =========================

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


// =========================
// AUTOMATIC FOOTER YEAR
// =========================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();