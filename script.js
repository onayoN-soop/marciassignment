/* =========================================================
   MARCI METZGER HOMES
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const siteHeader =
    document.querySelector(".site-header");


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

            if (
                event.key === "Escape"
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


    /*
     * Restart the camera-motion
     * animation each time.
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
 * =========================================================
 * CHANGE ONLY THIS NUMBER WHEN ADDING GALLERY PHOTOS
 * =========================================================
 *
 * Example:
 *
 * gallery-1.jpg
 * gallery-2.jpg
 * gallery-3.jpg
 * gallery-4.jpg
 *
 * galleryPhotoCount = 4
 *
 * Add:
 *
 * gallery-5.jpg
 * gallery-6.jpg
 *
 * Then change this to:
 *
 * galleryPhotoCount = 6
 */

const galleryPhotoCount = 4;



/* =========================================================
   BUILD GALLERY PHOTOS AUTOMATICALLY
   ========================================================= */

const photoStage =
    document.querySelector(
        "#photoStage"
    );


if (photoStage) {

    for (
        let photoNumber = 1;
        photoNumber <= galleryPhotoCount;
        photoNumber++
    ) {


        const paper =
            document.createElement(
                "figure"
            );


        paper.classList.add(
            "photo-paper"
        );



        const frame =
            document.createElement(
                "div"
            );


        frame.classList.add(
            "photo-frame"
        );



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


        if (photoNumber === 1) {

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


let currentGalleryIndex = 0;



/* =========================================================
   GALLERY TOTAL
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
   UPDATE GALLERY POSITION
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

            }


            else if (
                index ===
                previousIndex
            ) {

                paper.classList.add(
                    "is-prev"
                );

            }


            else if (
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
   PREVIOUS GALLERY PHOTO
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
   NEXT GALLERY PHOTO
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
   DESKTOP GALLERY ARROWS
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



/* =========================================================
   MOBILE GALLERY ARROWS
   ========================================================= */

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
   GALLERY SWIPE / DRAG
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


            /*
             * Reset after click event
             * has had a chance to fire.
             */

            window.setTimeout(
                () => {

                    galleryDidSwipe =
                        false;

                },
                100
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
 * Touch fallback for older browsers.
 */

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
                100
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



/* =========================================================
   INITIALIZE GALLERY
   ========================================================= */

updateGallery();



/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

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


/* =========================================================
   OPEN LIGHTBOX
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


    const image =
        currentPaper.querySelector(
            "img"
        );


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt ||
        "Enlarged gallery photo";


    galleryLightbox.classList.add(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "lightbox-open"
    );


    if (lightboxClose) {

        lightboxClose.focus();

    }

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox.classList.remove(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );

}


/* =========================================================
   CLICK / TAP CURRENT PHOTO
   ========================================================= */

galleryPapers.forEach(
    paper => {

        paper.addEventListener(
            "click",
            () => {

                /*
                 * Do not open after swiping.
                 */

                if (galleryDidSwipe) {
                    return;
                }


                if (
                    paper.classList.contains(
                        "is-active"
                    )
                ) {

                    openGalleryLightbox();

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
   CLICK DARK BACKGROUND TO CLOSE
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
            event.key === "Escape" &&
            galleryLightbox &&
            galleryLightbox.classList.contains(
                "is-open"
            )
        ) {

            closeGalleryLightbox();

        }

    }
);



/* =========================================================
   UPDATE LIGHTBOX IMAGE
   ========================================================= */

function updateLightboxImage() {

    if (
        !galleryPapers.length ||
        !lightboxImage
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


    const image =
        currentPaper.querySelector(
            "img"
        );


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt ||
        "Enlarged gallery photo";

}



/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    updateLightboxImage();


    galleryLightbox.classList.add(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "lightbox-open"
    );


    if (lightboxClose) {

        lightboxClose.focus();

    }

}



/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox.classList.remove(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );

}



/* =========================================================
   CLICK / TAP ACTIVE PHOTO TO ENLARGE
   ========================================================= */

galleryPapers.forEach(
    paper => {

        paper.addEventListener(
            "click",
            () => {


                /*
                 * Don't open the lightbox
                 * after a swipe.
                 */

                if (galleryDidSwipe) {
                    return;
                }


                if (
                    paper.classList.contains(
                        "is-active"
                    )
                ) {

                    openGalleryLightbox();

                }

            }
        );

    }
);



/* =========================================================
   LIGHTBOX PREVIOUS
   ========================================================= */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            previousGalleryPhoto();


            updateLightboxImage();

        }
    );

}



/* =========================================================
   LIGHTBOX NEXT
   ========================================================= */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            nextGalleryPhoto();


            updateLightboxImage();

        }
    );

}



/* =========================================================
   LIGHTBOX CLOSE BUTTON
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
   CLICK DARK BACKGROUND TO CLOSE
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
   LIGHTBOX KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains(
                "is-open"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGalleryLightbox();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            event.preventDefault();


            previousGalleryPhoto();


            updateLightboxImage();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();


            nextGalleryPhoto();


            updateLightboxImage();

        }

    }
);



/* =========================================================
   LIGHTBOX MOBILE SWIPE
   ========================================================= */

let lightboxSwipeStartX =
    null;


if (
    galleryLightbox &&
    window.PointerEvent
) {

    galleryLightbox.addEventListener(
        "pointerdown",
        event => {

            /*
             * Don't start swipe gestures
             * from arrow/close buttons.
             */

            if (
                event.target.closest(
                    "button"
                )
            ) {

                return;

            }


            lightboxSwipeStartX =
                event.clientX;

        }
    );


    galleryLightbox.addEventListener(
        "pointerup",
        event => {

            if (
                lightboxSwipeStartX ===
                null
            ) {

                return;

            }


            const difference =
                event.clientX -
                lightboxSwipeStartX;


            lightboxSwipeStartX =
                null;


            if (
                Math.abs(
                    difference
                ) < 40
            ) {

                return;

            }


            if (
                difference > 0
            ) {

                previousGalleryPhoto();

            } else {

                nextGalleryPhoto();

            }


            updateLightboxImage();

        }
    );


    galleryLightbox.addEventListener(
        "pointercancel",
        () => {

            lightboxSwipeStartX =
                null;

        }
    );

}



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
