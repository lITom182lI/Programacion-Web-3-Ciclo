/*
 * registro.js - MC BACKPACK
 * Flujo de registro en 3 pasos (email -> código demo -> éxito)
 * No hay envío real de correo: el código se muestra en pantalla.
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    const emailForm = document.getElementById('emailForm');
    const codeForm = document.getElementById('codeForm');
    const changeEmailBtn = document.getElementById('changeEmailBtn');

    let generatedCode = null;
    let enteredEmail = '';

    function showStep(step) {
        [step1, step2, step3].forEach(s => s.classList.add('d-none'));
        step.classList.remove('d-none');
    }

    function generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    emailForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById('regEmail');
        emailInput.classList.remove('is-invalid');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            return;
        }

        enteredEmail = emailInput.value.trim();
        const newsletter = document.getElementById('regNewsletter').checked;

        try {
            await fetch('/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: enteredEmail, newsletter })
            });
        } catch (error) {
            console.error('Error de conexión:', error);
        }

        generatedCode = generateCode();
        document.getElementById('sentToEmail').textContent = enteredEmail;
        document.getElementById('demoCodeMessage').textContent = `Tu código de verificación (demo): ${generatedCode}`;

        showStep(step2);
    });

    codeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const codeInput = document.getElementById('regCode');
        codeInput.classList.remove('is-invalid');

        const code = codeInput.value.trim();
        if (!/^\d{6}$/.test(code) || code !== generatedCode) {
            codeInput.classList.add('is-invalid');
            return;
        }

        showStep(step3);
    });

    changeEmailBtn.addEventListener('click', () => {
        showStep(step1);
    });
});
