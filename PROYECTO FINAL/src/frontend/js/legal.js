/*
 * legal.js - MC BACKPACK
 * Hamburguesa y back-to-top compartidos en terminos.html / politicas.html
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
});
