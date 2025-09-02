// Video Section JavaScript
(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoSection);
    } else {
        initVideoSection();
    }

    function initVideoSection() {
        // Initialize Swiper only if element exists
        initSwiper();

        // Initialize video player controls
        initVideoControls();

        // Initialize YouTube video loading
        initYouTubeVideos();
    }

    function initSwiper() {
        // Check if Swiper library is loaded and element exists
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper library not loaded');
            return;
        }

        const swiperElement = document.querySelector('.videoSwiper');
        if (!swiperElement) {
            return;
        }

        const swiper = new Swiper('.videoSwiper', {
            slidesPerView: 3,
            spaceBetween: 42,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 42
                }
            }
        });
    }

    function initVideoControls() {
        // Progress bar control
        const progressRange = document.getElementById('progressRange');
        const progressFill = document.querySelector('.progress-fill');

        if (progressRange && progressFill) {
            progressRange.addEventListener('input', function () {
                progressFill.style.width = this.value + '%';
            });
        }

        // Volume control
        const volumeRange = document.getElementById('volumeRange');
        const volumeFill = document.querySelector('.volume-fill');
        const volumeIcon = document.querySelector('.volume-icon');
        let previousVolume = 50;

        if (volumeRange && volumeFill) {
            volumeRange.addEventListener('input', function () {
                volumeFill.style.width = this.value + '%';
                updateVolumeIcon(this.value);
            });
        }

        // Volume icon click - mute/unmute
        if (volumeIcon && volumeRange && volumeFill) {
            volumeIcon.addEventListener('click', function () {
                const currentVolume = parseInt(volumeRange.value);

                if (currentVolume === 0) {
                    // Unmute - restore previous volume
                    volumeRange.value = previousVolume;
                    volumeFill.style.width = previousVolume + '%';
                    updateVolumeIcon(previousVolume);
                } else {
                    // Mute - save current volume and set to 0
                    previousVolume = currentVolume;
                    volumeRange.value = 0;
                    volumeFill.style.width = '0%';
                    updateVolumeIcon(0);
                }
            });
        }

        // Main video play button
        const mainPlayBtn = document.querySelector('.play-button-main');
        if (mainPlayBtn) {
            mainPlayBtn.addEventListener('click', function () {
                console.log('Main video play clicked');
                // Add your main video play logic here
            });
        }

        // Play/Pause button
        const playPauseBtn = document.querySelector('.play-pause-btn');
        let isPlaying = false;

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                isPlaying = !isPlaying;

                const playIcon = this.querySelector('.play-icon');
                if (playIcon) {
                    if (isPlaying) {
                        // Change to pause icon
                        playIcon.style.cssText = 'width: 20px; height: 20px; border: none; background: linear-gradient(to right, #fff 35%, transparent 35%, transparent 65%, #fff 65%);';
                    } else {
                        // Change back to play icon
                        playIcon.style.cssText = 'width: 0; height: 0; border-left: 15px solid #fff; border-top: 10px solid transparent; border-bottom: 10px solid transparent; background: none;';
                    }
                }

                console.log(isPlaying ? 'Playing' : 'Paused');
            });
        }

        // Fullscreen button
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function () {
                const videoContainer = document.querySelector('.main-video-container');
                if (!videoContainer) return;

                if (!document.fullscreenElement) {
                    // Enter fullscreen
                    if (videoContainer.requestFullscreen) {
                        videoContainer.requestFullscreen();
                    } else if (videoContainer.webkitRequestFullscreen) {
                        videoContainer.webkitRequestFullscreen();
                    } else if (videoContainer.msRequestFullscreen) {
                        videoContainer.msRequestFullscreen();
                    }
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        }
    }

    function initYouTubeVideos() {
        // Handle video thumbnail clicks - Load YouTube video on demand
        const playButtons = document.querySelectorAll('.video-play-btn');

        playButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();

                const slide = this.closest('.video-slide');
                if (!slide) return;

                const thumbnail = slide.querySelector('.video-thumbnail img');
                const iframe = slide.querySelector('iframe');

                if (!iframe) return;

                // Check if iframe src needs to be set from data-src
                if (!iframe.src && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }

                // Hide thumbnail and play button
                if (thumbnail) {
                    thumbnail.style.display = 'none';
                }
                this.style.display = 'none';

                // Show iframe
                iframe.style.display = 'block';

                // Add autoplay parameter to iframe src if not already present
                setTimeout(function () {
                    if (iframe.src && !iframe.src.includes('autoplay=1')) {
                        const separator = iframe.src.includes('?') ? '&' : '?';
                        iframe.src = iframe.src + separator + 'autoplay=1';
                    }
                }, 100);
            });
        });
    }

    function updateVolumeIcon(volume) {
        const volumeIcon = document.querySelector('.volume-icon');
        if (!volumeIcon) return;

        const volumeValue = parseInt(volume);

        if (volumeValue === 0) {
            // Muted icon
            volumeIcon.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5V9.27l5.25 5.25c-.83.66-1.75 1.18-2.75 1.45v2.06c1.65-.29 3.16-.99 4.47-2.02l2.76 2.76 1.27-1.27L4.27 3zm7.73 10.27L12 17l-3-3v-.73l3-3v2.73z"/></svg>\')';
        } else if (volumeValue < 50) {
            // Low volume icon
            volumeIcon.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M7 9v6h4l5 5V4L11 9H7zm9.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>\')';
        } else {
            // Normal volume icon
            volumeIcon.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>\')';
        }
    }

})();