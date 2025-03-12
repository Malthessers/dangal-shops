document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('bx-hide', 'bx-show');
            } else {
                input.type = 'password';
                this.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    // Password strength meter
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const value = passwordInput.value;
            const strength = checkPasswordStrength(value);
            
            // Update strength bar
            strengthBar.style.width = `${strength.score * 25}%`;
            strengthBar.style.backgroundColor = strength.color;
            
            // Update strength text
            strengthText.textContent = strength.message;
            strengthText.style.color = strength.color;
        });
    }

    // Check form validity before submit
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

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
            
            if (allFieldsFilled) {
                // You would typically send this to your backend
                // For this example, just redirect to login page
                window.location.href = '../Login/login.html';
            } else {
                alert('Please fill in all required fields');
            }
        });
    }

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
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // All validation passed, redirect to login page
            window.location.href = '../Login/login.html';
        });
    }
    
    // Mobile menu toggle
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.querySelector('.navlist');
    
    if (menuIcon && navList) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('bx-x');
            navList.classList.toggle('open');
        });
    }

    // Password strength checker function
    function checkPasswordStrength(password) {
        let score = 0;
        let message = 'Very weak';
        let color = '#e74c3c';
        
        // Length check
        if (password.length >= 8) score++;
        
        // Contains lowercase and uppercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        
        // Contains numbers
        if (/\d/.test(password)) score++;
        
        // Contains special characters
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        
        // Set message and color based on score
        switch(score) {
            case 0:
                message = 'Very weak';
                color = '#e74c3c';
                break;
            case 1:
                message = 'Weak';
                color = '#e67e22';
                break;
            case 2:
                message = 'Medium';
                color = '#f1c40f';
                break;
            case 3:
                message = 'Strong';
                color = '#2ecc71';
                break;
            case 4:
                message = 'Very strong';
                color = '#27ae60';
                break;
        }
        
        return {
            score,
            message,
            color
        };
    }
});