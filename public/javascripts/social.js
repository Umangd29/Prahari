document.addEventListener('DOMContentLoaded', function() {
    const socialPage = document.querySelector('.social-page');
    if (!socialPage) return;

    // Initialize Sentiment Chart
    const sentimentCanvas = socialPage.querySelector('#social-sentimentChart');
    const sentimentChart = new Chart(sentimentCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [{
                data: [25, 45, 30],
                backgroundColor: ['#6a5aa3', '#4b3f72', '#9a8cc0'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // Initialize Trend Timeline Chart
    const trendCanvas = socialPage.querySelector('#social-trendChart');
    const trendChart = new Chart(trendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['02:00', '04:00', '06:00', '08:00', '10:00'],
            datasets: [{
                label: 'Mentions',
                data: [1200, 1800, 1400, 2200, 2800],
                borderColor: '#6a5aa3',
                backgroundColor: 'rgba(106,90,163,0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#e0dff5' } },
                x: { grid: { color: '#e0dff5' } }
            }
        }
    });

    // Function to update Sentiment Chart
    function updateSentimentChart(date, platform, eventType, location) {
        let positive = 25, negative = 45, neutral = 30;

        // Platform influence
        if (platform === 'twitter') { positive += 5; negative -= 5; }
        if (platform === 'facebook') { positive -= 5; negative += 5; }
        if (platform === 'instagram') { positive += 3; neutral -= 3; }
        if (platform === 'linkedin') { positive -= 2; negative += 2; }

        // Event influence
        if (eventType === 'natural') { negative += 5; positive -= 3; }
        if (eventType === 'weather') { negative += 3; neutral -= 2; }
        if (eventType === 'social') { positive += 2; neutral -= 1; }

        // Location influence
        if (location === 'odisha') { positive += 2; negative -= 2; }
        if (location === 'gujarat') { positive += 1; negative -= 1; }
        if (location === 'kerela') { positive += 3; neutral -= 2; }
        if (location === 'bihar') { negative += 2; neutral -= 1; }
        if (location === 'sikkim') { positive += 4; negative -= 2; }

        // Date influence
        if (date === '7') { positive += 2; negative -= 1; }
        if (date === '30') { positive -= 1; negative += 2; }
        if (date === '90') { positive -= 2; negative += 3; }
        if (date === 'custom') { positive += 1; negative += 1; neutral -= 2; }

        sentimentChart.data.datasets[0].data = [positive, negative, neutral];
        sentimentChart.update();
    }

    // Function to update Trend Timeline Chart
    function updateTrendChart(date, platform, eventType, location) {
        // Base mentions
        let baseMentions = [1200, 1800, 1400, 2200, 2800];

        // Platform adjustment
        if (platform === 'twitter') { baseMentions = baseMentions.map(v => v + 200); }
        if (platform === 'facebook') { baseMentions = baseMentions.map(v => v - 100); }
        if (platform === 'instagram') { baseMentions = baseMentions.map(v => v + 150); }
        if (platform === 'linkedin') { baseMentions = baseMentions.map(v => v + 50); }

        // Event adjustment
        if (eventType === 'natural') { baseMentions = baseMentions.map(v => v + 300); }
        if (eventType === 'weather') { baseMentions = baseMentions.map(v => v + 100); }
        if (eventType === 'social') { baseMentions = baseMentions.map(v => v + 50); }

        // Location adjustment
        if (location === 'odisha') { baseMentions = baseMentions.map(v => v + 50); }
        if (location === 'gujarat') { baseMentions = baseMentions.map(v => v + 30); }
        if (location === 'kerela') { baseMentions = baseMentions.map(v => v + 70); }
        if (location === 'bihar') { baseMentions = baseMentions.map(v => v + 40); }
        if (location === 'sikkim') { baseMentions = baseMentions.map(v => v + 20); }

        // Date adjustment
        if (date === '7') { baseMentions = baseMentions.map(v => v + 100); }
        if (date === '30') { baseMentions = baseMentions.map(v => v + 50); }
        if (date === '90') { baseMentions = baseMentions.map(v => v - 50); }
        if (date === 'custom') { baseMentions = baseMentions.map(v => v + 20); }

        trendChart.data.datasets[0].data = baseMentions;
        trendChart.update();
    }

    // Add event listeners for all dropdowns
    const filterIds = ['filter-date', 'filter-platform', 'filter-event', 'filter-location'];
    filterIds.forEach(id => {
        const select = socialPage.querySelector(`#${id}`);
        if (select) {
            select.addEventListener('change', () => {
                const date = socialPage.querySelector('#filter-date').value;
                const platform = socialPage.querySelector('#filter-platform').value;
                const eventType = socialPage.querySelector('#filter-event').value;
                const location = socialPage.querySelector('#filter-location').value;

                updateSentimentChart(date, platform, eventType, location);
                updateTrendChart(date, platform, eventType, location);
            });
        }
    });

    // Search input logging
    const searchInput = socialPage.querySelector('input[placeholder="Search keywords..."]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Searching for:', this.value);
        });
    }

    // Hover effect for keyword/trending items
    socialPage.querySelectorAll('.trending-item, .keyword-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
            item.style.cursor = 'pointer';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });
});
