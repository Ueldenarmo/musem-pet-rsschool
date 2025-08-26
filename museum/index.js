document.addEventListener('DOMContentLoaded', function () {
    // Инициализация Swiper
    const swiper = new Swiper('#gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        speed: 800,
        effect: 'slide',

        // Отключаем встроенную навигацию
        navigation: false,
        pagination: false,

        // Callbacks
        on: {
            init: function () {
                createCustomPagination(this);
                updateSlideCounter(this);
                updateNavigationState(this);
                loadImages();
            },
            slideChange: function () {
                updateCustomPagination(this);
                updateSlideCounter(this);
                updateNavigationState(this);
            }
        }
    });

    // Создание кастомной пагинации (квадраты)
    function createCustomPagination(swiperInstance) {
        const paginationContainer = document.getElementById('custom-pagination');
        const slidesCount = swiperInstance.slides.length;

        // Очищаем контейнер перед созданием
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

    // Обновление активного состояния пагинации
    function updateCustomPagination(swiperInstance) {
        const bullets = document.querySelectorAll('.pagination-bullet');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === swiperInstance.activeIndex);
        });
    }

    // Обновление счетчика слайдов
    function updateSlideCounter(swiperInstance) {
        const currentSlide = document.getElementById('current-slide');
        const totalSlides = document.getElementById('total-slides');

        if (currentSlide && totalSlides) {
            currentSlide.textContent = String(swiperInstance.activeIndex + 1).padStart(2, '0');
            totalSlides.textContent = String(swiperInstance.slides.length).padStart(2, '0');
        }
    }

    // Обновление состояния навигационных стрелок
    function updateNavigationState(swiperInstance) {
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');

        if (prevArrow && nextArrow) {
            prevArrow.classList.toggle('disabled', swiperInstance.isBeginning);
            nextArrow.classList.toggle('disabled', swiperInstance.isEnd);
        }
    }

    // Обработчики для кастомных стрелок
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

    // Загрузка изображений с эффектом
    function loadImages() {
        const images = document.querySelectorAll('.swiper-slide img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.onload = function () {
                    this.classList.add('loaded');
                };
                // Обработка ошибок загрузки
                img.onerror = function () {
                    console.warn('Не удалось загрузить изображение:', this.src);
                    this.style.display = 'none';
                };
            }
        });
    }

    // Клавиатурное управление
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            swiper.slideNext();
        }
    });

    // Поддержка свайпов на мобильных устройствах
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

    // Expose swiper instance globally for debugging (optional)
    window.gallerySwiper = swiper;
});