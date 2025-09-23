document.addEventListener('DOMContentLoaded', () => {
    const languageOptions = document.querySelectorAll('.language-option');
    const selectedLangInput = document.getElementById('selectedLang');
    const continueBtn = document.getElementById('continueBtn');

    continueBtn.disabled = true;

    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            languageOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class
            this.classList.add('selected');

            // Set hidden input value
            selectedLangInput.value = this.getAttribute('data-lang');

            // Enable button
            continueBtn.disabled = false;
            continueBtn.classList.add('active');
        });
    });
});
