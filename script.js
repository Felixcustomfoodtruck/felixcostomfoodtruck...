/* =========================================
   FÉLIX CUSTOM FOOD TRUCK
   SCRIPT.JS
========================================= */


/* =========================================
   GALERÍA DE TRAILAS
========================================= */

const galleryImages = document.querySelectorAll(".gallery-item img");

let currentImage = 0;


/* =========================================
   CREAR VISOR DE IMÁGENES
========================================= */

const lightbox = document.createElement("div");

lightbox.classList.add("lightbox");

lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar">
        &times;
    </button>

    <button class="lightbox-prev" aria-label="Imagen anterior">
        &#10094;
    </button>

    <div class="lightbox-content">
        <img src="" alt="Imagen ampliada">
    </div>

    <button class="lightbox-next" aria-label="Siguiente imagen">
        &#10095;
    </button>

    <div class="lightbox-counter"></div>
`;

document.body.appendChild(lightbox);


/* =========================================
   ELEMENTOS DEL VISOR
========================================= */

const lightboxImage =
    lightbox.querySelector(".lightbox-content img");

const closeButton =
    lightbox.querySelector(".lightbox-close");

const previousButton =
    lightbox.querySelector(".lightbox-prev");

const nextButton =
    lightbox.querySelector(".lightbox-next");

const counter =
    lightbox.querySelector(".lightbox-counter");


/* =========================================
   ABRIR IMAGEN
========================================= */

function openLightbox(index) {

    currentImage = index;

    const selectedImage =
        galleryImages[currentImage];

    lightboxImage.src = selectedImage.src;

    lightboxImage.alt = selectedImage.alt;

    counter.textContent =
        `${currentImage + 1} / ${galleryImages.length}`;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CERRAR VISOR
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   SIGUIENTE IMAGEN
========================================= */

function nextImage() {

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    lightboxImage.src =
        galleryImages[currentImage].src;

    lightboxImage.alt =
        galleryImages[currentImage].alt;

    counter.textContent =
        `${currentImage + 1} / ${galleryImages.length}`;

}


/* =========================================
   IMAGEN ANTERIOR
========================================= */

function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[currentImage].src;

    lightboxImage.alt =
        galleryImages[currentImage].alt;

    counter.textContent =
        `${currentImage + 1} / ${galleryImages.length}`;

}


/* =========================================
   EVENTOS DE LAS IMÁGENES
========================================= */

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* =========================================
   BOTONES
========================================= */

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", nextImage);

previousButton.addEventListener("click", previousImage);


/* =========================================
   CERRAR AL TOCAR EL FONDO
========================================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});


/* =========================================
   SOPORTE PARA SWIPE EN CELULAR
========================================= */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {

        nextImage();

    } else {

        previousImage();

    }

}


/* =========================================
   ANIMACIÓN DE SCROLL
========================================= */

const sections =
    document.querySelectorAll("section");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* =========================================
   MENÚ SUAVE
========================================= */

const navigationLinks =
    document.querySelectorAll(".navbar a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});