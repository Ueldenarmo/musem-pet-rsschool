(function () {
    'use strict';

    const imageData = [
        { src: 'assets/img/galery/galery1.jpg', alt: 'Gallery Picture 1' },
        { src: 'assets/img/galery/galery2.jpg', alt: 'Gallery Picture 2' },
        { src: 'assets/img/galery/galery3.jpg', alt: 'Gallery Picture 3' },
        { src: 'assets/img/galery/galery4.jpg', alt: 'Gallery Picture 4' },
        { src: 'assets/img/galery/galery5.jpg', alt: 'Gallery Picture 5' },
        { src: 'assets/img/galery/galery6.jpg', alt: 'Gallery Picture 6' },
        { src: 'assets/img/galery/galery7.jpg', alt: 'Gallery Picture 7' },
        { src: 'assets/img/galery/galery8.jpg', alt: 'Gallery Picture 8' },
        { src: 'assets/img/galery/galery9.jpg', alt: 'Gallery Picture 9' },
        { src: 'assets/img/galery/galery10.jpg', alt: 'Gallery Picture 10' },
        { src: 'assets/img/galery/galery11.jpg', alt: 'Gallery Picture 11' },
        { src: 'assets/img/galery/galery12.jpg', alt: 'Gallery Picture  12' },
        { src: 'assets/img/galery/galery13.jpg', alt: 'Gallery Picture  13' },
        { src: 'assets/img/galery/galery14.jpg', alt: 'Gallery Picture  14' },
        { src: 'assets/img/galery/galery15.jpg', alt: 'Gallery Picture 15' }
    ];

    function shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function createImage(imageInfo) {
        const img = document.createElement('img');
        img.classList.add('gallery-img');
        img.src = imageInfo.src;
        img.alt = imageInfo.alt;
        img.loading = 'lazy';
        return img;
    }


    function initGallery() {
        const container = document.querySelector('.picture-inner-container');

        if (!container) {
            console.warn('Gallery container not found');
            return;
        }

        container.innerHTML = '';

        const shuffledImages = shuffle(imageData);

        shuffledImages.forEach(imageInfo => {
            const img = createImage(imageInfo);
            container.appendChild(img);
        });

        container.addEventListener('click', function (e) {
            if (e.target.classList.contains('gallery-img')) {
                handleImageClick(e.target);
            }
        });
    }

    function handleImageClick(img) {
        console.log('Clicked on:', img.alt);

        if (img.classList.contains('enlarged')) {
            img.classList.remove('enlarged');
        } else {
            document.querySelectorAll('.gallery-img.enlarged').forEach(el => {
                el.classList.remove('enlarged');
            });
            img.classList.add('enlarged');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

})();