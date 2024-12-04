document.addEventListener('DOMContentLoaded', () => {
    const openLetterBtn = document.getElementById('openLetterBtn');
    const letter = document.querySelector('.letter');
    const envelopeContainer = document.querySelector('.envelope');
    const photosSection = document.getElementById('photosSection');
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    const fileInput = document.getElementById('fileInput');
    const carousel = document.querySelector('.carousel');

    let currentSlideIndex = 0;

    openLetterBtn.addEventListener('click', () => {
        // Animação da carta
        letter.classList.add('opened');
        
        // Criar corações flutuantes
        for (let i = 0; i < 10; i++) {
            createHeart();
        }

        // Esconder envelope e mostrar seção de fotos
        setTimeout(() => {
            envelopeContainer.classList.add('hidden');
            photosSection.classList.remove('hidden');
        }, 1500);
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    addPhotoBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        
        for (let file of files) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                carousel.appendChild(img);
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Navegação vertical do carrossel
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            navigateCarousel(1);
        } else if (event.key === 'ArrowUp') {
            navigateCarousel(-1);
        }
    });

    function navigateCarousel(direction) {
        const images = carousel.querySelectorAll('img');
        
        if (images.length === 0) return;

        currentSlideIndex = (currentSlideIndex + direction + images.length) % images.length;
        
        const offset = -currentSlideIndex * 100;
        carousel.style.transform = `translateY(${offset}%)`;
    }
});