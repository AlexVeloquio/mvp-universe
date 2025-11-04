const swiper = new Swiper('.swiper-gallery', {
  slidesPerView: 'auto',
  loop: true,
  spaceBetween: 12,
  speed: 6000, // ← Clave: más lento = más fluido
  freeMode: true, // ← Clave: permite movimiento libre
  loopAdditionalSlides: 3, // ← Más slides duplicados
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  grabCursor: true,
  allowTouchMove: true,
  observer: true,
  observeParents: true,
  on: {
        init() {
            this.wrapperEl.style.transitionTimingFunction = 'linear';
        },
        imagesReady() {
            this.update();
        }
 }
});

// Animación suave para los elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos del footer
document.addEventListener('DOMContentLoaded', function() {
    const footerElements = document.querySelectorAll('.footer-section, .contact-item');
    
    footerElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Efecto de hover en el mapa
const mapWrapper = document.querySelector('.map-wrapper');
if (mapWrapper) {
    mapWrapper.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    mapWrapper.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

let currentSlideIndex = 0;
const totalSlides = 2; // Actualizado a 2

function updateCarousel() {
    const wrapper = document.getElementById('carouselWrapper');
    const translateX = -currentSlideIndex * 100;
    wrapper.style.transform = `translateX(${translateX}%)`;

    // Actualizar indicadores
    document.querySelectorAll('.mvp-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });

    // Actualizar contador
    document.getElementById('currentSlide').textContent = currentSlideIndex + 1;

    // Actualizar botones
    document.getElementById('prevBtn').disabled = currentSlideIndex === 0;
    document.getElementById('nextBtn').disabled = currentSlideIndex === totalSlides - 1;
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCarousel();
    }
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateCarousel();
});

// Swiper de Instalaciones
const installationsSwiper = new Swiper('.installations-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    
    navigation: {
        nextEl: '.installations-swiper .swiper-button-next',
        prevEl: '.installations-swiper .swiper-button-prev',
    },
    
    pagination: {
        el: '.installations-swiper .swiper-pagination',
        clickable: true,
    },
    
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    }
});

const installationsContainer = document.querySelector('.installations-swiper');
if (installationsContainer) {
    installationsContainer.addEventListener('mouseenter', function() {
        installationsSwiper.autoplay.stop();
    });
    
    installationsContainer.addEventListener('mouseleave', function() {
        installationsSwiper.autoplay.start();
    });
}

// Función para manejar el clic en las ligas
function showLeague(leagueId, clickedElement) {
    // Ocultar todas las categorías
    document.querySelectorAll('.league-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remover active de todos los tabs
    document.querySelectorAll('.league-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar la categoría seleccionada
    document.getElementById(leagueId).classList.add('active');
    
    // Activar el tab seleccionado usando el elemento que se pasó como parámetro
    if (clickedElement) {
        clickedElement.classList.add('active');
    }

    // Reiniciar animaciones
    const cards = document.querySelectorAll(`#${leagueId} .league-card`);
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = `cardFadeIn 0.6s ease forwards`;
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

// Inicializar Swiper de Ligas
const leaguesSwiper = new Swiper('.leagues-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    centeredSlides: false,
    allowTouchMove: true,
    navigation: {
        nextEl: '.leagues-swiper .swiper-button-next',
        prevEl: '.leagues-swiper .swiper-button-prev',
    },
    pagination: {
        el: '.leagues-swiper .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

// Función simple para flipear tarjetas
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Swiper de Podcast/Videos
const podcastSwiper = new Swiper('.podcast-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    navigation: {
        nextEl: '.podcast-swiper .swiper-button-next',
        prevEl: '.podcast-swiper .swiper-button-prev',
    },
    
    pagination: {
        el: '.podcast-swiper .swiper-pagination',
        clickable: true,
    }
});