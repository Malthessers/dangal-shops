document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const formContainers = document.querySelectorAll('.form-container');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            formContainers.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding form
            const formId = button.getAttribute('data-tab') + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type');
            
            if (type === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.setAttribute('type', 'password');
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength checker
    const passwordInput = document.getElementById('signup-password');
    const weakBar = document.querySelector('.weak');
    const mediumBar = document.querySelector('.medium');
    const strongBar = document.querySelector('.strong');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            
            // Reset strength indicators
            weakBar.classList.remove('active');
            mediumBar.classList.remove('active');
            strongBar.classList.remove('active');
            
            // Check password strength
            if (password.length > 0) {
                weakBar.classList.add('active');
                
                // Check for medium strength
                if (password.length >= 6 && 
                   (password.match(/[a-z]/) || password.match(/[A-Z]/)) && 
                   password.match(/[0-9]/)) {
                    mediumBar.classList.add('active');
                }
                
                // Check for strong password
                if (password.length >= 8 && 
                   password.match(/[a-z]/) && 
                   password.match(/[A-Z]/) && 
                   password.match(/[0-9]/) && 
                   password.match(/[^a-zA-Z0-9]/)) {
                    strongBar.classList.add('active');
                }
            }
        });
    }
    
    // Form validation for signup
    const signupForm = document.querySelector('#signup-form form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if all required fields are filled
            const requiredFields = signupForm.querySelectorAll('[required]');
            let allFieldsFilled = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFieldsFilled = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!allFieldsFilled) {
                alert('Please fill in all required fields');
                return;
            }
            
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Form is valid, submit or process data
            alert('Account created successfully! You can now login.');
            
            // Reset form and switch to login tab
            this.reset();
            document.querySelector('[data-tab="login"]').click();
        });
    }
    
    // Form validation for login
    const loginForm = document.querySelector('#login-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if all required fields are filled
            const requiredFields = loginForm.querySelectorAll('[required]');
            let allFieldsFilled = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFieldsFilled = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!allFieldsFilled) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would normally send the data to a server
            // For this example, just show success message and redirect
            alert('Login successful! Redirecting to seller dashboard...');
            
            // Redirect to seller dashboard
            window.location.href = '../Seller/seller.html';
        });
    }
});