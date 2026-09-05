/* =========================================================
   MARCI METZGER HOMES
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const siteHeader =
    document.querySelector(".site-header");


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
    {
        passive: true
    }
);



/* =========================================================
   HEADER DROPDOWN
   ========================================================= */

const menuDropdownToggle =
    document.querySelector(
        ".menu-dropdown-toggle"
    );

const headerDropdown =
    document.querySelector(
        ".header-dropdown"
    );


function closeDropdown() {

    if (
        !menuDropdownToggle ||
        !headerDropdown
    ) {
        return;
    }

    headerDropdown.classList.remove(
        "active"
    );

    menuDropdownToggle.classList.remove(
        "active"
    );

    menuDropdownToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


if (
    menuDropdownToggle &&
    headerDropdown
) {

    menuDropdownToggle.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                headerDropdown.classList.toggle(
                    "active"
                );

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
                !headerDropdown.contains(
                    event.target
                ) &&
                !menuDropdownToggle.contains(
                    event.target
                )
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
    Array.from(
        document.querySelectorAll(
            ".hero-slide"
        )
    );

let currentHeroSlide = 0;


function showHeroSlide(index) {

    if (!heroSlides.length) {
        return;
    }


    heroSlides.forEach(slide => {

        slide.classList.remove(
            "active"
        );

    });


    const activeSlide =
        heroSlides[index];


    /*
       Restart the camera animation
       every time the slide is activated.
    */

    activeSlide.style.animation =
        "none";

    void activeSlide.offsetWidth;

    activeSlide.style.animation =
        "";

    activeSlide.classList.add(
        "active"
    );
}


if (heroSlides.length) {

    showHeroSlide(0);


    window.setInterval(
        () => {

            currentHeroSlide =
                (
                    currentHeroSlide + 1
                ) %
                heroSlides.length;

            showHeroSlide(
                currentHeroSlide
            );

        },
        8000
    );

}



/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList.add(
                                    "visible"
                                );

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}



/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


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
   PHOTO PAPER GALLERY
   ========================================================= */

/*
   Add gallery images as:

   gallery-1.jpg
   gallery-2.jpg
   gallery-3.jpg
   gallery-4.jpg

   If you add more photos, only change
   this number.
*/

const galleryPhotoCount = 4;


const photoStage =
    document.querySelector(
        "#photoStage"
    );

const galleryCurrent =
    document.querySelector(
        "#galleryCurrent"
    );

const galleryTotal =
    document.querySelector(
        "#galleryTotal"
    );

const galleryPrev =
    document.querySelector(
        "#galleryPrev"
    );

const galleryNext =
    document.querySelector(
        "#galleryNext"
    );

const galleryMobilePrev =
    document.querySelector(
        "#galleryMobilePrev"
    );

const galleryMobileNext =
    document.querySelector(
        "#galleryMobileNext"
    );


/* Build papers automatically */

if (photoStage) {

    for (
        let index = 1;
        index <= galleryPhotoCount;
        index += 1
    ) {

        const paper =
            document.createElement(
                "figure"
            );

        paper.className =
            "photo-paper";


        paper.setAttribute(
            "role",
            "button"
        );

        paper.setAttribute(
            "aria-label",
            `Open gallery photo ${index}`
        );

        paper.setAttribute(
            "tabindex",
            "-1"
        );


        const frame =
            document.createElement(
                "div"
            );

        frame.className =
            "photo-frame";


        const image =
            document.createElement(
                "img"
            );

        image.src =
            `images/gallery-${index}.jpg`;

        image.alt =
            `Pahrump property gallery photo ${index}`;

        image.draggable =
            false;


        if (index === 1) {

            image.loading =
                "eager";

        } else {

            image.loading =
                "lazy";

        }


        frame.appendChild(
            image
        );

        paper.appendChild(
            frame
        );

        photoStage.appendChild(
            paper
        );

    }

}


const galleryPapers =
    photoStage
        ? Array.from(
            photoStage.querySelectorAll(
                ".photo-paper"
            )
        )
        : [];


let currentGalleryIndex = 0;


/* Update total */

if (galleryTotal) {

    galleryTotal.textContent =
        String(
            galleryPapers.length
        ).padStart(
            2,
            "0"
        );

}



/* =========================================================
   GALLERY POSITIONING
   ========================================================= */

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
        ) %
        total;


    const nextIndex =
        (
            currentGalleryIndex +
            1
        ) %
        total;


    galleryPapers.forEach(
        (paper, index) => {

            paper.classList.remove(
                "is-active",
                "is-prev",
                "is-next"
            );


            paper.setAttribute(
                "tabindex",
                "-1"
            );


            if (
                index ===
                currentGalleryIndex
            ) {

                paper.classList.add(
                    "is-active"
                );

                paper.setAttribute(
                    "tabindex",
                    "0"
                );


            } else if (
                index ===
                previousIndex
            ) {

                paper.classList.add(
                    "is-prev"
                );


            } else if (
                index ===
                nextIndex
            ) {

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
            ).padStart(
                2,
                "0"
            );

    }

}



/* =========================================================
   GALLERY NAVIGATION
   ========================================================= */

function previousGalleryPhoto() {

    if (!galleryPapers.length) {
        return;
    }


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

    if (!galleryPapers.length) {
        return;
    }


    currentGalleryIndex =
        (
            currentGalleryIndex +
            1
        ) %
        galleryPapers.length;


    updateGallery();
}



/* Desktop */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        event => {

            event.preventDefault();

            previousGalleryPhoto();

        }
    );

}


if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        event => {

            event.preventDefault();

            nextGalleryPhoto();

        }
    );

}


/* Mobile */

