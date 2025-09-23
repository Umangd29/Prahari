document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.map-page');
    if (!container) return;

    const mapPlaceholder = container.querySelector('.map-placeholder');
    let zoomLevel = 1;
    const zoomStep = 0.2;
    const minZoom = 0.5;
    const maxZoom = 3;

    function applyZoom() {
        mapPlaceholder.style.transform = `scale(${zoomLevel})`;
        mapPlaceholder.style.transformOrigin = "center center";
    }

    // Zoom In
    function zoomIn() {
        if (zoomLevel < maxZoom) {
            zoomLevel += zoomStep;
            applyZoom();
            console.log(`Zoomed In: ${zoomLevel.toFixed(1)}x`);
        }
    }

    // Zoom Out
    function zoomOut() {
        if (zoomLevel > minZoom) {
            zoomLevel -= zoomStep;
            applyZoom();
            console.log(`Zoomed Out: ${zoomLevel.toFixed(1)}x`);
        }
    }

    // Reset
    function resetView() {
        zoomLevel = 1;
        applyZoom();
        console.log("View Reset");
    }

    // Heatmap toggle
    function toggleHeatmap() {
        const toggle = container.querySelector('#heatmapToggle');
        console.log(toggle.checked ? 'Heatmap enabled' : 'Heatmap disabled');
    }

    // Marker selection
    function selectMarker(marker) {
        container.querySelectorAll('.report-marker').forEach(m => m.classList.remove('active'));
        marker.classList.add('active');

        const reportType = marker.getAttribute('data-report');
        const reportTitleEl = container.querySelector('#reportTitle');
        const reportTimeEl = container.querySelector('#reportTime');
        const reportDescriptionEl = container.querySelector('#reportDescription');

        reportTitleEl.textContent = reportType;

        const reportDetails = {
            'High Wave Report': { time: 'Apr 5, 18:23', description: 'High waves observed in the area since 5:00 PM' },
            'Fire Alert': { time: 'Apr 5, 17:45', description: 'Fire reported in residential area, emergency services dispatched' },
            'Emergency Alert': { time: 'Apr 5, 16:30', description: 'General emergency alert issued for the region' },
            'Social Media Report': { time: 'Apr 5, 15:15', description: 'Multiple social media reports of unusual activity' },
            'Citizen Report': { time: 'Apr 5, 14:00', description: 'Citizen-reported incident requiring verification' }
        };

        const details = reportDetails[reportType];
        if (details) {
            reportTimeEl.textContent = details.time;
            reportDescriptionEl.textContent = details.description;
        }
    }

    // Action buttons
    function verifyReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been verified!`);
    }
    function rejectReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been rejected!`);
    }
    function escalateReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been escalated!`);
    }

    // Search input
    const searchInput = container.querySelector('#locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                console.log(`Searching for: ${searchTerm}`);
                alert(`Searching for location: ${searchTerm}`);
            }
        });
    }

    // Attach map control events
    container.querySelector('#zoomInBtn')?.addEventListener('click', zoomIn);
    container.querySelector('#zoomOutBtn')?.addEventListener('click', zoomOut);
    container.querySelector('#resetBtn')?.addEventListener('click', resetView);

    // Toggles
    container.querySelector('#heatmapToggle')?.addEventListener('change', toggleHeatmap);

    // Markers
    container.querySelectorAll('.report-marker').forEach(marker => {
        marker.addEventListener('click', () => selectMarker(marker));
    });
    const defaultMarker = container.querySelector('.report-marker.wave');
    if (defaultMarker) selectMarker(defaultMarker);

    // Action buttons
    container.querySelector('#verifyBtn')?.addEventListener('click', verifyReport);
    container.querySelector('#rejectBtn')?.addEventListener('click', rejectReport);
    container.querySelector('#escalateBtn')?.addEventListener('click', escalateReport);

    // Initial zoom setup
    applyZoom();
});
