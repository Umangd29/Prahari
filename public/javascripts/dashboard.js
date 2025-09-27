document.addEventListener("DOMContentLoaded", () => {
    // Enhanced dashboard functionality
    const dashboardPage = document.querySelector(".dashboard-page");
    if (!dashboardPage) return;

    // Search functionality
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", (e) => {
            const value = searchInput.value.trim();
            if (value) {
                console.log("Searching for:", value);
                // Add search logic here
            }
        });

        // Enter key search
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchBtn.click();
            }
        });
    }

    // Filter dropdowns
    const dropdowns = document.querySelectorAll(".filter-dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", () => {
            console.log("Filter changed:", dropdown.name, dropdown.value);
            // Add filter logic here
        });
    });

    // Report card interactions
    const reportCards = document.querySelectorAll(".report-card");
    reportCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.classList.add("in-view");
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const fadeElements = document.querySelectorAll(".animate-fade-up");
    fadeElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });

    // Marquee pause on hover
    const marqueeContainer = document.querySelector(".marquee-container");
    const marqueeContent = document.querySelector(".marquee-content");

    if (marqueeContainer && marqueeContent) {
        marqueeContainer.addEventListener("mouseenter", () => {
            marqueeContent.style.animationPlayState = "paused";
        });

        marqueeContainer.addEventListener("mouseleave", () => {
            marqueeContent.style.animationPlayState = "running";
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        }

        lastScroll = currentScroll;
    });

    // Emergency button pulse effect
    const emergencyBtn = document.querySelector(".post-report-btn");
    if (emergencyBtn) {
        setInterval(() => {
            emergencyBtn.style.boxShadow = "0 6px 30px rgba(255, 68, 68, 0.6)";
            setTimeout(() => {
                emergencyBtn.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
            }, 1000);
        }, 3000);
    }

    // Priority badge animations
    const priorityBadges = document.querySelectorAll(".priority-badge");
    priorityBadges.forEach(badge => {
        if (badge.textContent.includes("High")) {
            badge.style.animation = "pulse 2s infinite";
        }
    });

    // Add pulse keyframes dynamically
    const style = document.createElement("style");
    style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `;
    document.head.appendChild(style);

    // Add floating animation to play icon
    const playIcon = document.querySelector(".play-icon");
    if (playIcon) {
        playIcon.style.animation = "float 3s ease-in-out infinite";
    }

    // Smooth scroll for anchor links
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

    // Loading states for buttons
    const buttons = document.querySelectorAll("button, .btn");
    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            if (!this.classList.contains("loading")) {
                this.classList.add("loading");
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

                // Simulate loading (remove this in production)
                setTimeout(() => {
                    this.classList.remove("loading");
                    this.innerHTML = originalText;
                }, 1500);
            }
        });
    });

    // Add loading styles
    const loadingStyle = document.createElement("style");
    loadingStyle.textContent = `
                .loading {
                    pointer-events: none;
                    opacity: 0.7;
                }
            `;
    document.head.appendChild(loadingStyle);

    // Real-time clock for demo
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: true
        });

        // You can add this to show real-time in the header
        const clockElement = document.querySelector('.real-time-clock');
        if (clockElement) {
            clockElement.textContent = `IST: ${timeString}`;
        }
    }

    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // Console log for demo purposes
    console.log("🌊 Prahari Ocean Hazard Monitoring System Loaded");
    console.log("🚀 Enhanced dashboard with professional styling active");
    console.log("⚡ All interactive features initialized");
});