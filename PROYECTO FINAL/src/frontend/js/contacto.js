/*
 * contacto.js - MC BACKPACK
 * Hamburguesa, back-to-top y validación/envío del formulario de contacto
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.getElementById('navbarLinks');

    if (hamburger && navbarLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navbarLinks.classList.toggle('show');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen.toString());
        });
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');

            [nombre, email, asunto, mensaje].forEach(el => {
                if (el) el.classList.remove('is-invalid');
            });

            if (nombre && nombre.value.trim().length < 3) {
                nombre.classList.add('is-invalid');
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email.value.trim())) {
                email.classList.add('is-invalid');
                isValid = false;
            }

            if (asunto && asunto.value.trim().length < 3) {
                asunto.classList.add('is-invalid');
                isValid = false;
            }

            if (mensaje && mensaje.value.trim().length < 10) {
                mensaje.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) return;

            const submitBtn = document.getElementById('submitBtn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                const response = await fetch('/api/contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: nombre.value.trim(),
                        email: email.value.trim(),
                        mensaje: `Asunto: ${asunto.value.trim()}\n\n${mensaje.value.trim()}`
                    })
                });

                const data = await response.json();

                const formMessage = document.getElementById('formMessage');
                formMessage.classList.remove('d-none', 'error', 'success');
                formMessage.classList.add(data.success ? 'success' : 'error');
                formMessage.textContent = data.message;

                if (data.success) {
                    contactForm.reset();
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                const formMessage = document.getElementById('formMessage');
                formMessage.classList.remove('d-none', 'success');
                formMessage.classList.add('error');
                formMessage.textContent = 'Error de conexión. Intenta nuevamente.';
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});