if (galleryMobilePrev) {

    galleryMobilePrev.addEventListener(
        "click",
        event => {

            event.preventDefault();

            previousGalleryPhoto();

        }
    );

}


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

let gallerySwipeStartX = null;
let galleryDidSwipe = false;


if (
    photoStage &&
    window.PointerEvent
) {

    photoStage.addEventListener(
        "pointerdown",
        event => {

            if (!event.isPrimary) {
                return;
            }


            gallerySwipeStartX =
                event.clientX;

            galleryDidSwipe =
                false;


            /*
               Do NOT capture desktop mouse
               pointers. This allows a normal
               desktop click on the active
               photograph to open the lightbox.
            */

            if (
                event.pointerType !==
                "mouse"
            ) {

                try {

                    photoStage
                        .setPointerCapture(
                            event.pointerId
                        );

                } catch (error) {

                    /* Pointer capture optional */

                }

            }

        }
    );


    photoStage.addEventListener(
        "pointerup",
        event => {

            if (
                gallerySwipeStartX ===
                null
            ) {
                return;
            }


            const difference =
                event.clientX -
                gallerySwipeStartX;


            gallerySwipeStartX =
                null;


            if (
                Math.abs(difference) <
                35
            ) {

                galleryDidSwipe =
                    false;

                return;
            }


            galleryDidSwipe =
                true;


            if (difference > 0) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }


            window.setTimeout(
                () => {

                    galleryDidSwipe =
                        false;

                },
                0
            );

        }
    );


    photoStage.addEventListener(
        "pointercancel",
        () => {

            gallerySwipeStartX =
                null;

            galleryDidSwipe =
                false;

        }
    );

}



/*
   Touch fallback for older browsers
   without Pointer Events.
*/

if (
    photoStage &&
    !window.PointerEvent
) {

    let touchStartX = null;


    photoStage.addEventListener(
        "touchstart",
        event => {

            if (
                !event.changedTouches.length
            ) {
                return;
            }


            touchStartX =
                event.changedTouches[0]
                    .clientX;

            galleryDidSwipe =
                false;

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
                event.changedTouches[0]
                    .clientX -
                touchStartX;


            touchStartX =
                null;


            if (
                Math.abs(difference) <
                35
            ) {

                galleryDidSwipe =
                    false;

                return;
            }


            galleryDidSwipe =
                true;


            if (difference > 0) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }


            window.setTimeout(
                () => {

                    galleryDidSwipe =
                        false;

                },
                0
            );

        },
        {
            passive: true
        }
    );

}



/* =========================================================
   GALLERY KEYBOARD
   ========================================================= */

if (photoStage) {

    photoStage.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                previousGalleryPhoto();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                nextGalleryPhoto();

            }

        }
    );

}



/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

const galleryLightbox =
    document.querySelector(
        "#galleryLightbox"
    );

const lightboxImage =
    document.querySelector(
        "#lightboxImage"
    );

const lightboxClose =
    document.querySelector(
        "#lightboxClose"
    );


let lastFocusedGalleryPaper =
    null;


function openGalleryLightbox() {

    if (
        !galleryLightbox ||
        !lightboxImage ||
        !galleryPapers.length
    ) {
        return;
    }


    const activePaper =
        galleryPapers[
            currentGalleryIndex
        ];


    const activeImage =
        activePaper
            ?.querySelector("img");


    if (!activeImage) {
        return;
    }


    lastFocusedGalleryPaper =
        activePaper;


    lightboxImage.src =
        activeImage.currentSrc ||
        activeImage.src;


    lightboxImage.alt =
        activeImage.alt;


    galleryLightbox
        .classList.add(
            "is-open"
        );


    galleryLightbox
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList.add(
            "lightbox-open"
        );


    if (lightboxClose) {

        window.setTimeout(
            () => {

                lightboxClose.focus();

            },
            50
        );

    }

}


function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox
        .classList.remove(
            "is-open"
        );


    galleryLightbox
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList.remove(
            "lightbox-open"
        );


    if (lightboxImage) {

        lightboxImage.src =
            "";

        lightboxImage.alt =
            "";

    }


    if (
        lastFocusedGalleryPaper
    ) {

        try {

            lastFocusedGalleryPaper
                .focus({
                    preventScroll: true
                });

        } catch (error) {

            lastFocusedGalleryPaper
                .focus();

        }

    }

}



/*
   Event delegation makes the active
   photo click reliable on desktop
   and mobile.
*/

if (photoStage) {

    photoStage.addEventListener(
        "click",
        event => {

            if (galleryDidSwipe) {
                return;
            }


            const clickedPaper =
                event.target.closest
                    ? event.target.closest(
                        ".photo-paper.is-active"
                    )
                    : null;


            if (!clickedPaper) {
                return;
            }


            openGalleryLightbox();

        }
    );


    photoStage.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }


            const activePaper =
                event.target.closest
                    ? event.target.closest(
                        ".photo-paper.is-active"
                    )
                    : null;


            if (!activePaper) {
                return;
            }


            event.preventDefault();

            openGalleryLightbox();

        }
    );

}



if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGalleryLightbox
    );

}



if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                galleryLightbox
            ) {

                closeGalleryLightbox();

            }

        }
    );

}



document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            galleryLightbox
                ?.classList.contains(
                    "is-open"
                )
        ) {

            closeGalleryLightbox();

        }

    }
);



/* =========================================================
   INITIALIZE GALLERY
   ========================================================= */

updateGallery();



/* =========================================================
   LISTING SEARCH DEMO
   ========================================================= */

const searchForm =
    document.querySelector(
        "#searchForm"
    );

const searchMessage =
    document.querySelector(
        "#searchMessage"
    );


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
    document.querySelector(
        "#contactForm"
    );

const formMessage =
    document.querySelector(
        "#formMessage"
    );


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
