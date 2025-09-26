
// Application state
let uploadedFiles = [];
let reportCounter = 16; // Starting from 16 for demo

// Tab management
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').style.display = 'block';

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// File upload handling
document.getElementById('fileUploadArea').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

document.getElementById('fileUploadArea').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
});

document.getElementById('fileUploadArea').addEventListener('dragleave', (e) => {
    e.currentTarget.classList.remove('dragover');
});

document.getElementById('fileUploadArea').addEventListener('drop', (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    handleFileSelect({ target: { files: e.dataTransfer.files } });
});

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
        if (file.size > maxSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return;
        }

        if (uploadedFiles.find(f => f.name === file.name)) {
            alert(`File "${file.name}" is already uploaded.`);
            return;
        }

        uploadedFiles.push(file);
        displayUploadedFile(file);
    });
}

function displayUploadedFile(file) {
    const filesContainer = document.getElementById('uploadedFiles');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';

    const fileInfo = document.createElement('div');
    fileInfo.innerHTML = `
                <i class="fas fa-file me-2"></i>
                <strong>${file.name}</strong> 
                <small class="text-muted">(${(file.size / 1024 / 1024).toFixed(2)} MB)</small>
            `;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-outline-danger';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.onclick = () => removeFile(file.name, fileItem);

    fileItem.appendChild(fileInfo);
    fileItem.appendChild(removeBtn);
    filesContainer.appendChild(fileItem);
}

function removeFile(fileName, element) {
    uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
    element.remove();
}

// Form submission
document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const category = document.getElementById('violation-category').value;
    const description = document.getElementById('description').value;
    const anonymous = document.getElementById('anonymous-report').checked;
    const termsAgreed = document.getElementById('terms-agreement').checked;

    if (!category || !description || !termsAgreed) {
        alert('Please fill in all required fields and agree to the terms.');
        return;
    }

    if (description.length < 50) {
        alert('Please provide a more detailed description (minimum 50 characters).');
        return;
    }

    // Simulate report submission
    const reportId = `RPT-2024-${String(reportCounter).padStart(4, '0')}`;
    reportCounter++;

    // Show success modal
    document.getElementById('reportId').textContent = reportId;
    new bootstrap.Modal(document.getElementById('successModal')).show();

    // Add to history
    addToHistory(reportId, category, description);

    // Reset form
    setTimeout(() => {
        resetForm();
    }, 2000);
});

function addToHistory(reportId, category, description) {
    const historyContainer = document.getElementById('reportHistory');
    const historyItem = document.createElement('div');
    historyItem.className = 'report-history-item';

    historyItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">Report #${reportId}</h6>
                        <span class="report-status status-pending">Pending</span>
                    </div>
                    <small class="text-muted">Just now</small>
                </div>
                <p class="mb-2"><strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}</p>
                <p class="mb-0 text-muted">${description.substring(0, 100)}...</p>
            `;

    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
}

// Reset form
function resetForm() {
    document.getElementById('reportForm').reset();
    uploadedFiles = [];
    document.getElementById('uploadedFiles').innerHTML = '';
}

// Track report
function trackReport() {
    const reportId = document.getElementById('report-id-search').value.trim();

    if (!reportId) {
        alert('Please enter a report ID.');
        return;
    }

    // Simulate tracking (in real app, this would be an API call)
    const trackingResult = document.getElementById('trackingResult');
    const trackingDetails = document.getElementById('trackingDetails');

    // Mock data based on report ID
    const statuses = ['Pending', 'Under Review', 'Resolved', 'Rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    trackingDetails.innerHTML = `
                <strong>Report ID:</strong> ${reportId}<br>
                <strong>Status:</strong> <span class="report-status status-${randomStatus.toLowerCase().replace(' ', '-')}">${randomStatus}</span><br>
                <strong>Last Updated:</strong> ${new Date().toLocaleDateString()}<br>
                <strong>Estimated Resolution:</strong> 24-48 hours
            `;

    trackingResult.style.display = 'block';
}

// Show terms modal
function showTermsModal() {
    new bootstrap.Modal(document.getElementById('termsModal')).show();
}

// Initialize tooltips and other Bootstrap components
document.addEventListener('DOMContentLoaded', function () {
    // Auto-populate post information (in real app, this would come from URL parameters or API)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('postId')) {
        document.getElementById('post-id').textContent = urlParams.get('postId');
    }
    if (urlParams.get('postTitle')) {
        document.getElementById('post-title').textContent = urlParams.get('postTitle');
    }

    // Show report tab by default
    showTab('report');

    // Character counter for description
    const descriptionField = document.getElementById('description');
    const charCounter = document.createElement('div');
    charCounter.className = 'form-text text-end';
    charCounter.id = 'charCounter';
    descriptionField.parentNode.appendChild(charCounter);

    descriptionField.addEventListener('input', function () {
        const count = this.value.length;
        charCounter.textContent = `${count}/1000 characters`;
        charCounter.style.color = count < 50 ? '#DC2626' : count > 900 ? '#D97706' : '#059669';
    });

    // Validate file types
    document.getElementById('fileInput').addEventListener('change', function () {
        const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];
        const files = Array.from(this.files);

        files.forEach(file => {
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(extension)) {
                alert(`File type "${extension}" is not supported. Please upload JPG, PNG, PDF, or DOC files only.`);
                this.value = ''; // Clear the input
                return;
            }
        });
    });
});

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const reportForm = document.getElementById('reportForm');
        if (reportForm.style.display !== 'none') {
            e.preventDefault();
            reportForm.dispatchEvent(new Event('submit'));
        }
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            bootstrap.Modal.getInstance(modal).hide();
        });
    }
});

// Auto-save draft functionality
function saveDraft() {
    const draftData = {
        category: document.getElementById('violation-category').value,
        description: document.getElementById('description').value,
        anonymous: document.getElementById('anonymous-report').checked,
        timestamp: new Date().toISOString()
    };

    // Note: In a real implementation, this would use Supabase or localStorage
    // For this demo, we'll store in memory only
    window.draftData = draftData;

    // Show draft saved indicator
    const indicator = document.createElement('div');
    indicator.className = 'alert alert-success alert-dismissible fade show position-fixed';
    indicator.style.cssText = 'top: 20px; right: 20px; z-index: 9999; width: 250px;';
    indicator.innerHTML = `
                <i class="fas fa-save me-2"></i>Draft saved automatically
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
    document.body.appendChild(indicator);

    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 3000);
}

