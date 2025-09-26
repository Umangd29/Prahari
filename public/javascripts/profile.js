document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.profile-container');
    if (!container) return; // Ensure we're on the profile page

    // Smooth hover effects for report and reward cards
    const cards = container.querySelectorAll('.report-card, .reward-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // // Apply filter button functionality
    // const applyBtn = container.querySelector('.btn-primary');
    // if (applyBtn) {
    //     applyBtn.addEventListener('click', () => {
    //         const location = container.querySelector('#location').value;
    //         const date = container.querySelector('#date').value;

    //         // Temporary feedback animation
    //         applyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Applied!';
    //         applyBtn.style.background = 'linear-gradient(135deg, #51cf66, #40c057)';

    //         setTimeout(() => {
    //             applyBtn.innerHTML = '<i class="fas fa-search me-2"></i>Apply';
    //             applyBtn.style.background = 'linear-gradient(135deg, #4dabf7, #339af0)';
    //         }, 1500);

    //         // Here you could also trigger actual filtering of reports
    //         console.log(`Filter applied: Location = ${location}, Date = ${date}`);
    //     });
    // }

    // Profile buttons feedback (Edit / Share)
    const profileButtons = container.querySelectorAll('.btn-outline-secondary');
    profileButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (!icon) return;

            const originalClass = icon.className;

            // Feedback animation
            icon.className = 'fas fa-check me-2';
            btn.style.background = '#28a745';
            btn.style.borderColor = '#28a745';
            btn.style.color = '#fff';

            setTimeout(() => {
                icon.className = originalClass;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 1000);
        });
    });
});
