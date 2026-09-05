/* =========================================================
   MARCI METZGER HOMES
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const siteHeader = document.querySelector(".site-header");

function updateHeader() {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   HEADER DROPDOWN
   ========================================================= */

const menuDropdownToggle =
    document.querySelector(".menu-dropdown-toggle");

const headerDropdown =
    document.querySelector(".header-dropdown");


function closeDropdown() {
    if (!menuDropdownToggle || !headerDropdown) return;

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
    Array.from(document.querySelectorAll(".hero-slide"));

let currentHeroSlide = 0;


function showHeroSlide(index) {

    if (!heroSlides.length) return;


    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });


    const activeSlide =
        heroSlides[index];


    activeSlide.style.animation = "none";

    void activeSlide.offsetWidth;

    activeSlide.style.animation = "";

    activeSlide.classList.add("active");
}


if (heroSlides.length) {

    showHeroSlide(0);


    setInterval(() => {

        currentHeroSlide =
            (currentHeroSlide + 1) %
            heroSlides.length;

        showHeroSlide(currentHeroSlide);

    }, 8000);
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

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
                threshold: 0.1
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
   SMOOTH LINKS
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (!href || href === "#") return;


                const target =
                    document.querySelector(href);

                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );

    });


/* =========================================================
   PHOTO PAPER GALLERY
   ========================================================= */

const galleryPapers =
    Array.from(
        document.querySelectorAll(".photo-paper")
    );

const galleryCurrent =
    document.querySelector("#galleryCurrent");

const photoStage =
    document.querySelector("#photoStage");

const galleryPrev =
    document.querySelector("#galleryPrev");

const galleryNext =
    document.querySelector("#galleryNext");

const galleryMobilePrev =
    document.querySelector("#galleryMobilePrev");

const galleryMobileNext =
    document.querySelector("#galleryMobileNext");


let currentGalleryIndex = 0;


/* Update paper positions */

function updateGallery() {

    if (!galleryPapers.length) {
        return;
    }


    const total =
        galleryPapers.length;


    const previousIndex =
        (
            currentGalleryIndex -
            1 +
            total
        ) % total;


    const nextIndex =
        (
            currentGalleryIndex +
            1
        ) % total;


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
            String(
                currentGalleryIndex + 1
            ).padStart(2, "0");

    }
}


/* Previous */

function previousGalleryPhoto() {

    if (!galleryPapers.length) return;


    currentGalleryIndex =
        (
            currentGalleryIndex -
            1 +
            galleryPapers.length
        ) %
        galleryPapers.length;


    updateGallery();
}


/* Next */

function nextGalleryPhoto() {

    if (!galleryPapers.length) return;


    currentGalleryIndex =
        (
            currentGalleryIndex +
            1
        ) %
        galleryPapers.length;


    updateGallery();
}


/* Desktop previous */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        event => {

            event.preventDefault();
            previousGalleryPhoto();

        }
    );
}


/* Desktop next */

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        event => {

            event.preventDefault();
            nextGalleryPhoto();

        }
    );
}


/* Mobile previous */

if (galleryMobilePrev) {

    galleryMobilePrev.addEventListener(
        "click",
        event => {

            event.preventDefault();
            previousGalleryPhoto();

        }
    );
}


/* Mobile next */

if (galleryMobileNext) {

    galleryMobileNext.addEventListener(
        "click",
        event => {

            event.preventDefault();
            nextGalleryPhoto();

        }
    );
}


/* =========================================================
   GALLERY SWIPE
   ========================================================= */

let swipeStartX = null;


/*
 * Pointer Events:
 * Chrome / Android / modern Safari / Edge
 */

if (photoStage && window.PointerEvent) {

    photoStage.addEventListener(
        "pointerdown",
        event => {

            if (!event.isPrimary) return;

            swipeStartX =
                event.clientX;
        }
    );


    photoStage.addEventListener(
        "pointerup",
        event => {

            if (swipeStartX === null) return;


            const difference =
                event.clientX - swipeStartX;


            swipeStartX = null;


            if (Math.abs(difference) < 35) {
                return;
            }


            if (difference > 0) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }
        }
    );


    photoStage.addEventListener(
        "pointercancel",
        () => {
            swipeStartX = null;
        }
    );
}


/*
 * Touch fallback for browsers where
 * Pointer Events aren't available.
 */

if (photoStage && !window.PointerEvent) {

    let touchStartX = null;


    photoStage.addEventListener(
        "touchstart",
        event => {

            if (!event.changedTouches.length) return;


            touchStartX =
                event.changedTouches[0].clientX;

        },
        {
            passive: true
        }
    );


    photoStage.addEventListener(
        "touchend",
        event => {

            if (
                touchStartX === null ||
                !event.changedTouches.length
            ) {
                return;
            }


            const difference =
                event.changedTouches[0].clientX -
                touchStartX;


            touchStartX = null;


            if (Math.abs(difference) < 35) {
                return;
            }


            if (difference > 0) {

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


/* Keyboard support */

if (photoStage) {

    photoStage.setAttribute(
        "tabindex",
        "0"
    );


    photoStage.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowLeft") {

                event.preventDefault();
                previousGalleryPhoto();

            }


            if (event.key === "ArrowRight") {

                event.preventDefault();
                nextGalleryPhoto();

            }

        }
    );
}


/* Initialize gallery */

updateGallery();


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
   INITIAL STATE
   ========================================================= */

updateHeader();
