let currentStep = 1;
        const totalSteps = 4;
        const form = document.getElementById('stepperForm');
        const steps = document.querySelectorAll('.form-step');
        const stepIndicators = document.querySelectorAll('.step');
        const progressBar = document.querySelector('.progress-bar');
        const nextButtons = document.querySelectorAll('.btn-next');

        // Enable Bootstrap validation
        (function() {
            'use strict';
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        })();

        function updateStep(step) {
            steps.forEach((s, index) => {
                s.classList.remove('active');
                if (index + 1 === step) s.classList.add('active');
            });

            stepIndicators.forEach((indicator, index) => {
                indicator.classList.remove('active', 'completed');
                if (index + 1 <= step) {
                    indicator.classList.add(index + 1 === step ? 'active' : 'completed');
                }
            });

            const progress = ((step - 1) / (totalSteps - 1)) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);

            // Update review fields in Step 4
            if (step === 4) {
                document.getElementById('reviewName').textContent = document.getElementById('name').value || 'Not provided';
                document.getElementById('reviewEmail').textContent = document.getElementById('email').value || 'Not provided';
                document.getElementById('reviewPropertyType').textContent = document.getElementById('propertyType').value || 'Not provided';
                document.getElementById('reviewLocation').textContent = document.getElementById('location').value || 'Not provided';
                document.getElementById('reviewBudget').textContent = document.getElementById('budget').value || 'Not provided';
                document.getElementById('reviewBedrooms').textContent = document.getElementById('bedrooms').value || 'Not provided';
            }
        }

        function validateStep(step) {
            let isValid = true;
            const stepElement = steps[step - 1];
            const inputs = stepElement.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            return isValid;
        }

        nextButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const nextStep = index + 2; // Next step number
                if (validateStep(currentStep)) {
                    if (currentStep < totalSteps) {
                        currentStep = nextStep;
                        updateStep(currentStep);
                    }
                } else {
                    form.classList.add('was-validated'); // Trigger Bootstrap validation
                }
            });
        });

        document.querySelectorAll('.btn-prev').forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStep(currentStep);
                    form.classList.remove('was-validated'); // Reset validation on previous
                }
            });
        });

        form.addEventListener('submit', (e) => {
            if (!validateStep(currentStep)) {
                e.preventDefault();
                form.classList.add('was-validated');
            } else {
                e.preventDefault(); // Prevent default for demo; replace with actual submission
                alert('Form submitted successfully!');
            }
        });

        // Initialize
        updateStep(currentStep);

