const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-dropdown-toggle");
const headerDropdown = document.querySelector(".header-dropdown");

function updateHeader() {
    if (siteHeader) {
        siteHeader.classList.toggle("scrolled", window.scrollY > 50);
    }
}

function closeDropdown() {
    if (!menuToggle || !headerDropdown) return;

    headerDropdown.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && headerDropdown) {
    menuToggle.addEventListener("click", event => {
        event.stopPropagation();
        const isOpen = headerDropdown.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    headerDropdown.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeDropdown);
    });

    document.addEventListener("click", event => {
        if (!headerDropdown.contains(event.target) && !menuToggle.contains(event.target)) {
            closeDropdown();
        }
    });
}

const heroSlides = [...document.querySelectorAll(".hero-slide")];
let currentHeroSlide = 0;

function showHeroSlide(index) {
    if (!heroSlides.length) return;

    heroSlides.forEach(slide => slide.classList.remove("active"));
    const activeSlide = heroSlides[index];

    activeSlide.style.animation = "none";
    void activeSlide.offsetWidth;
    activeSlide.style.animation = "";
    activeSlide.classList.add("active");
}

if (heroSlides.length) {
    showHeroSlide(0);

    window.setInterval(() => {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }, 8000);
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
            event.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* =========================================================
   PROPERTY LISTINGS GALLERY
   ========================================================= */

const listingsGalleryViewport =
    document.querySelector("#listingsGalleryViewport");

const listingsGalleryTrack =
    document.querySelector("#listingsGalleryTrack");

const listingsGalleryPrev =
    document.querySelector("#listingsGalleryPrev");

const listingsGalleryNext =
    document.querySelector("#listingsGalleryNext");

let listingsGallerySlides = [];
let listingsGalleryIndex = 1;
let listingsGalleryTranslate = 0;
let listingsGalleryAnimating = false;
let listingsGalleryDragging = false;
let listingsGalleryDragStartX = 0;
let listingsGalleryDragStartTranslate = 0;
let listingsGalleryDragStartTime = 0;
let listingsGalleryDidDrag = false;
let listingsGallerySuppressClick = false;
let listingsGalleryTransitionTimer = null;
let listingsGalleryWheelLocked = false;

if (listingsGalleryTrack && listingsGalleryViewport) {
    const realSlides = [
        ...listingsGalleryTrack.querySelectorAll(".listings-gallery-slide")
    ];

    if (realSlides.length > 1) {
        const firstClone = realSlides[0].cloneNode(true);
        const lastClone = realSlides[realSlides.length - 1].cloneNode(true);

        firstClone.classList.add("is-clone");
        lastClone.classList.add("is-clone");

        firstClone.setAttribute("aria-hidden", "true");
        lastClone.setAttribute("aria-hidden", "true");

        const firstCloneLink = firstClone.querySelector("a");
        const lastCloneLink = lastClone.querySelector("a");

        if (firstCloneLink) firstCloneLink.tabIndex = -1;
        if (lastCloneLink) lastCloneLink.tabIndex = -1;

        listingsGalleryTrack.prepend(lastClone);
        listingsGalleryTrack.append(firstClone);
    }

    listingsGallerySlides = [
        ...listingsGalleryTrack.querySelectorAll(".listings-gallery-slide")
    ];
}

function getListingsGalleryTarget() {
    if (
        !listingsGalleryViewport ||
        !listingsGallerySlides.length
    ) {
        return 0;
    }

    const slide = listingsGallerySlides[listingsGalleryIndex];
    if (!slide) return 0;

    const slideCenter =
        slide.offsetLeft + (slide.offsetWidth / 2);

    return (
        listingsGalleryViewport.clientWidth / 2
    ) - slideCenter;
}

function updateListingsGallery(animate = false) {
    if (
        !listingsGalleryTrack ||
        !listingsGalleryViewport ||
        !listingsGallerySlides.length
    ) {
        return;
    }

    listingsGallerySlides.forEach((slide, index) => {
        slide.classList.toggle(
            "is-active",
            index === listingsGalleryIndex
        );
    });

    listingsGalleryTranslate = getListingsGalleryTarget();

    listingsGalleryTrack.style.transition =
        animate
            ? "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";

    listingsGalleryTrack.style.transform =
        `translate3d(${listingsGalleryTranslate}px, 0, 0)`;
}

function finishListingsGalleryTransition() {
    if (!listingsGallerySlides.length) return;

    window.clearTimeout(listingsGalleryTransitionTimer);

    const realSlideCount =
        listingsGallerySlides.length - 2;

    if (listingsGalleryIndex === 0) {
        listingsGalleryIndex = realSlideCount;
        updateListingsGallery(false);
    } else if (
        listingsGalleryIndex ===
        listingsGallerySlides.length - 1
    ) {
        listingsGalleryIndex = 1;
        updateListingsGallery(false);
    }

    listingsGalleryAnimating = false;
}

function moveListingsGallery(direction) {
    if (
        !listingsGallerySlides.length ||
        listingsGalleryAnimating ||
        listingsGalleryDragging
    ) {
        return;
    }

    listingsGalleryIndex += direction;
    listingsGalleryAnimating = true;

    updateListingsGallery(true);

    listingsGalleryTransitionTimer =
        window.setTimeout(
            finishListingsGalleryTransition,
            950
        );
}

function snapListingsGalleryBack() {
    if (
        !listingsGallerySlides.length ||
        listingsGalleryAnimating
    ) {
        return;
    }

    listingsGalleryAnimating = true;
    updateListingsGallery(true);

    listingsGalleryTransitionTimer =
        window.setTimeout(
            finishListingsGalleryTransition,
            950
        );
}

listingsGalleryTrack?.addEventListener(
    "transitionend",
    event => {
        if (event.propertyName !== "transform") return;
        finishListingsGalleryTransition();
    }
);

listingsGalleryPrev?.addEventListener(
    "click",
    () => moveListingsGallery(-1)
);

listingsGalleryNext?.addEventListener(
    "click",
    () => moveListingsGallery(1)
);

listingsGalleryViewport?.addEventListener(
    "pointerdown",
    event => {
        if (
            !event.isPrimary ||
            listingsGalleryAnimating
        ) {
            return;
        }

        listingsGalleryDragging = true;
        listingsGalleryDidDrag = false;

        listingsGalleryDragStartX = event.clientX;
        listingsGalleryDragStartTranslate =
            listingsGalleryTranslate;
        listingsGalleryDragStartTime =
            performance.now();

        listingsGalleryViewport.classList.add(
            "is-dragging"
        );

        listingsGalleryTrack.style.transition = "none";
    }
);

window.addEventListener(
    "pointermove",
    event => {
        if (!listingsGalleryDragging) return;

        const difference =
            event.clientX - listingsGalleryDragStartX;

        if (Math.abs(difference) > 5) {
            listingsGalleryDidDrag = true;
        }

        listingsGalleryTrack.style.transform =
            `translate3d(${
                listingsGalleryDragStartTranslate +
                difference
            }px, 0, 0)`;
    }
);

function endListingsGalleryDrag(event) {
    if (!listingsGalleryDragging) return;

    const difference =
        event.clientX - listingsGalleryDragStartX;

    const elapsed =
        Math.max(
            performance.now() -
            listingsGalleryDragStartTime,
            1
        );

    const velocity = difference / elapsed;

    const threshold =
        Math.min(
            125,
            listingsGalleryViewport.clientWidth * 0.08
        );

    listingsGalleryDragging = false;

    listingsGalleryViewport.classList.remove(
        "is-dragging"
    );

    if (listingsGalleryDidDrag) {
        listingsGallerySuppressClick = true;

        window.setTimeout(() => {
            listingsGallerySuppressClick = false;
        }, 250);
    }

    if (
        difference < -threshold ||
        velocity < -0.45
    ) {
        moveListingsGallery(1);
    } else if (
        difference > threshold ||
        velocity > 0.45
    ) {
        moveListingsGallery(-1);
    } else {
        snapListingsGalleryBack();
    }
}

window.addEventListener(
    "pointerup",
    endListingsGalleryDrag
);

listingsGalleryViewport?.addEventListener(
    "pointercancel",
    event => {
        if (!listingsGalleryDragging) return;

        listingsGalleryDragging = false;

        listingsGalleryViewport.classList.remove(
            "is-dragging"
        );

        snapListingsGalleryBack();
    }
);

listingsGalleryViewport?.addEventListener(
    "click",
    event => {
        if (!listingsGallerySuppressClick) return;

        event.preventDefault();
        event.stopPropagation();
    },
    true
);

listingsGalleryViewport?.addEventListener(
    "dragstart",
    event => {
        event.preventDefault();
    }
);

listingsGalleryViewport?.addEventListener(
    "keydown",
    event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveListingsGallery(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            moveListingsGallery(1);
        }
    }
);

listingsGalleryViewport?.addEventListener(
    "wheel",
    event => {
        if (
            Math.abs(event.deltaX) <=
            Math.abs(event.deltaY)
        ) {
            return;
        }

        event.preventDefault();

        if (listingsGalleryWheelLocked) return;

        listingsGalleryWheelLocked = true;

        moveListingsGallery(
            event.deltaX > 0 ? 1 : -1
        );

        window.setTimeout(() => {
            listingsGalleryWheelLocked = false;
        }, 700);
    },
    { passive: false }
);

window.addEventListener(
    "resize",
    () => {
        updateListingsGallery(false);
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

const searchForm = document.querySelector("#searchForm");
const searchMessage = document.querySelector("#searchMessage");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

searchForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (searchMessage) {
        searchMessage.textContent = "Live MLS search is not connected in this demo.";
    }
});

contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (formMessage) {
        formMessage.textContent = "Form submission is disabled for this demo.";
    }
});

updateListingsGallery();
updateHeader();
