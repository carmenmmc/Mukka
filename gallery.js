document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showModal(currentIndex);
        });
    });

    function showModal(index) {
        const modalContentContainer = document.createElement('div');
        modalContentContainer.classList.add('modal-content-container');
        modal.innerHTML = '';
        modal.appendChild(modalContentContainer);
        modalContentContainer.innerHTML = `
            ${galleryItems[index].querySelector('img, video').outerHTML}
        `;
        // Añadir el atributo "controls" al video
        const video = modal.querySelector('video');
        if (video) {
            video.setAttribute('controls', 'controls');
        }
        
        const imageCountContainer = document.createElement('div');
        imageCountContainer.classList.add('image-count-container');
        modal.appendChild(imageCountContainer);
        imageCountContainer.innerHTML = `
            <span class="prev">&#10094;</span>
            <div class="image-count">${index + 1} / ${galleryItems.length}</div>
            <span class="next">&#10095;</span>
            <span class="close">&times;</span>
        `;
        const modalContent = modal.querySelector('.modal-content-container');
        modalContent.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');

        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeModal();
                stopVideo();
            });
        }

        const prevButton = modal.querySelector('.prev');
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateModalContent(currentIndex);
            });
        }

        const nextButton = modal.querySelector('.next');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateModalContent(currentIndex);
            });
        }

        window.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'Escape') {
                    closeModal();
                }
            }
        });
    }

    function updateModalContent(index) {
        const modalContent = modal.querySelector('.modal-content-container');
        modalContent.innerHTML = `
            ${galleryItems[index].querySelector('img, video').outerHTML}
        `;
        // Añadir el atributo "controls" al video
        const video = modal.querySelector('video');
        if (video) {
            video.setAttribute('controls', 'controls');
        }
        
        const imageCount = modal.querySelector('.image-count');
        if (imageCount) {
            imageCount.textContent = `${index + 1} / ${galleryItems.length}`;
        }
        currentIndex = index; // Sincronizar el índice de la galería con el índice del modal
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalContent(currentIndex);
            event.preventDefault();
        } else if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModalContent(currentIndex);
            event.preventDefault();
        }
    });

    // Función para detener la reproducción del video
    function stopVideo() {
        const video = modal.querySelector('video');
        if (video) {
            video.pause(); // Pausa la reproducción del video
        }
    }
});
