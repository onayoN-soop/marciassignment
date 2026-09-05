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
   PHOTO PAPER GALLERY
   ========================================================= */

const galleryPapers =
    Array.from(document.querySelectorAll(".photo-paper"));

const galleryPrev =
    document.querySelector("#galleryPrev");

const galleryNext =
    document.querySelector("#galleryNext");

const galleryMobilePrev =
    document.querySelector("#galleryMobilePrev");

const galleryMobileNext =
    document.querySelector("#galleryMobileNext");

const galleryCurrent =
    document.querySelector("#galleryCurrent");

const photoStage =
    document.querySelector("#photoStage");


let currentGalleryIndex = 0;


/*
 * Converts a number into:
 * 1 -> 01
 * 2 -> 02
 */

function formatGalleryNumber(number) {

    return String(number).padStart(2, "0");

}


/*
 * Determine which paper should be:
 *
 * previous
 * active
 * next
 *
 * The remaining paper stays hidden.
 */

function updateGallery() {

    if (!galleryPapers.length) {
        return;
    }


    const total =
        galleryPapers.length;

    const previousIndex =
        (currentGalleryIndex - 1 + total) % total;

    const nextIndex =
        (currentGalleryIndex + 1) % total;


    galleryPapers.forEach(
        (paper, index) => {

            paper.classList.remove(
                "is-active",
                "is-prev",
                "is-next"
            );


            if (index === currentGalleryIndex) {

                paper.classList.add(
                    "is-active"
                );

            } else if (index === previousIndex) {

                paper.classList.add(
                    "is-prev"
                );

            } else if (index === nextIndex) {

                paper.classList.add(
                    "is-next"
                );

            }

        }
    );


    if (galleryCurrent) {

        galleryCurrent.textContent =
            formatGalleryNumber(
                currentGalleryIndex + 1
            );

    }

}


/*
 * Navigation
 */

function previousGalleryPhoto() {

    currentGalleryIndex =
        (
            currentGalleryIndex -
            1 +
            galleryPapers.length
        ) %
        galleryPapers.length;

    updateGallery();

}


function nextGalleryPhoto() {

    currentGalleryIndex =
        (
            currentGalleryIndex +
            1
        ) %
        galleryPapers.length;

    updateGallery();

}


/*
 * Desktop arrows
 */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        previousGalleryPhoto
    );

}


if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        nextGalleryPhoto
    );

}


/*
 * Mobile arrows
 */

if (galleryMobilePrev) {

    galleryMobilePrev.addEventListener(
        "click",
        previousGalleryPhoto
    );

}


if (galleryMobileNext) {

    galleryMobileNext.addEventListener(
        "click",
        nextGalleryPhoto
    );

}


/* =========================================================
   MOBILE SWIPE
   ========================================================= */

let galleryTouchStartX = 0;
let galleryTouchEndX = 0;


if (photoStage) {

    photoStage.addEventListener(
        "touchstart",
        event => {

            galleryTouchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    photoStage.addEventListener(
        "touchend",
        event => {

            galleryTouchEndX =
                event.changedTouches[0].screenX;


            const distance =
                galleryTouchEndX -
                galleryTouchStartX;


            /*
             * Ignore tiny accidental swipes.
             */

            if (Math.abs(distance) < 45) {
                return;
            }


            if (distance > 0) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

if (photoStage) {

    photoStage.setAttribute(
        "tabindex",
        "0"
    );


    photoStage.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowLeft") {

                previousGalleryPhoto();

            }


            if (event.key === "ArrowRight") {

                nextGalleryPhoto();

            }

        }
    );

}


/*
 * Initial state
 */

updateGallery();

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();

    }
);
