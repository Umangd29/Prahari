
let commentsExpanded = false;

function toggleComments() {
    const hiddenComments = document.querySelectorAll('.hidden-comments');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    if (!commentsExpanded) {
        hiddenComments.forEach(comment => {
            comment.classList.remove('hidden-comments');
            comment.classList.add('show-comments');
        });
        seeMoreBtn.textContent = 'Show less';
        commentsExpanded = true;
    } else {
        hiddenComments.forEach(comment => {
            comment.classList.add('hidden-comments');
            comment.classList.remove('show-comments');
        });
        seeMoreBtn.textContent = 'See more';
        commentsExpanded = false;
    }
}

// Add smooth scrolling and interactive effects
document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for movie cards
    window.addEventListener('scroll', function () {
        const movieCards = document.querySelectorAll('.movie-card');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;

        movieCards.forEach(card => {
            const cardTop = card.offsetTop;
            if (scrolled > cardTop - window.innerHeight) {
                card.style.transform = `translateY(${rate}px)`;
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

class InteractiveMap {
    constructor() {
        this.mapImage = document.getElementById('mapImage');
        this.mapViewport = document.getElementById('mapViewport');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.resetBtn = document.getElementById('resetView');
        this.zoomLevelDisplay = document.getElementById('zoomLevel');
        this.coordinatesDisplay = document.getElementById('coordinates');

        this.scale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.translateX = 0;
        this.translateY = 0;

        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.lastTranslateX = 0;
        this.lastTranslateY = 0;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.updateDisplay();
    }

    addEventListeners() {
        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetBtn.addEventListener('click', () => this.resetView());

        // Mouse wheel zoom
        this.mapViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.zoom(this.scale + delta, e.clientX, e.clientY);
        });

        // Mouse drag
        this.mapViewport.addEventListener('mousedown', (e) => this.startDrag(e));
        this.mapViewport.addEventListener('mousemove', (e) => this.drag(e));
        this.mapViewport.addEventListener('mouseup', () => this.endDrag());
        this.mapViewport.addEventListener('mouseleave', () => this.endDrag());

        // Touch events for mobile
        this.mapViewport.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        this.mapViewport.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.drag(e.touches[0]);
        });
        this.mapViewport.addEventListener('touchend', () => this.endDrag());

        // Double click to zoom
        this.mapViewport.addEventListener('dblclick', (e) => {
            this.zoom(this.scale * 1.5, e.clientX, e.clientY);
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.lastTranslateX = this.translateX;
        this.lastTranslateY = this.translateY;
        this.mapViewport.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;

        this.translateX = this.lastTranslateX + deltaX;
        this.translateY = this.lastTranslateY + deltaY;

        this.updateTransform();
        this.updateCoordinates();
    }

    endDrag() {
        this.isDragging = false;
        this.mapViewport.style.cursor = 'grab';
    }

    zoomIn() {
        this.zoom(this.scale * 1.2);
    }

    zoomOut() {
        this.zoom(this.scale / 1.2);
    }

    zoom(newScale, centerX = null, centerY = null) {
        const oldScale = this.scale;
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, newScale));

        if (centerX !== null && centerY !== null) {
            // Zoom towards the mouse position
            const rect = this.mapViewport.getBoundingClientRect();
            const x = centerX - rect.left - rect.width / 2;
            const y = centerY - rect.top - rect.height / 2;

            const scaleChange = this.scale / oldScale;
            this.translateX = this.translateX - x * (scaleChange - 1);
            this.translateY = this.translateY - y * (scaleChange - 1);
        }

        this.updateTransform();
        this.updateDisplay();
    }

    resetView() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
        this.updateDisplay();
    }

    updateTransform() {
        const transform = `translate(-50%, -50%) translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        this.mapImage.style.transform = transform;
    }

    updateDisplay() {
        this.zoomLevelDisplay.textContent = `Zoom: ${Math.round(this.scale * 100)}%`;
        this.updateCoordinates();
    }

    updateCoordinates() {
        const x = Math.round(-this.translateX);
        const y = Math.round(-this.translateY);
        this.coordinatesDisplay.textContent = `Position: (${x}, ${y})`;
    }
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveMap();

    // Add some interactive features to the map markers
    const features = document.querySelectorAll('.map-feature');
    features.forEach(feature => {
        feature.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = feature.getAttribute('title');
            alert(`You clicked on: ${title}`);
        });
    });
});