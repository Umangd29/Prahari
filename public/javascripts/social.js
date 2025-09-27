document.addEventListener('DOMContentLoaded', function () {
    const socialPage = document.querySelector('.social-page');
    if (!socialPage) return;

    let sentimentChart, trendChart, platformChart, scatterChart, heatmapChart;

    // Initialize Sentiment Chart
    const sentimentCanvas = socialPage.querySelector('#social-sentimentChart');
    sentimentChart = new Chart(sentimentCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [{
                data: [45, 25, 30],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });

    // Initialize Platform Engagement Chart
    const platformCanvas = socialPage.querySelector('#platformEngagementChart');
    platformChart = new Chart(platformCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok'],
            datasets: [{
                label: 'Engagement Rate',
                data: [85, 72, 68, 45, 38],
                backgroundColor: [
                    'rgba(29, 161, 242, 0.8)',
                    'rgba(24, 119, 242, 0.8)',
                    'rgba(225, 48, 108, 0.8)',
                    'rgba(0, 119, 181, 0.8)',
                    'rgba(37, 244, 238, 0.8)'
                ],
                borderColor: [
                    'rgba(29, 161, 242, 1)',
                    'rgba(24, 119, 242, 1)',
                    'rgba(225, 48, 108, 1)',
                    'rgba(0, 119, 181, 1)',
                    'rgba(37, 244, 238, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#e0dff5' },
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // Initialize Scatter Chart
    const scatterCanvas = socialPage.querySelector('#scatterChart');
    scatterChart = new Chart(scatterCanvas.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Posts',
                data: [
                    { x: 75, y: 1200 }, { x: 45, y: 800 }, { x: 85, y: 1800 },
                    { x: 30, y: 400 }, { x: 92, y: 2200 }, { x: 68, y: 1100 },
                    { x: 55, y: 900 }, { x: 88, y: 1950 }, { x: 38, y: 650 },
                    { x: 72, y: 1350 }, { x: 95, y: 2500 }, { x: 42, y: 750 }
                ],
                backgroundColor: 'rgba(106, 90, 163, 0.6)',
                borderColor: '#6a5aa3',
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Sentiment: ${context.parsed.x}%, Engagement: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Sentiment Score (%)' },
                    grid: { color: '#e0dff5' }
                },
                y: {
                    title: { display: true, text: 'Engagement Count' },
                    grid: { color: '#e0dff5' }
                }
            }
        }
    });

    // Initialize Heatmap Chart (using bar chart to simulate heatmap)
    const heatmapCanvas = socialPage.querySelector('#heatmapChart');
    heatmapChart = new Chart(heatmapCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Activity Level',
                data: [15, 8, 12, 45, 68, 72, 85, 58],
                backgroundColor: function (context) {
                    const value = context.parsed.y;
                    if (value > 70) return 'rgba(220, 53, 69, 0.8)';
                    if (value > 40) return 'rgba(255, 193, 7, 0.8)';
                    return 'rgba(40, 167, 69, 0.8)';
                },
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e0dff5' },
                    title: { display: true, text: 'Activity Intensity' }
                },
                x: {
                    grid: { display: false },
                    title: { display: true, text: 'Time of Day' }
                }
            }
        }
    });

    // Initialize Trend Timeline Chart
    const trendCanvas = socialPage.querySelector('#social-trendChart');
    trendChart = new Chart(trendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Twitter',
                    data: [1200, 1800, 1400, 2200, 2800, 2400, 1900],
                    borderColor: '#1da1f2',
                    backgroundColor: 'rgba(29,161,242,0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Facebook',
                    data: [800, 1200, 1000, 1600, 1400, 1800, 1300],
                    borderColor: '#1877f2',
                    backgroundColor: 'rgba(24,119,242,0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Instagram',
                    data: [600, 900, 800, 1200, 1100, 1400, 1000],
                    borderColor: '#e1306c',
                    backgroundColor: 'rgba(225,48,108,0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e0dff5' },
                    title: { display: true, text: 'Mentions' }
                },
                x: {
                    grid: { color: '#e0dff5' },
                    title: { display: true, text: 'Day of Week' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Update functions
    function updateSentimentChart(date, platform, eventType, location) {
        let positive = 45, negative = 25, neutral = 30;

        // Platform adjustments
        if (platform === 'twitter') { positive += 8; negative -= 5; neutral -= 3; }
        if (platform === 'facebook') { positive -= 5; negative += 8; neutral -= 3; }
        if (platform === 'instagram') { positive += 5; negative -= 2; neutral -= 3; }
        if (platform === 'linkedin') { positive -= 2; negative += 4; neutral -= 2; }

        // Event type adjustments
        if (eventType === 'natural') { negative += 15; positive -= 10; neutral -= 5; }
        if (eventType === 'weather') { negative += 8; positive -= 3; neutral -= 5; }
        if (eventType === 'social') { positive += 10; negative -= 5; neutral -= 5; }

        // Location adjustments
        if (location === 'odisha') { positive += 5; negative -= 3; neutral -= 2; }
        if (location === 'gujarat') { positive += 3; negative -= 2; neutral -= 1; }
        if (location === 'kerela') { positive += 6; negative -= 4; neutral -= 2; }
        if (location === 'bihar') { negative += 8; positive -= 3; neutral -= 5; }
        if (location === 'sikkim') { positive += 8; negative -= 5; neutral -= 3; }

        // Date range adjustments
        if (date === '7') { positive += 3; negative -= 2; neutral -= 1; }
        if (date === '30') { positive -= 2; negative += 3; neutral -= 1; }
        if (date === '90') { positive -= 5; negative += 8; neutral -= 3; }

        // Ensure values are valid and sum to 100
        positive = Math.max(5, Math.min(85, positive));
        negative = Math.max(5, Math.min(85, negative));
        neutral = Math.max(5, Math.min(85, neutral));

        // Normalize to 100%
        const total = positive + negative + neutral;
        positive = Math.round((positive / total) * 100);
        negative = Math.round((negative / total) * 100);
        neutral = 100 - positive - negative;

        sentimentChart.data.datasets[0].data = [positive, negative, neutral];
        sentimentChart.update('active');
    }

    function updatePlatformChart(date, platform, eventType, location) {
        let baseData = [85, 72, 68, 45, 38]; // Twitter, Facebook, Instagram, LinkedIn, TikTok

        // Platform specific boost
        if (platform === 'twitter') {
            baseData[0] += 10; // Boost Twitter
            baseData = baseData.map((v, i) => i === 0 ? v : Math.max(20, v - 5));
        } else if (platform === 'facebook') {
            baseData[1] += 12; // Boost Facebook
            baseData = baseData.map((v, i) => i === 1 ? v : Math.max(20, v - 3));
        } else if (platform === 'instagram') {
            baseData[2] += 15; // Boost Instagram
            baseData = baseData.map((v, i) => i === 2 ? v : Math.max(20, v - 4));
        } else if (platform === 'linkedin') {
            baseData[3] += 20; // Boost LinkedIn
            baseData = baseData.map((v, i) => i === 3 ? v : Math.max(20, v - 2));
        }

        // Event type adjustments
        if (eventType === 'natural') {
            baseData[0] += 8; // Twitter higher for breaking news
            baseData[1] += 5; // Facebook for community
            baseData[2] -= 3; // Instagram lower for disasters
        } else if (eventType === 'weather') {
            baseData[0] += 6; // Twitter for alerts
            baseData[2] += 3; // Instagram for visuals
        } else if (eventType === 'social') {
            baseData[2] += 10; // Instagram higher for social events
            baseData[1] += 8; // Facebook for community events
            baseData[4] += 5; // TikTok for social content
        }

        // Location adjustments
        if (location === 'odisha' || location === 'kerela') {
            baseData = baseData.map(v => v + 3);
        } else if (location === 'gujarat') {
            baseData[3] += 5; // LinkedIn higher in business hub
        } else if (location === 'bihar') {
            baseData = baseData.map(v => Math.max(15, v - 2));
        } else if (location === 'sikkim') {
            baseData[2] += 8; // Instagram higher for scenic content
        }

        // Date range adjustments
        if (date === '7') {
            baseData = baseData.map(v => v + 3);
        } else if (date === '90') {
            baseData = baseData.map(v => Math.max(10, v - 5));
        }

        // Ensure values don't exceed 100
        baseData = baseData.map(v => Math.min(100, Math.max(5, v)));

        platformChart.data.datasets[0].data = baseData;
        platformChart.update('active');
    }

    function updateScatterChart(date, platform, eventType, location) {
        let baseData = [
            { x: 75, y: 1200 }, { x: 45, y: 800 }, { x: 85, y: 1800 },
            { x: 30, y: 400 }, { x: 92, y: 2200 }, { x: 68, y: 1100 },
            { x: 55, y: 900 }, { x: 88, y: 1950 }, { x: 38, y: 650 },
            { x: 72, y: 1350 }, { x: 95, y: 2500 }, { x: 42, y: 750 }
        ];

        // Platform adjustments
        if (platform === 'twitter') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 8),
                y: point.y + 300
            }));
        } else if (platform === 'facebook') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 3),
                y: point.y + 150
            }));
        } else if (platform === 'instagram') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 5),
                y: point.y + 200
            }));
        } else if (platform === 'linkedin') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 5),
                y: Math.max(100, point.y - 100)
            }));
        }

        // Event type adjustments
        if (eventType === 'natural') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 20),
                y: point.y + 500
            }));
        } else if (eventType === 'weather') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 10),
                y: point.y + 250
            }));
        } else if (eventType === 'social') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 10),
                y: point.y + 100
            }));
        }

        // Location adjustments
        if (location === 'odisha') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 3),
                y: point.y + 150
            }));
        } else if (location === 'gujarat') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 5),
                y: point.y + 200
            }));
        } else if (location === 'kerela') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 8),
                y: point.y + 250
            }));
        } else if (location === 'bihar') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 5),
                y: Math.max(100, point.y - 50)
            }));
        } else if (location === 'sikkim') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 12),
                y: point.y + 100
            }));
        }

        // Date range adjustments
        if (date === '7') {
            baseData = baseData.map(point => ({
                x: Math.min(100, point.x + 2),
                y: point.y + 100
            }));
        } else if (date === '90') {
            baseData = baseData.map(point => ({
                x: Math.max(10, point.x - 5),
                y: Math.max(100, point.y - 200)
            }));
        }

        scatterChart.data.datasets[0].data = baseData;
        scatterChart.update('active');
    }

    function updateMetrics(date, platform, eventType, location) {
        let totalPosts = 2400;
        let totalEngagement = 15200;
        let positiveRate = 72;
        let totalReach = 4800000;

        // Platform adjustments
        if (platform === 'twitter') {
            totalPosts += 800;
            totalEngagement += 4000;
            positiveRate += 3;
            totalReach += 1500000;
        } else if (platform === 'facebook') {
            totalPosts += 600;
            totalEngagement += 3500;
            positiveRate -= 2;
            totalReach += 2000000;
        } else if (platform === 'instagram') {
            totalPosts += 400;
            totalEngagement += 5000;
            positiveRate += 8;
            totalReach += 1200000;
        } else if (platform === 'linkedin') {
            totalPosts += 200;
            totalEngagement += 1500;
            positiveRate += 5;
            totalReach += 800000;
        }

        // Event type adjustments
        if (eventType === 'natural') {
            totalPosts += 1200;
            totalEngagement += 8000;
            positiveRate -= 15;
            totalReach += 3000000;
        } else if (eventType === 'weather') {
            totalPosts += 800;
            totalEngagement += 4500;
            positiveRate -= 8;
            totalReach += 1800000;
        } else if (eventType === 'social') {
            totalPosts += 500;
            totalEngagement += 6000;
            positiveRate += 12;
            totalReach += 1000000;
        }

        // Location adjustments
        if (location === 'odisha') {
            totalPosts += 300;
            totalEngagement += 2000;
            positiveRate += 2;
            totalReach += 600000;
        } else if (location === 'gujarat') {
            totalPosts += 500;
            totalEngagement += 3000;
            positiveRate += 4;
            totalReach += 1200000;
        } else if (location === 'kerela') {
            totalPosts += 400;
            totalEngagement += 3500;
            positiveRate += 6;
            totalReach += 900000;
        } else if (location === 'bihar') {
            totalPosts += 200;
            totalEngagement += 1000;
            positiveRate -= 3;
            totalReach += 400000;
        } else if (location === 'sikkim') {
            totalPosts += 150;
            totalEngagement += 800;
            positiveRate += 8;
            totalReach += 300000;
        }

        // Date range adjustments
        if (date === '7') {
            totalPosts += 300;
            totalEngagement += 2000;
            positiveRate += 3;
            totalReach += 500000;
        } else if (date === '30') {
            totalPosts += 100;
            totalEngagement += 800;
            positiveRate += 1;
            totalReach += 200000;
        } else if (date === '90') {
            totalPosts -= 200;
            totalEngagement -= 1000;
            positiveRate -= 2;
            totalReach -= 300000;
        }

        // Ensure positive values and realistic ranges
        totalPosts = Math.max(500, totalPosts);
        totalEngagement = Math.max(1000, totalEngagement);
        positiveRate = Math.max(20, Math.min(95, positiveRate));
        totalReach = Math.max(1000000, totalReach);

        // Update DOM with animated counters
        animateCounter('totalPosts', (totalPosts / 1000).toFixed(1) + 'K');
        animateCounter('totalEngagement', (totalEngagement / 1000).toFixed(1) + 'K');
        animateCounter('avgSentiment', positiveRate + '%');
        animateCounter('reachRate', (totalReach / 1000000).toFixed(1) + 'M');
    }

    function animateCounter(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Event listeners
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
                updatePlatformChart(date, platform, eventType, location);
                updateScatterChart(date, platform, eventType, location);
                updateMetrics(date, platform, eventType, location);
                updateTrendChart(date, platform, eventType, location);
                updateHeatmapChart(date, platform, eventType, location);
                updateWordCloud(date, platform, eventType, location);
                updateInfluencers(date, platform, eventType, location);
            });
        }
    });

    function updateTrendChart(date, platform, eventType, location) {
        let twitterData = [1200, 1800, 1400, 2200, 2800, 2400, 1900];
        let facebookData = [800, 1200, 1000, 1600, 1400, 1800, 1300];
        let instagramData = [600, 900, 800, 1200, 1100, 1400, 1000];

        // Platform specific adjustments
        if (platform === 'twitter') {
            twitterData = twitterData.map(v => v + 800);
            facebookData = facebookData.map(v => Math.max(100, v - 200));
            instagramData = instagramData.map(v => Math.max(50, v - 100));
        } else if (platform === 'facebook') {
            facebookData = facebookData.map(v => v + 600);
            twitterData = twitterData.map(v => Math.max(200, v - 300));
            instagramData = instagramData.map(v => Math.max(100, v - 150));
        } else if (platform === 'instagram') {
            instagramData = instagramData.map(v => v + 500);
            twitterData = twitterData.map(v => Math.max(200, v - 200));
            facebookData = facebookData.map(v => Math.max(150, v - 250));
        } else if (platform === 'linkedin') {
            // LinkedIn would show lower overall numbers
            twitterData = twitterData.map(v => Math.max(300, v - 400));
            facebookData = facebookData.map(v => Math.max(200, v - 300));
            instagramData = instagramData.map(v => Math.max(100, v - 200));
        }

        // Event type adjustments
        if (eventType === 'natural') {
            twitterData = twitterData.map(v => v + 1000);
            facebookData = facebookData.map(v => v + 500);
            instagramData = instagramData.map(v => v + 300);
        } else if (eventType === 'weather') {
            twitterData = twitterData.map(v => v + 600);
            facebookData = facebookData.map(v => v + 400);
            instagramData = instagramData.map(v => v + 200);
        } else if (eventType === 'social') {
            instagramData = instagramData.map(v => v + 700);
            facebookData = facebookData.map(v => v + 500);
            twitterData = twitterData.map(v => v + 300);
        }

        // Location adjustments
        if (location === 'odisha') {
            twitterData = twitterData.map(v => v + 400);
            facebookData = facebookData.map(v => v + 300);
            instagramData = instagramData.map(v => v + 200);
        } else if (location === 'gujarat') {
            twitterData = twitterData.map(v => v + 350);
            facebookData = facebookData.map(v => v + 250);
            instagramData = instagramData.map(v => v + 175);
        } else if (location === 'kerela') {
            twitterData = twitterData.map(v => v + 500);
            facebookData = facebookData.map(v => v + 400);
            instagramData = instagramData.map(v => v + 300);
        } else if (location === 'bihar') {
            twitterData = twitterData.map(v => v + 200);
            facebookData = facebookData.map(v => v + 150);
            instagramData = instagramData.map(v => v + 100);
        } else if (location === 'sikkim') {
            // Sikkim has lower population, so lower numbers
            twitterData = twitterData.map(v => Math.max(300, v + 100));
            facebookData = facebookData.map(v => Math.max(200, v + 75));
            instagramData = instagramData.map(v => v + 150); // Higher due to scenic content
        }

        // Date range adjustments
        if (date === '7') {
            twitterData = twitterData.map(v => v + 200);
            facebookData = facebookData.map(v => v + 150);
            instagramData = instagramData.map(v => v + 100);
        } else if (date === '30') {
            twitterData = twitterData.map(v => v + 100);
            facebookData = facebookData.map(v => v + 75);
            instagramData = instagramData.map(v => v + 50);
        } else if (date === '90') {
            twitterData = twitterData.map(v => Math.max(300, v - 300));
            facebookData = facebookData.map(v => Math.max(200, v - 200));
            instagramData = instagramData.map(v => Math.max(150, v - 150));
        }

        // Update chart data
        trendChart.data.datasets[0].data = twitterData;
        trendChart.data.datasets[1].data = facebookData;
        trendChart.data.datasets[2].data = instagramData;
        trendChart.update('active');
    }

    function updateHeatmapChart(date, platform, eventType, location) {
        let baseData = [15, 8, 12, 45, 68, 72, 85, 58];

        // Platform adjustments
        if (platform === 'twitter') {
            baseData = baseData.map(v => v + 10);
        } else if (platform === 'instagram') {
            // Instagram more active in evening/night
            baseData = baseData.map((v, i) => i >= 5 ? v + 15 : v + 5);
        } else if (platform === 'linkedin') {
            // LinkedIn more active during business hours
            baseData = baseData.map((v, i) => (i >= 2 && i <= 5) ? v + 20 : v);
        }

        // Event type adjustments
        if (eventType === 'natural') {
            baseData = baseData.map(v => v + 20);
        } else if (eventType === 'weather') {
            baseData = baseData.map(v => v + 10);
        }

        // Location adjustments
        if (location === 'odisha' || location === 'kerela') {
            baseData = baseData.map(v => v + 8);
        }

        // Date range adjustments
        if (date === '7') {
            baseData = baseData.map(v => v + 5);
        } else if (date === '90') {
            baseData = baseData.map(v => Math.max(5, v - 10));
        }

        heatmapChart.data.datasets[0].data = baseData;
        heatmapChart.update();
    }

    // Data sets for dynamic content
    const wordCloudData = {
        all: {
            words: ['tsunami', 'high', 'waves', 'Hurricanes', 'Whirlpool', 'Typhoons', 'flooding', 'coastal', 'damage'],
            hashtags: ['#TsunamiAlert: 15.2K', '#FloodWarning: 8.9K', '#CoastalSafety: 6.1K']
        },
        twitter: {
            words: ['breaking', 'alert', 'urgent', 'tsunami', 'evacuation', 'emergency', 'warning', 'disaster', 'safety'],
            hashtags: ['#BreakingNews: 25.3K', '#TsunamiAlert: 18.7K', '#Emergency: 12.4K']
        },
        facebook: {
            words: ['community', 'support', 'help', 'tsunami', 'prayers', 'safe', 'family', 'together', 'strong'],
            hashtags: ['#PrayForSafety: 22.1K', '#CommunitySupport: 16.8K', '#StayStrong: 11.5K']
        },
        instagram: {
            words: ['waves', 'ocean', 'nature', 'powerful', 'tsunami', 'coast', 'beautiful', 'scary', 'dramatic'],
            hashtags: ['#NaturePower: 19.6K', '#OceanWaves: 14.2K', '#TsunamiWatch: 9.8K']
        },
        linkedin: {
            words: ['business', 'impact', 'economy', 'tsunami', 'recovery', 'industry', 'analysis', 'professional', 'corporate'],
            hashtags: ['#BusinessImpact: 8.4K', '#EconomicRecovery: 6.7K', '#IndustryNews: 5.1K']
        },
        natural: {
            words: ['earthquake', 'tsunami', 'disaster', 'natural', 'geological', 'seismic', 'magnitude', 'epicenter', 'aftershocks'],
            hashtags: ['#NaturalDisaster: 28.5K', '#Earthquake: 21.3K', '#TsunamiWarning: 17.9K']
        },
        weather: {
            words: ['storm', 'weather', 'cyclone', 'winds', 'rain', 'forecast', 'meteorology', 'atmospheric', 'climate'],
            hashtags: ['#WeatherAlert: 20.7K', '#StormWatch: 15.4K', '#ClimateChange: 13.2K']
        },
        social: {
            words: ['community', 'people', 'social', 'gathering', 'event', 'celebration', 'festival', 'culture', 'tradition'],
            hashtags: ['#CommunityEvent: 18.9K', '#SocialGathering: 12.6K', '#CulturalFest: 8.3K']
        },
        odisha: {
            words: ['Bhubaneswar', 'Puri', 'Odisha', 'Jagannath', 'coastal', 'Bay of Bengal', 'cyclone', 'temple', 'heritage'],
            hashtags: ['#Odisha: 24.8K', '#Bhubaneswar: 16.2K', '#PuriBeach: 11.7K']
        },
        gujarat: {
            words: ['Ahmedabad', 'Surat', 'Gujarat', 'industrial', 'port', 'Kutch', 'business', 'development', 'growth'],
            hashtags: ['#Gujarat: 22.4K', '#Ahmedabad: 14.9K', '#GujaratGrowth: 9.6K']
        },
        kerela: {
            words: ['Kerala', 'backwaters', 'monsoon', 'spices', 'coconut', 'Kochi', 'Thiruvananthapuram', 'tourism', 'culture'],
            hashtags: ['#Kerala: 26.1K', '#GodsOwnCountry: 18.5K', '#KeralaTourism: 12.8K']
        },
        bihar: {
            words: ['Patna', 'Bihar', 'Ganga', 'floods', 'agriculture', 'rural', 'education', 'development', 'heritage'],
            hashtags: ['#Bihar: 19.3K', '#Patna: 13.7K', '#BiharDevelopment: 8.4K']
        },
        sikkim: {
            words: ['Sikkim', 'Himalaya', 'mountains', 'earthquake', 'border', 'tourism', 'monasteries', 'nature', 'peaceful'],
            hashtags: ['#Sikkim: 15.8K', '#Himalayas: 11.2K', '#SikkimTourism: 7.9K']
        }
    };

    const influencersData = {
        all: [
            { name: '@WeatherAlert', followers: '24.5K', mentions: '892' },
            { name: '@EmergencyNews', followers: '18.2K', mentions: '654' },
            { name: '@DisasterWatch', followers: '15.7K', mentions: '432' }
        ],
        twitter: [
            { name: '@BBCBreaking', followers: '52.1M', mentions: '2.4K' },
            { name: '@CNN', followers: '48.7M', mentions: '1.8K' },
            { name: '@Reuters', followers: '22.9M', mentions: '1.2K' }
        ],
        facebook: [
            { name: 'Local Community Group', followers: '145K', mentions: '3.2K' },
            { name: 'Safety First Page', followers: '89K', mentions: '2.1K' },
            { name: 'Disaster Relief Org', followers: '67K', mentions: '1.7K' }
        ],
        instagram: [
            { name: '@NaturePhotography', followers: '1.2M', mentions: '4.5K' },
            { name: '@TravelSafety', followers: '890K', mentions: '2.8K' },
            { name: '@OceanWatch', followers: '654K', mentions: '1.9K' }
        ],
        linkedin: [
            { name: 'Business Analyst Pro', followers: '78K', mentions: '567' },
            { name: 'Economic Times', followers: '2.1M', mentions: '1.1K' },
            { name: 'Industry Expert', followers: '45K', mentions: '434' }
        ],
        natural: [
            { name: '@GeologyExpert', followers: '156K', mentions: '3.8K' },
            { name: '@SeismicAlert', followers: '203K', mentions: '4.2K' },
            { name: '@EarthquakeWatch', followers: '98K', mentions: '2.1K' }
        ],
        weather: [
            { name: '@WeatherChannel', followers: '4.2M', mentions: '8.9K' },
            { name: '@StormTracker', followers: '892K', mentions: '3.4K' },
            { name: '@MeteoExpert', followers: '567K', mentions: '2.1K' }
        ],
        social: [
            { name: '@CommunityLeader', followers: '234K', mentions: '5.6K' },
            { name: '@SocialActivist', followers: '456K', mentions: '4.2K' },
            { name: '@LocalInfluencer', followers: '123K', mentions: '2.8K' }
        ],
        odisha: [
            { name: '@OdishaGov', followers: '1.2M', mentions: '6.7K' },
            { name: '@BhubaneswarBuzz', followers: '345K', mentions: '3.4K' },
            { name: '@PuriUpdates', followers: '189K', mentions: '2.1K' }
        ],
        gujarat: [
            { name: '@GujaratGov', followers: '2.1M', mentions: '8.9K' },
            { name: '@AhmedabadTimes', followers: '567K', mentions: '4.2K' },
            { name: '@SuratNews', followers: '298K', mentions: '2.8K' }
        ],
        kerela: [
            { name: '@KeralaGov', followers: '1.8M', mentions: '7.8K' },
            { name: '@KochiDaily', followers: '432K', mentions: '3.9K' },
            { name: '@MalayalamNews', followers: '654K', mentions: '4.5K' }
        ],
        bihar: [
            { name: '@BiharGov', followers: '987K', mentions: '4.5K' },
            { name: '@PatnaNews', followers: '234K', mentions: '2.1K' },
            { name: '@BiharToday', followers: '345K', mentions: '2.8K' }
        ],
        sikkim: [
            { name: '@SikkimGov', followers: '156K', mentions: '1.2K' },
            { name: '@HimalayaNews', followers: '89K', mentions: '567' },
            { name: '@SikkimTourism', followers: '123K', mentions: '789' }
        ]
    };

    function updateWordCloud(date, platform, eventType, location) {
        const wordCloudElement = document.getElementById('wordCloud');
        const hashtagBadgesElement = document.getElementById('hashtagBadges');

        // Determine which data to use based on filters
        let dataKey = 'all';
        if (platform !== 'all') dataKey = platform;
        else if (eventType !== 'all') dataKey = eventType;
        else if (location !== 'all') dataKey = location;

        const data = wordCloudData[dataKey] || wordCloudData.all;

        // Update word cloud
        const sizes = ['word-large', 'word-medium', 'word-medium', 'word-small', 'word-medium', 'word-small', 'word-medium', 'word-medium', 'word-medium'];
        let wordCloudHTML = '';

        data.words.forEach((word, index) => {
            const size = sizes[index] || 'word-small';
            if (index === 2 || index === 5) wordCloudHTML += '<br>';
            wordCloudHTML += `<span class="${size}">${word}</span> `;
        });

        wordCloudElement.innerHTML = wordCloudHTML;

        // Update hashtag badges
        let hashtagHTML = '';
        data.hashtags.forEach(hashtag => {
            hashtagHTML += `<span class="stats-badge">${hashtag}</span>`;
        });

        hashtagBadgesElement.innerHTML = hashtagHTML;

        // Add fade animation
        wordCloudElement.style.opacity = '0';
        hashtagBadgesElement.style.opacity = '0';

        setTimeout(() => {
            wordCloudElement.style.transition = 'opacity 0.5s ease';
            hashtagBadgesElement.style.transition = 'opacity 0.5s ease';
            wordCloudElement.style.opacity = '1';
            hashtagBadgesElement.style.opacity = '1';
        }, 100);
    }

    function updateInfluencers(date, platform, eventType, location) {
        const influencersListElement = document.getElementById('influencersList');

        // Determine which data to use based on filters
        let dataKey = 'all';
        if (platform !== 'all') dataKey = platform;
        else if (eventType !== 'all') dataKey = eventType;
        else if (location !== 'all') dataKey = location;

        const data = influencersData[dataKey] || influencersData.all;

        // Update influencers list
        let influencersHTML = '';
        data.forEach(influencer => {
            influencersHTML += `
                        <div class="trending-item">
                            <div class="trending-avatar"></div>
                            <div class="flex-grow-1">
                                <div class="fw-medium">${influencer.name}</div>
                                <div class="text-muted small">${influencer.followers} followers • ${influencer.mentions} mentions</div>
                            </div>
                        </div>
                    `;
        });

        influencersListElement.innerHTML = influencersHTML;

        // Add fade animation
        influencersListElement.style.opacity = '0';

        setTimeout(() => {
            influencersListElement.style.transition = 'opacity 0.5s ease';
            influencersListElement.style.opacity = '1';

            // Re-add hover effects to new elements
            influencersListElement.querySelectorAll('.trending-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#f8f9fa';
                    item.style.cursor = 'pointer';
                    item.style.transform = 'translateX(5px)';
                    item.style.transition = 'all 0.2s ease';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                    item.style.transform = 'translateX(0)';
                });
            });
        }, 100);
    }

    // Hover effects for interactive elements
    socialPage.querySelectorAll('.trending-item, .keyword-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
            item.style.cursor = 'pointer';
            item.style.transform = 'translateX(5px)';
            item.style.transition = 'all 0.2s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.transform = 'translateX(0)';
        });
    });

    // Add click handlers for metric cards
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Simulate real-time updates
    setInterval(() => {
        const randomValue = Math.floor(Math.random() * 10) - 5;
        const currentData = trendChart.data.datasets[0].data;
        const newData = currentData.map(value => Math.max(100, value + randomValue));
        trendChart.data.datasets[0].data = newData;
        trendChart.update('none');
    }, 30000); // Update every 30 seconds

    // Initialize with a small animation
    setTimeout(() => {
        document.querySelectorAll('.dashboard-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});