let generatedOtp = '';
let formData = {};

// Form elements
const form = document.getElementById('verificationForm');
const otpSection = document.getElementById('otpSection');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');

// Input validation
function validateUsername(username) {
    return username.length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
}

// Real-time Aadhaar validation
document.getElementById('aadhaar').addEventListener('input', function (e) {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    e.target.value = value;

    const errorDiv = document.getElementById('aadhaarError');
    const successDiv = document.getElementById('aadhaarSuccess');

    if (value.length === 12) {
        errorDiv.style.display = 'none';
        successDiv.style.display = 'block';
        updateStep(2);
    } else if (value.length > 0) {
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        errorDiv.textContent = `Enter ${12 - value.length} more digits`;
    } else {
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
    }
});

// Generate random 6-digit OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Mask Aadhaar number for display
function maskAadhaar(aadhaar) {
    return 'XXXX XXXX ' + aadhaar.slice(-4);
}

// Show flash message with OTP
function showFlashOtp(aadhaar, otp) {
    const flashMessage = document.getElementById('flashMessage');
    const flashAadhaar = document.getElementById('flashAadhaar');
    const flashOtp = document.getElementById('flashOtp');

    flashAadhaar.textContent = maskAadhaar(aadhaar);
    flashOtp.textContent = otp;

    flashMessage.style.display = 'block';

    setTimeout(() => {
        flashMessage.style.display = 'none';
    }, 5000);
}

// Update step indicator
function updateStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
            step.className = 'step completed';
        } else if (index + 1 === stepNumber) {
            step.className = 'step active';
        } else {
            step.className = 'step';
        }
    });
}

// Form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const category = document.getElementById('category').value;
    const aadhaar = document.getElementById('aadhaar').value.trim();

    let isValid = true;

    // Validate fields
    if (!validateUsername(username)) {
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (!category) {
        document.getElementById('categoryError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('categoryError').style.display = 'none';
    }

    if (!validateAadhaar(aadhaar)) {
        const aadhaarError = document.getElementById('aadhaarError');
        aadhaarError.style.display = 'block';
        aadhaarError.textContent = 'Please enter a valid 12-digit Aadhaar number';
        isValid = false;
    } else {
        document.getElementById('aadhaarError').style.display = 'none';
    }

    if (isValid) {
        formData = { username, email, category, aadhaar };

        // Show loading
        submitBtn.innerHTML = 'Generating OTP <div class="loading"></div>';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Generate OTP
            generatedOtp = generateOtp();

            showFlashOtp(aadhaar, generatedOtp);

            document.getElementById('maskedAadhaar').textContent = maskAadhaar(aadhaar);
            document.getElementById('otpDisplay').textContent = generatedOtp;

            otpSection.style.display = 'block';
            updateStep(3);

            // Reset button
            submitBtn.innerHTML = 'Generate OTP';
            submitBtn.disabled = false;

            // Auto-hide OTP after 30 seconds
            setTimeout(() => {
                document.getElementById('otpDisplay').textContent = 'OTP expired - Click "Generate OTP" again';
            }, 30000);
        }, 2000);
    }
});

// OTP verification
verifyOtpBtn.addEventListener('click', function () {
    const enteredOtp = document.getElementById('otpInput').value.trim();
    const otpError = document.getElementById('otpError');

    if (enteredOtp === generatedOtp) {
        otpError.style.display = 'none';

        document.getElementById('welcomeUser').textContent = formData.username;
        successMessage.style.display = 'block';
        otpSection.style.display = 'none';
        form.style.display = 'none';

        updateStep(3);
        document.getElementById('step3').className = 'step completed';
    } else {
        otpError.style.display = 'block';
        otpError.textContent = 'Invalid OTP. Please try again.';
    }
});

// Only allow digits in OTP input
document.getElementById('otpInput').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});
