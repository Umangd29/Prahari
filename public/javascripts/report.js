// Report-specific JavaScript with prefixed variables and functions
let reportCommentsExpanded = false;

function reportToggleComments() {
    const hiddenComments = document.querySelectorAll('.report-hidden-comments');
    const seeMoreBtn = document.getElementById('reportSeeMoreBtn');
    const icon = seeMoreBtn.querySelector('i');

    if (!reportCommentsExpanded) {
        hiddenComments.forEach(comment => {
            comment.classList.remove('report-hidden-comments');
            comment.classList.add('report-show-comments');
        });
        seeMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Comments';
        reportCommentsExpanded = true;
    } else {
        hiddenComments.forEach(comment => {
            comment.classList.add('report-hidden-comments');
            comment.classList.remove('report-show-comments');
        });
        seeMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> See More Comments';
        reportCommentsExpanded = false;
    }
}

// Enhanced Report Interactive Map Class
class ReportInteractiveMap {
    constructor() {
        this.mapImage = document.getElementById('reportMapImage');
        this.mapViewport = document.getElementById('reportMapViewport');
        this.zoomInBtn = document.getElementById('reportZoomIn');
        this.zoomOutBtn = document.getElementById('reportZoomOut');
        this.resetBtn = document.getElementById('reportResetView');
        this.zoomLevelDisplay = document.getElementById('reportZoomLevel');
        this.coordinatesDisplay = document.getElementById('reportCoordinates');

        this.scale = 3;
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
        this.scale = 3;
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

// Enhanced Report Page Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the interactive map
    new ReportInteractiveMap();

    // Star rating functionality
    const reportStars = document.querySelectorAll('.report-star');
    reportStars.forEach((star, index) => {
        star.addEventListener('click', function () {
            reportStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            console.log(`Report rated: ${index + 1} stars`);
        });

        star.addEventListener('mouseenter', function () {
            reportStars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = '#d1d5db';
                }
            });
        });
    });

    // Reset star colors on mouse leave
    document.querySelector('.report-star-rating').addEventListener('mouseleave', function () {
        reportStars.forEach((star) => {
            if (star.classList.contains('active')) {
                star.style.color = '#fbbf24';
            } else {
                star.style.color = '#d1d5db';
            }
        });
    });

    // Action button interactions with ripple effect
    const reportActionBtns = document.querySelectorAll('.report-action-btn');
    reportActionBtns.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add ripple effect
            this.classList.add('report-ripple');
            setTimeout(() => {
                this.classList.remove('report-ripple');
            }, 600);

            // Handle specific actions
            if (this.classList.contains('report-action-btn-like')) {
                const currentText = this.innerHTML;
                if (currentText.includes('Like (')) {
                    const count = parseInt(currentText.match(/\d+/)[0]) + 1;
                    this.innerHTML = `<i class="fas fa-heart"></i> Liked (${count})`;
                    this.style.background = 'var(--report-danger-gradient)';
                }
            }
        });
    });

    // Enhanced hover effects for report cards
    const reportCommentCards = document.querySelectorAll('.report-comment-card');
    reportCommentCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation on page load
    const reportPageBody = document.querySelector('.report-page-body');
    reportPageBody.style.opacity = '0';
    setTimeout(() => {
        reportPageBody.style.transition = 'opacity 0.8s ease';
        reportPageBody.style.opacity = '1';
    }, 100);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Alert banner auto-hide after 10 seconds
    const reportAlertBanner = document.querySelector('.report-alert-banner');
    if (reportAlertBanner) {
        setTimeout(() => {
            reportAlertBanner.style.transition = 'all 0.5s ease';
            reportAlertBanner.style.transform = 'translateY(-100%)';
            reportAlertBanner.style.opacity = '0';
            setTimeout(() => {
                reportAlertBanner.style.display = 'none';
            }, 500);
        }, 10000);
    }

    // Enhanced comment interaction
    const reportCommentTexts = document.querySelectorAll('.report-comment-text');
    reportCommentTexts.forEach(text => {
        if (text.textContent.length > 200) {
            const fullText = text.textContent;
            const shortText = fullText.substring(0, 150) + '...';
            text.textContent = shortText;

            const readMoreBtn = document.createElement('span');
            readMoreBtn.textContent = ' Read more';
            readMoreBtn.style.color = '#667eea';
            readMoreBtn.style.cursor = 'pointer';
            readMoreBtn.style.fontWeight = '600';

            readMoreBtn.addEventListener('click', function () {
                if (text.textContent === shortText) {
                    text.textContent = fullText;
                    readMoreBtn.textContent = ' Show less';
                } else {
                    text.textContent = shortText;
                    readMoreBtn.textContent = ' Read more';
                }
            });

            text.appendChild(readMoreBtn);
        }
    });


});

