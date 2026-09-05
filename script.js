/* =========================================================
   MARCI METZGER HOMES
   ========================================================= */


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

const siteHeader =
    document.querySelector(".site-header");


function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   HEADER DROPDOWN MENU
   ========================================================= */

const menuDropdownToggle =
    document.querySelector(".menu-dropdown-toggle");

const headerDropdown =
    document.querySelector(".header-dropdown");


function closeDropdown() {

    if (!menuDropdownToggle || !headerDropdown) {
        return;
    }

    headerDropdown.classList.remove("active");
    menuDropdownToggle.classList.remove("active");

    menuDropdownToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuDropdownToggle && headerDropdown) {

    menuDropdownToggle.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                headerDropdown.classList.toggle("active");

            menuDropdownToggle.classList.toggle(
                "active",
                isOpen
            );

            menuDropdownToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    headerDropdown
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeDropdown
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !headerDropdown.contains(event.target) &&
                !menuDropdownToggle.contains(event.target)
            ) {
                closeDropdown();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeDropdown();
            }

        }
    );

}


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const heroSlides =
    document.querySelectorAll(".hero-slide");

let currentHeroSlide = 0;


function showHeroSlide(index) {

    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });


    const activeSlide =
        heroSlides[index];


    if (!activeSlide) return;


    /*
     * Reset the animation so that it starts
     * from the beginning every time.
     */
    activeSlide.style.animation = "none";

    void activeSlide.offsetWidth;

    activeSlide.style.animation = "";

    activeSlide.classList.add("active");

}


if (heroSlides.length > 0) {

    showHeroSlide(currentHeroSlide);


    window.setInterval(() => {

        currentHeroSlide =
            (currentHeroSlide + 1) %
            heroSlides.length;

        showHeroSlide(
            currentHeroSlide
        );

    }, 8000);

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   LISTING SEARCH DEMO
   ========================================================= */

const searchForm =
    document.querySelector("#searchForm");

const searchMessage =
    document.querySelector("#searchMessage");


if (searchForm) {

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (searchMessage) {

                searchMessage.textContent =
                    "Listing search would connect to the live MLS / IDX service in production.";

            }

        }
    );

}


/* =========================================================
   CONTACT FORM DEMO
   ========================================================= */

const contactForm =
    document.querySelector("#contactForm");

const formMessage =
    document.querySelector("#formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (formMessage) {

                formMessage.textContent =
                    "Thank you. This assessment form is currently a front-end demonstration.";

            }

        }
    );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();

    }
);
