/*
 * main.js - MC BACKPACK
 * 10 Funcionalidades Interactivas con JavaScript Puro
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /*
     * ======================================================
     * FUNCIONALIDAD 1: Menú Hamburguesa (Mobile Navigation)
     * Manipulación del DOM para abrir/cerrar el menú móvil
     * ======================================================
     */
    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.getElementById('navbarLinks');

    if (hamburger && navbarLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navbarLinks.classList.toggle('show');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen.toString());
        });

        // Cerrar menú al hacer clic en un enlace
        navbarLinks.querySelectorAll('.nav-link-custom').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('show');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /*
     * ======================================================
     * FUNCIONALIDAD 2: Navegación Activa por Scroll
     * Detecta la sección visible y resalta el enlace correspondiente
     * ======================================================
     */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    const highlightActiveNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    /*
     * ======================================================
     * FUNCIONALIDAD 3: Saludo Dinámico según la Hora
     * Modifica el contenido del DOM según la hora del sistema
     * ======================================================
     */
    const setDynamicGreeting = () => {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('greeting-message');
        if (!greetingElement) return;

        let greeting = 'Ediciones limitadas, mochilas y accesorios para los que viven la ciudad. Curaduría independiente desde Lima.';
        if (hour < 12) {
            greeting = '¡Buenos días! Descubre nuestras ediciones limitadas, mochilas y accesorios. Curaduría independiente desde Lima.';
        } else if (hour < 18) {
            greeting = '¡Buenas tardes! Explora mochilas únicas y accesorios exclusivos. Curaduría independiente desde Lima.';
        } else {
            greeting = '¡Buenas noches! Mochilas y accesorios que marcan estilo. Curaduría independiente desde Lima.';
        }

        greetingElement.textContent = greeting;
    };

    setDynamicGreeting();

    /*
     * ======================================================
     * FUNCIONALIDAD 4: Filtro de Categorías de Productos
     * Muestra/oculta productos por categoría usando DOM
     * ======================================================
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProductItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Actualizar estado activo y aria-pressed
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            e.target.classList.add('active');
            e.target.setAttribute('aria-pressed', 'true');

            const filterValue = e.target.getAttribute('data-filter');

            allProductItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /*
     * ======================================================
     * FUNCIONALIDAD 5: Búsqueda Local en Tiempo Real
     * Filtra los productos del DOM según el texto ingresado
     * ======================================================
     */
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase().trim();

            allProductItems.forEach(item => {
                const name = (item.querySelector('.product-name')?.textContent || '').toLowerCase();
                const origin = (item.querySelector('.product-origin')?.textContent || '').toLowerCase();
                const cat = (item.querySelector('.product-cat')?.textContent || '').toLowerCase();

                if (name.includes(term) || origin.includes(term) || cat.includes(term)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    }

    /*
     * ======================================================
     * FUNCIONALIDAD 6: Botón "Volver Arriba" Reactivo al Scroll
     * Aparece y desaparece al hacer scroll, con smooth behavior
     * ======================================================
     */
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

    /*
     * ======================================================
     * FUNCIONALIDAD 7: Validación Personalizada de Formulario
     * Valida nombre, email y mensaje antes de enviar
     * ======================================================
     */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            /*
             * ======================================================
             * FUNCIONALIDAD 8: Validación de Campos en Tiempo Real
             * Verifica longitud mínima y formato de email vía regex
             * ======================================================
             */
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');

            // Limpiar estados previos
            [nombre, email, mensaje].forEach(el => {
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

            if (mensaje && mensaje.value.trim().length < 10) {
                mensaje.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) return;

            /*
             * ======================================================
             * FUNCIONALIDAD 9: Estado de Carga del Botón
             * Desactiva el botón y muestra texto alternativo durante la petición
             * ======================================================
             */
            const submitBtn = document.getElementById('submitBtn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            /*
             * ======================================================
             * FUNCIONALIDAD 10: Petición Asíncrona (Fetch) al Backend
             * Envía los datos del formulario al endpoint POST /api/contacto
             * y muestra el resultado dinámicamente en el DOM
             * ======================================================
             */
            try {
                const response = await fetch('/api/contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: nombre.value.trim(),
                        email: email.value.trim(),
                        mensaje: mensaje.value.trim()
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

    /*
     * ======================================================
     * BONUS: Newsletter Form Handler
     * Previene el submit por defecto y muestra feedback
     * ======================================================
     */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            if (input && input.value.trim()) {
                alert('¡Gracias por suscribirte! Recibirás nuestras novedades.');
                input.value = '';
            }
        });
    }

});
