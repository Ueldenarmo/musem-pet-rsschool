document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('#gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        speed: 800,
        effect: 'slide',

        navigation: false,
        pagination: false,


        on: {
            init: function () {
                createCustomPagination(this);
                updateSlideCounter(this);
                updateNavigationState(this);
                loadBackgroundImages();
            },
            slideChange: function () {
                updateCustomPagination(this);
                updateSlideCounter(this);
                updateNavigationState(this);
            }
        }
    });

    function createCustomPagination(swiperInstance) {
        const paginationContainer = document.getElementById('custom-pagination');
        const slidesCount = swiperInstance.slides.length;


        paginationContainer.innerHTML = '';

        for (let i = 0; i < slidesCount; i++) {
            const bullet = document.createElement('div');
            bullet.className = 'pagination-bullet';
            if (i === 0) bullet.classList.add('active');

            bullet.addEventListener('click', function () {
                swiperInstance.slideTo(i);
            });

            paginationContainer.appendChild(bullet);
        }
    }

    function updateCustomPagination(swiperInstance) {
        const bullets = document.querySelectorAll('.pagination-bullet');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === swiperInstance.activeIndex);
        });
    }

    function updateSlideCounter(swiperInstance) {
        const currentSlide = document.getElementById('current-slide');
        const totalSlides = document.getElementById('total-slides');

        if (currentSlide && totalSlides) {
            currentSlide.textContent = String(swiperInstance.activeIndex + 1).padStart(2, '0');
            totalSlides.textContent = String(swiperInstance.slides.length).padStart(2, '0');
        }
    }

    function updateNavigationState(swiperInstance) {
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');

        if (prevArrow && nextArrow) {
            prevArrow.classList.toggle('disabled', swiperInstance.isBeginning);
            nextArrow.classList.toggle('disabled', swiperInstance.isEnd);
        }
    }

    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');

    if (prevArrow) {
        prevArrow.addEventListener('click', function () {
            if (!this.classList.contains('disabled')) {
                swiper.slidePrev();
            }
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function () {
            if (!this.classList.contains('disabled')) {
                swiper.slideNext();
            }
        });
    }

    function loadBackgroundImages() {
        const slides = document.querySelectorAll('.swiper-slide[data-bg]');

        slides.forEach(slide => {
            const bgImage = slide.getAttribute('data-bg');
            if (!bgImage) return;

            const img = new Image();
            img.onload = function () {
                slide.style.backgroundImage = `url(${bgImage})`;
                slide.classList.add('bg-loaded');
            };
            img.onerror = function () {
                console.warn('Не удалось загрузить фоновое изображение:', bgImage);
                slide.classList.add('bg-error');
            };
            img.src = bgImage;
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            swiper.slideNext();
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    const swiperContainer = document.querySelector('.swiper-container');

    if (swiperContainer) {
        swiperContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        swiperContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        }
    }

    window.gallerySwiper = swiper;
});