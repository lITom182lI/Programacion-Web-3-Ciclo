/*
 * ubicacion.js - MC BACKPACK
 * Hamburguesa, back-to-top y newsletter
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
