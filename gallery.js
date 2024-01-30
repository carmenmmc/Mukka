document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    let currentIndex = 0;

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            currentIndex = index;
            showModal(currentIndex);
        });
    });

    function showModal(index) {
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img class="modal-content" src="${images[index].src}">
            <div class="image-count-container">
                <span class="prev">&#10094;</span>
                <div class="image-count">${index + 1} / ${images.length}</div>
                <span class="next">&#10095;</span>
            </div>
        `;
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.add('show'); // Aquí se aplica la clase 'show'
        modal.style.display = 'block';
        document.body.classList.add('modal-open');    

        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });

        const prevButton = modal.querySelector('.prev');
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModalContent(currentIndex);
        });

        const nextButton = modal.querySelector('.next');
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateModalContent(currentIndex);
        });

        window.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateModalContent(currentIndex);
                    event.preventDefault();
                } else if (event.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateModalContent(currentIndex);
                    event.preventDefault();
                }
            }
        });
    }

    function updateModalContent(index) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.src = images[index].src;

        const imageCount = modal.querySelector('.image-count');
        imageCount.textContent = `${index + 1} / ${images.length}`;
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
});
