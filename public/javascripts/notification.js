// Initial notifications array
let notifications = [
    { id: 1, title: "New report pending verification", time: "Aug 16, 2025, 10:20 AM", type: "info", read: false },
    { id: 2, title: "Tsunami warning advisory", time: "Aug 15, 2025, 5:00 PM", type: "high-priority", read: false },
    { id: 3, title: "High waves alert in your district", time: "Aug 15, 2025, 9:15 AM", type: "warning", read: false },
    { id: 4, title: "New user registered", time: "Aug 14, 2025, 1:45 PM", type: "info", read: false }
];

// DOM elements
const notificationsList = document.getElementById('notificationsList');
const emptyState = document.getElementById('emptyState');
const saveConfigBtn = document.getElementById('saveConfig');

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', () => {
    const tooltipList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];
    tooltipList.forEach(el => new bootstrap.Tooltip(el));

    renderNotifications();
});

// Render notifications
function renderNotifications() {
    if (notifications.length === 0) {
        notificationsList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    notificationsList.style.display = 'block';
    emptyState.style.display = 'none';

    notificationsList.innerHTML = notifications.map(n => `
        <div class="notification-card ${n.read ? 'opacity-75' : ''} notification-${n.type}" data-id="${n.id}" role="listitem">
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="bi bi-bell${n.read ? '' : '-fill'}"></i>
                </div>
                <div class="notification-details">
                    <h6 class="notification-title">${n.title}</h6>
                    <p class="notification-time">${n.time}</p>
                </div>
                <div class="notification-actions">
                    ${!n.read ? `<button class="btn-action btn-mark-read" onclick="markAsRead(${n.id})" title="Mark as read" aria-label="Mark notification as read"><i class="bi bi-check"></i></button>` : ''}
                    <button class="btn-action btn-delete" onclick="deleteNotification(${n.id})" title="Delete" aria-label="Delete notification"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mark as read
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        renderNotifications();
    }
}

// Delete notification
function deleteNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
    renderNotifications();
}

// Add new notification
function addNotification(title, type = 'info') {
    const newId = notifications.length ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
    const newNotification = {
        id: newId,
        title,
        time: new Date().toLocaleString('en-US', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }),
        type,
        read: false
    };
    notifications.unshift(newNotification);
    renderNotifications();

    // Animate new card
    setTimeout(() => {
        const newCard = document.querySelector(`[data-id="${newId}"]`);
        if (newCard) newCard.classList.add('notification-new');
    }, 50);
}

// Settings icon click (demo: add random notification)
document.querySelector('.settings-icon').addEventListener('click', () => {
    const demoTitles = [
        "System maintenance scheduled",
        "New feature available",
        "Security update required",
        "Backup completed successfully"
    ];
    const randomTitle = demoTitles[Math.floor(Math.random() * demoTitles.length)];
    addNotification(randomTitle);
});

// Save configuration
saveConfigBtn.addEventListener('click', () => {
    const prefs = {
        reports: document.getElementById('reports').checked,
        alerts: document.getElementById('alerts').checked,
        users: document.getElementById('users').checked,
        system: document.getElementById('system').checked
    };

    console.log('Saved preferences:', prefs);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('configModal'));
    if (modal) modal.hide();

    addNotification("Notification preferences updated", "info");
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modalEl => {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        });
    }
});

// Mark all as read
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
}

// Clear all notifications
function clearAllNotifications() {
    notifications = [];
    renderNotifications();
}