// Load draft on page load
function loadDraft() {
    if (window.draftData) {
        const draft = window.draftData;
        document.getElementById('violation-category').value = draft.category || '';
        document.getElementById('description').value = draft.description || '';
        document.getElementById('anonymous-report').checked = draft.anonymous || false;

        // Trigger character counter update
        document.getElementById('description').dispatchEvent(new Event('input'));
    }
}

// Auto-save every 30 seconds
setInterval(() => {
    const description = document.getElementById('description').value;
    const category = document.getElementById('violation-category').value;

    if (description.length > 10 || category) {
        saveDraft();
    }
}, 30000);

// Enhanced form validation
function validateForm() {
    const form = document.getElementById('reportForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    // Validate description length
    const description = document.getElementById('description');
    if (description.value.length < 50) {
        description.classList.add('is-invalid');
        isValid = false;
    }

    return isValid;
}

// Real-time form validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function () {
        if (this.hasAttribute('required')) {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        }
    });
});

// Export report history (for user convenience)
function exportReportHistory() {
    const reports = document.querySelectorAll('.report-history-item');
    let csvContent = 'Report ID,Status,Category,Date,Description\n';

    reports.forEach(report => {
        const id = report.querySelector('h6').textContent.replace('Report #', '');
        const status = report.querySelector('.report-status').textContent;
        const category = report.querySelector('strong').nextSibling.textContent.trim();
        const date = report.querySelector('small').textContent;
        const description = report.querySelector('.text-muted').textContent.replace(/"/g, '""');

        csvContent += `"${id}","${status}","${category}","${date}","${description}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report_history.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add export button to history tab
document.addEventListener('DOMContentLoaded', function () {
    const historyHeader = document.querySelector('#history-tab .card-header');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-outline-primary btn-sm ms-auto';
    exportBtn.innerHTML = '<i class="fas fa-download me-2"></i>Export';
    exportBtn.onclick = exportReportHistory;

    const titleElement = historyHeader.querySelector('.section-title');
    titleElement.style.display = 'flex';
    titleElement.style.justifyContent = 'space-between';
    titleElement.style.alignItems = 'center';
    titleElement.appendChild(exportBtn);
});

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels
    document.getElementById('violation-category').setAttribute('aria-describedby', 'category-help');
    document.getElementById('description').setAttribute('aria-describedby', 'description-help charCounter');

    // Focus management
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            setTimeout(() => {
                const activeTab = document.querySelector('.tab-content[style*="block"] h3');
                if (activeTab) {
                    activeTab.focus();
                }
            }, 100);
        });
    });

    // Keyboard navigation for file upload
    document.getElementById('fileUploadArea').setAttribute('tabindex', '0');
    document.getElementById('fileUploadArea').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('fileInput').click();
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Error handling for network issues
function handleNetworkError(error) {
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    errorAlert.style.cssText = 'top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; min-width: 300px;';
    errorAlert.innerHTML = `
                <i class="fas fa-exclamation-triangle me-2"></i>
                Network error occurred. Please check your connection and try again.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
    document.body.appendChild(errorAlert);

    setTimeout(() => {
        if (errorAlert.parentNode) {
            errorAlert.remove();
        }
    }, 5000);
}

// Simulate real-time status updates (in real app, this would use Supabase real-time)
function simulateStatusUpdates() {
    const reports = document.querySelectorAll('.report-history-item');

    reports.forEach((report, index) => {
        const statusElement = report.querySelector('.report-status');
        const currentStatus = statusElement.textContent;

        // Randomly update status every 30 seconds for demo
        setTimeout(() => {
            if (currentStatus === 'Pending') {
                statusElement.textContent = 'Under Review';
                statusElement.className = 'report-status status-under-review';
            } else if (currentStatus === 'Under Review' && Math.random() > 0.5) {
                statusElement.textContent = 'Resolved';
                statusElement.className = 'report-status status-resolved';
            }
        }, (index + 1) * 30000 + Math.random() * 10000);
    });
}

// Start status simulation
setTimeout(simulateStatusUpdates, 5000);
