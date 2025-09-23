document.addEventListener("DOMContentLoaded", () => {
    // Limit scope to dashboard page only
    const dashboardPage = document.querySelector(".dashboard-page");
    if (!dashboardPage) return; // don’t run if not on dashboard

    // Example: search input + button
    const searchInput = dashboardPage.querySelector(".filter-part-text-1 input");
    const searchBtn = dashboardPage.querySelector(".filter-part-text-1 button");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const value = searchInput.value.trim();
            if (value) {
                console.log("Searching for:", value);
                // Here you can add fetch or redirect logic
            }
        });
    }

    // Example: filter dropdowns
    const dropdowns = dashboardPage.querySelectorAll(".filter-dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", () => {
            console.log("Filter changed:", dropdown.value);
        });
    });

    // Example: report cards open buttons
    const openBtns = dashboardPage.querySelectorAll(".report-card .play-btn");
    openBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Report opened");
            // redirect or modal open logic here
        });
    });

    // Optional: animation on scroll
    const fadeElements = dashboardPage.querySelectorAll(".animate-fade-up");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
