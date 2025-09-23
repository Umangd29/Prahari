document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.map-page');

    if (!container) return;

    console.log('Emergency Dashboard loaded');

    // Map control functions
    function zoomIn() {
        console.log('Zooming in...');
    }

    function zoomOut() {
        console.log('Zooming out...');
    }

    function resetView() {
        console.log('Resetting view...');
    }

    // Heatmap toggle
    function toggleHeatmap() {
        const toggle = container.querySelector('#heatmapToggle');
        if (toggle.checked) {
            console.log('Heatmap enabled');
        } else {
            console.log('Heatmap disabled');
        }
    }

    // Display toggles
    function toggleReports() { console.log('Toggling reports display'); }
    function toggleHotspots() { console.log('Toggling hotspots display'); }
    function toggleSocialMedia() { console.log('Toggling social media display'); }

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

    // Action button functions
    function verifyReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been verified!`);
        console.log('Report verified');
    }

    function rejectReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been rejected!`);
        console.log('Report rejected');
    }

    function escalateReport() {
        const reportTitle = container.querySelector('#reportTitle').textContent;
        alert(`Report "${reportTitle}" has been escalated!`);
        console.log('Report escalated');
    }

    // Search functionality
    const searchInput = container.querySelector('#locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                console.log(`Searching for: ${searchTerm}`);
                alert(`Searching for location: ${searchTerm}`);
            }
        });
    }

    // Attach map control button events
    const zoomInBtn = container.querySelector('.map-control-btn:nth-child(1)');
    const zoomOutBtn = container.querySelector('.map-control-btn:nth-child(2)');
    const resetBtn = container.querySelector('.map-control-btn:nth-child(3)');

    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
    if (resetBtn) resetBtn.addEventListener('click', resetView);

    // Attach toggle events
    const heatmapToggle = container.querySelector('#heatmapToggle');
    if (heatmapToggle) heatmapToggle.addEventListener('change', toggleHeatmap);

    container.querySelectorAll('.toggle-switch input').forEach(input => {
        const onchangeFn = input.getAttribute('onchange');
        if (onchangeFn && typeof window[onchangeFn] === 'function') {
            input.addEventListener('change', window[onchangeFn]);
        }
    });

    // Set default active marker
    const defaultMarker = container.querySelector('.report-marker.wave');
    if (defaultMarker) selectMarker(defaultMarker);

    // Attach action buttons
    const verifyBtn = container.querySelector('.btn-verify');
    const rejectBtn = container.querySelector('.btn-reject');
    const escalateBtn = container.querySelector('.btn-escalate');

    if (verifyBtn) verifyBtn.addEventListener('click', verifyReport);
    if (rejectBtn) rejectBtn.addEventListener('click', rejectReport);
    if (escalateBtn) escalateBtn.addEventListener('click', escalateReport);

    // Attach marker click events
    container.querySelectorAll('.report-marker').forEach(marker => {
        marker.addEventListener('click', () => selectMarker(marker));
    });
});
