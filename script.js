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

const galleryPhotoCount = 9;
const photoStage = document.querySelector("#photoStage");
const galleryCurrent = document.querySelector("#galleryCurrent");
const galleryTotal = document.querySelector("#galleryTotal");
const galleryPrev = document.querySelector("#galleryPrev");
const galleryNext = document.querySelector("#galleryNext");
const galleryMobilePrev = document.querySelector("#galleryMobilePrev");
const galleryMobileNext = document.querySelector("#galleryMobileNext");

if (photoStage) {
    for (let index = 1; index <= galleryPhotoCount; index += 1) {
        const paper = document.createElement("figure");
        const frame = document.createElement("div");
        const image = document.createElement("img");

        paper.className = "photo-paper";
        paper.setAttribute("role", "button");
        paper.setAttribute("aria-label", `Open gallery photo ${index}`);
        paper.setAttribute("tabindex", "-1");

        frame.className = "photo-frame";
        image.src = `images/gallery-${index}.jpg`;
        image.alt = `Pahrump property gallery photo ${index}`;
        image.draggable = false;
        image.loading = index === 1 ? "eager" : "lazy";

        frame.appendChild(image);
        paper.appendChild(frame);
        photoStage.appendChild(paper);
    }
}

const galleryPapers = photoStage ? [...photoStage.querySelectorAll(".photo-paper")] : [];
let currentGalleryIndex = 0;
let gallerySwipeStartX = null;
let galleryDidSwipe = false;

if (galleryTotal) {
    galleryTotal.textContent = String(galleryPapers.length).padStart(2, "0");
}

function updateGallery() {
    if (!galleryPapers.length) return;

    const total = galleryPapers.length;
    const previousIndex = (currentGalleryIndex - 1 + total) % total;
    const nextIndex = (currentGalleryIndex + 1) % total;

    galleryPapers.forEach((paper, index) => {
        paper.classList.remove("is-active", "is-prev", "is-next");
        paper.setAttribute("tabindex", "-1");

        if (index === currentGalleryIndex) {
            paper.classList.add("is-active");
            paper.setAttribute("tabindex", "0");
        } else if (index === previousIndex) {
            paper.classList.add("is-prev");
        } else if (index === nextIndex) {
            paper.classList.add("is-next");
        }
    });

    if (galleryCurrent) {
        galleryCurrent.textContent = String(currentGalleryIndex + 1).padStart(2, "0");
    }
}

function previousGalleryPhoto() {
    if (!galleryPapers.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryPapers.length) % galleryPapers.length;
    updateGallery();
}

function nextGalleryPhoto() {
    if (!galleryPapers.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryPapers.length;
    updateGallery();
}

[
    [galleryPrev, previousGalleryPhoto],
    [galleryNext, nextGalleryPhoto],
    [galleryMobilePrev, previousGalleryPhoto],
    [galleryMobileNext, nextGalleryPhoto]
].forEach(([button, handler]) => {
    if (!button) return;
    button.addEventListener("click", event => {
        event.preventDefault();
        handler();
    });
});

if (photoStage && window.PointerEvent) {
    photoStage.addEventListener("pointerdown", event => {
        if (!event.isPrimary) return;

        gallerySwipeStartX = event.clientX;
        galleryDidSwipe = false;

        if (event.pointerType !== "mouse") {
            try {
                photoStage.setPointerCapture(event.pointerId);
            } catch (_) {}
        }
    });

    photoStage.addEventListener("pointerup", event => {
        if (gallerySwipeStartX === null) return;

        const difference = event.clientX - gallerySwipeStartX;
        gallerySwipeStartX = null;

        if (Math.abs(difference) < 35) {
            galleryDidSwipe = false;
            return;
        }

        galleryDidSwipe = true;
        difference > 0 ? previousGalleryPhoto() : nextGalleryPhoto();
        window.setTimeout(() => { galleryDidSwipe = false; }, 0);
    });

    photoStage.addEventListener("pointercancel", () => {
        gallerySwipeStartX = null;
        galleryDidSwipe = false;
    });
}

if (photoStage && !window.PointerEvent) {
    let touchStartX = null;

    photoStage.addEventListener("touchstart", event => {
        if (!event.changedTouches.length) return;
        touchStartX = event.changedTouches[0].clientX;
        galleryDidSwipe = false;
    }, { passive: true });

    photoStage.addEventListener("touchend", event => {
        if (touchStartX === null || !event.changedTouches.length) return;

        const difference = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;

        if (Math.abs(difference) < 35) {
            galleryDidSwipe = false;
            return;
        }

        galleryDidSwipe = true;
        difference > 0 ? previousGalleryPhoto() : nextGalleryPhoto();
        window.setTimeout(() => { galleryDidSwipe = false; }, 0);
    }, { passive: true });
}

const galleryLightbox = document.querySelector("#galleryLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
let lastFocusedGalleryPaper = null;

function openGalleryLightbox() {
    if (!galleryLightbox || !lightboxImage || !galleryPapers.length) return;

    const activePaper = galleryPapers[currentGalleryIndex];
    const activeImage = activePaper?.querySelector("img");
    if (!activeImage) return;

    lastFocusedGalleryPaper = activePaper;
    lightboxImage.src = activeImage.currentSrc || activeImage.src;
    lightboxImage.alt = activeImage.alt;
    galleryLightbox.classList.add("is-open");
    galleryLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    window.setTimeout(() => lightboxClose?.focus(), 50);
}

function closeGalleryLightbox() {
    if (!galleryLightbox) return;

    galleryLightbox.classList.remove("is-open");
    galleryLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lightboxImage) {
        lightboxImage.src = "";
        lightboxImage.alt = "";
    }

    lastFocusedGalleryPaper?.focus({ preventScroll: true });
}

if (photoStage) {
    photoStage.addEventListener("click", event => {
        if (galleryDidSwipe) return;
        const clickedPaper = event.target.closest?.(".photo-paper.is-active");
        if (clickedPaper) openGalleryLightbox();
    });

    photoStage.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousGalleryPhoto();
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextGalleryPhoto();
            return;
        }

        if (event.key !== "Enter" && event.key !== " ") return;
        const activePaper = event.target.closest?.(".photo-paper.is-active");
        if (!activePaper) return;

        event.preventDefault();
        openGalleryLightbox();
    });
}

lightboxClose?.addEventListener("click", closeGalleryLightbox);

galleryLightbox?.addEventListener("click", event => {
    if (event.target === galleryLightbox) {
        closeGalleryLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    closeDropdown();

    if (galleryLightbox?.classList.contains("is-open")) {
        closeGalleryLightbox();
    }
});

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

updateGallery();
updateHeader();
