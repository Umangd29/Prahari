
        // Sample user data
        let users = [
            { id: 1, name: "John Doe", email: "user@example.com", role: "Citizen", status: "Active" },
            { id: 2, name: "Ramesh Kumar", email: "rams@example.com", role: "Analyst", status: "Active" },
            { id: 3, name: "Anita Singh", email: "anita@example.com", role: "Analyst", status: "Active" },
            { id: 4, name: "Raj Patel", email: "rajp@example.com", role: "Analyst", status: "Active" }
        ];

        let nextUserId = 5;

        // Render users table
        function renderUsers(usersToRender = users) {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';

            usersToRender.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${user.name}</strong></td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <span class="status-badge ${user.status === 'Active' ? 'status-active' : 'status-blocked'}">
                            ${user.status}
                        </span>
                    </td>
                    <td>
                        <div class="btn-group-actions">
                            <button class="btn btn-outline-secondary btn-sm" onclick="editUser(${user.id})">
                                <i class="bi bi-pencil me-1"></i>Edit
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="toggleUserStatus(${user.id})">
                                <i class="bi bi-${user.status === 'Active' ? 'lock' : 'unlock'} me-1"></i>
                                ${user.status === 'Active' ? 'Block' : 'Unblock'}
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Filter users based on search input
        function filterUsers() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
            renderUsers(filteredUsers);
        }

        // Toggle user status between Active and Blocked
        function toggleUserStatus(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                user.status = user.status === 'Active' ? 'Blocked' : 'Active';
                renderUsers();

                // Show feedback
                const action = user.status === 'Blocked' ? 'blocked' : 'unblocked';
                showToast(`${user.name} has been ${action}`, user.status === 'Blocked' ? 'warning' : 'success');
            }
        }

        // Edit user (placeholder function)
        function editUser(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                showToast(`Edit functionality for ${user.name} would be implemented here`, 'info');
            }
        }

        // Show add user modal
        function showAddUserModal() {
            const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
            modal.show();
        }

        // Add new user
        function addUser() {
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const role = document.getElementById('userRole').value;

            if (name && email && role) {
                // Check if email already exists
                const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
                if (emailExists) {
                    showToast('Email already exists!', 'danger');
                    return;
                }

                const newUser = {
                    id: nextUserId++,
                    name: name,
                    email: email,
                    role: role,
                    status: 'Active'
                };

                users.push(newUser);
                renderUsers();

                // Close modal and reset form
                const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
                modal.hide();
                document.getElementById('addUserForm').reset();

                showToast(`${name} has been added successfully!`, 'success');
            } else {
                showToast('Please fill in all fields', 'danger');
            }
        }

        // Show toast notification
        function showToast(message, type = 'info') {
            // Create toast container if it doesn't exist
            let toastContainer = document.getElementById('toastContainer');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toastContainer';
                toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
                toastContainer.style.zIndex = '1080';
                document.body.appendChild(toastContainer);
            }

            const toastId = 'toast-' + Date.now();
            const toastHtml = `
                <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <div class="rounded me-2 bg-${type}" style="width: 20px; height: 20px;"></div>
                        <strong class="me-auto">Notification</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            `;

            toastContainer.insertAdjacentHTML('beforeend', toastHtml);
            const toast = new bootstrap.Toast(document.getElementById(toastId));
            toast.show();

            // Remove toast element after it's hidden
            document.getElementById(toastId).addEventListener('hidden.bs.toast', function () {
                this.remove();
            });
        }

        // Initialize the table on page load
        document.addEventListener('DOMContentLoaded', function () {
            renderUsers();
        });