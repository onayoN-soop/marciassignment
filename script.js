/* =========================================================
   MARCI METZGER HOMES
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const siteHeader =
    document.querySelector(
        ".site-header"
    );


function updateHeader() {

    if (!siteHeader) {
        return;
    }


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


updateHeader();



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
                headerDropdown
                    .classList
                    .toggle(
                        "active"
                    );


            menuDropdownToggle
                .classList
                .toggle(
                    "active",
                    isOpen
                );


            menuDropdownToggle
                .setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

        }
    );


    headerDropdown
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeDropdown
                );

            }
        );


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

            if (
                event.key ===
                "Escape"
            ) {

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


    heroSlides.forEach(
        slide => {

            slide.classList.remove(
                "active"
            );

        }
    );


    const activeSlide =
        heroSlides[index];


    if (!activeSlide) {
        return;
    }


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

    showHeroSlide(
        currentHeroSlide
    );


    window.setInterval(
        () => {

            currentHeroSlide =
                (
                    currentHeroSlide +
                    1
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
                                .classList
                                .add(
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
    .forEach(
        link => {

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

        }
    );



/* =========================================================
   PHOTO PAPER GALLERY
   ========================================================= */


/*
 * IMPORTANT:
 *
 * Change ONLY this number when
 * adding more gallery photos.
 *
 * Example:
 *
 * gallery-1.jpg
 * gallery-2.jpg
 * gallery-3.jpg
 * gallery-4.jpg
 *
 * = 4
 */

const galleryPhotoCount = 9;



/* =========================================================
   BUILD PHOTOS AUTOMATICALLY
   ========================================================= */

const photoStage =
    document.querySelector(
        "#photoStage"
    );


if (photoStage) {

    for (
        let photoNumber = 1;
        photoNumber <=
        galleryPhotoCount;
        photoNumber++
    ) {


        const paper =
            document.createElement(
                "figure"
            );


        paper.className =
            "photo-paper";


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
            `images/gallery-${photoNumber}.jpg`;


        image.alt =
            `Marci Metzger real estate gallery photo ${photoNumber}`;


        image.draggable =
            false;


        if (
            photoNumber === 1
        ) {

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



/* =========================================================
   GALLERY ELEMENTS
   ========================================================= */

const galleryPapers =
    Array.from(
        document.querySelectorAll(
            ".photo-paper"
        )
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


let currentGalleryIndex =
    0;


let galleryDidSwipe =
    false;



/* =========================================================
   GALLERY COUNTER
   ========================================================= */

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
   UPDATE GALLERY
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


            if (
                index ===
                currentGalleryIndex
            ) {

                paper.classList.add(
                    "is-active"
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
                currentGalleryIndex +
                1
            ).padStart(
                2,
                "0"
            );

    }

}



/* =========================================================
   PREVIOUS
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



/* =========================================================
   NEXT
   ========================================================= */

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



/* =========================================================
   GALLERY ARROWS
   ========================================================= */

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

let gallerySwipeStartX =
    null;


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
         * Pointer capture is useful for
         * touch swiping, but don't use it
         * for a desktop mouse because it
         * can swallow the photo click.
         */

        if (
            event.pointerType !== "mouse"
        ) {

            try {

                photoStage.setPointerCapture(
                    event.pointerId
                );

            } catch (error) {

                /* Pointer capture is optional */

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
                Math.abs(
                    difference
                ) < 35
            ) {

                galleryDidSwipe =
                    false;

                return;

            }


            galleryDidSwipe =
                true;


            if (
                difference > 0
            ) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }


            window.setTimeout(
                () => {

                    galleryDidSwipe =
                        false;

                },
                200
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



/* Touch fallback */

if (
    photoStage &&
    !window.PointerEvent
) {

    let touchStartX =
        null;


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
                Math.abs(
                    difference
                ) < 35
            ) {

                galleryDidSwipe =
                    false;

                return;

            }


            galleryDidSwipe =
                true;


            if (
                difference > 0
            ) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }


            window.setTimeout(
                () => {

                    galleryDidSwipe =
                        false;

                },
                200
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

    photoStage.setAttribute(
        "tabindex",
        "0"
    );


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



/* Initialize gallery */

updateGallery();



/* =========================================================
   GALLERY POPUP
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



/* =========================================================
   OPEN POPUP
   ========================================================= */

function openGalleryLightbox() {

    if (
        !galleryLightbox ||
        !lightboxImage ||
        !galleryPapers.length
    ) {
        return;
    }


    const currentPaper =
        galleryPapers[
            currentGalleryIndex
        ];


    if (!currentPaper) {
        return;
    }


    const currentImage =
        currentPaper.querySelector(
            "img"
        );


    if (!currentImage) {
        return;
    }


    lightboxImage.src =
        currentImage.currentSrc ||
        currentImage.src;


    lightboxImage.alt =
        currentImage.alt ||
        "Enlarged gallery photo";


    lastFocusedGalleryPaper =
        currentPaper;


    galleryLightbox
        .classList
        .add(
            "is-open"
        );


    galleryLightbox
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "lightbox-open"
        );


    if (lightboxClose) {

        lightboxClose.focus();

    }

}



/* =========================================================
   CLOSE POPUP
   ========================================================= */

function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox
        .classList
        .remove(
            "is-open"
        );


    galleryLightbox
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "lightbox-open"
        );


    if (lightboxImage) {

        lightboxImage.src =
            "";

    }


    if (
        lastFocusedGalleryPaper
    ) {

        lastFocusedGalleryPaper
            .focus({
                preventScroll: true
            });

    }

}



/* =========================================================
   CLICK ACTIVE PHOTO TO OPEN
   ========================================================= */

galleryPapers.forEach(
    paper => {

        paper.setAttribute(
            "tabindex",
            "0"
        );


        paper.setAttribute(
            "role",
            "button"
        );


        paper.setAttribute(
            "aria-label",
            "Enlarge photo"
        );


        paper.addEventListener(
            "click",
            () => {

                if (
                    galleryDidSwipe
                ) {
                    return;
                }


                if (
                    paper.classList
                        .contains(
                            "is-active"
                        )
                ) {

                    openGalleryLightbox();

                }

            }
        );


        paper.addEventListener(
            "keydown",
            event => {

                if (
                    (
                        event.key ===
                        "Enter"
                    ) ||
                    (
                        event.key ===
                        " "
                    )
                ) {

                    if (
                        paper.classList
                            .contains(
                                "is-active"
                            )
                    ) {

                        event.preventDefault();

                        openGalleryLightbox();

                    }

                }

            }
        );

    }
);



/* =========================================================
   CLOSE BUTTON
   ========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeGalleryLightbox();

        }
    );

}



/* =========================================================
   CLICK DARK AREA TO CLOSE
   ========================================================= */

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



/* =========================================================
   ESCAPE TO CLOSE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        if (
            galleryLightbox &&
            galleryLightbox
                .classList
                .contains(
                    "is-open"
                )
        ) {

            closeGalleryLightbox();

        }

    }
);



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
