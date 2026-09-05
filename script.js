/* =========================================================
   MARCI METZGER — INTERACTIONS
   ========================================================= */


/* =========================================================
   01. ELEMENTS
   ========================================================= */

const header = document.getElementById("site-header");

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");

const mobileLinks = document.querySelectorAll(".mobile-menu a");

const searchForm = document.querySelector(".search-form");
const contactForm = document.querySelector(".contact-form");


/* =========================================================
   02. STICKY HEADER
   ========================================================= */

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   03. MOBILE MENU
   ========================================================= */

function openMenu() {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
}


function closeMenu() {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
}


menuToggle.addEventListener("click", openMenu);

mobileClose.addEventListener("click", closeMenu);


mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});


/* Close menu when pressing Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================================
   04. SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".about-grid, " +
    ".stats-grid, " +
    ".feature-content, " +
    ".search-heading, " +
    ".search-form, " +
    ".gallery-heading, " +
    ".gallery-item, " +
    ".services-heading, " +
    ".service-card, " +
    ".contact-content, " +
    ".contact-form"
);


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   05. PROPERTY SEARCH
   ========================================================= */

if (searchForm) {

    searchForm.addEventListener("submit", event => {

        event.preventDefault();

        const location =
            document.getElementById("location").value;

        const type =
            document.getElementById("type").value;

        const bedrooms =
            document.getElementById("bedrooms").value;

        const baths =
            document.getElementById("baths").value;

        const minPrice =
            document.getElementById("min-price").value;

        const maxPrice =
            document.getElementById("max-price").value;


        /*
         * The original Marci site uses a property-search
         * system. For this redesign, we don't want the form
         * to pretend that it actually performs a search if
         * we haven't connected it to a listing API yet.
         *
         * For now, we collect the selections and direct
         * visitors to the contact section.
         */

        const hasSearchCriteria =
            location ||
            type ||
            bedrooms ||
            baths ||
            minPrice ||
            maxPrice;


        if (hasSearchCriteria) {

            document.getElementById("contact").scrollIntoView({
                behavior: "smooth"
            });

        } else {

            document.getElementById("contact").scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =========================================================
   06. CONTACT FORM
   ========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        /*
         * This is currently a front-end demonstration.
         *
         * For the actual assignment, we can connect this
         * to a form service later if necessary.
         */

        const button =
            contactForm.querySelector("button");

        const originalText = button.textContent;

        button.textContent = "Message Sent";

        button.disabled = true;

        setTimeout(() => {

            contactForm.reset();

            button.textContent = originalText;

            button.disabled = false;

        }, 2500);

    });

}


/* =========================================================
   07. HERO SLIDESHOW
   ========================================================= */

const heroSlides = document.querySelectorAll(".hero-slide");

let currentHeroSlide = 0;

function showHeroSlide(index) {
    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    const activeSlide = heroSlides[index];

    /*
     * Restart CSS animation each time the slide becomes active
     */
    activeSlide.style.animation = "none";
    void activeSlide.offsetWidth;
    activeSlide.style.animation = "";

    activeSlide.classList.add("active");
}

if (heroSlides.length > 0) {
    showHeroSlide(currentHeroSlide);

    setInterval(() => {
        currentHeroSlide =
            (currentHeroSlide + 1) % heroSlides.length;

        showHeroSlide(currentHeroSlide);
    }, 8000);
}


/* =========================================================
   08. IMAGE HOVER EFFECT
   ========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


galleryItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.classList.add("hovered");

    });


    item.addEventListener("mouseleave", () => {

        item.classList.remove("hovered");

    });

});


/* =========================================================
   09. SMOOTH ANCHOR LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   10. INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateHeader();

});

