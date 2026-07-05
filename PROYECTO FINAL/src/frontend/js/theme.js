/*
 * theme.js - MC BACKPACK
 * Alterna entre modo oscuro (por defecto) y modo claro, persistido en localStorage.
 * Se aplica como atributo data-theme en <html> para que todo el CSS reaccione.
 * =====================================================
 */

(function () {
    const THEME_KEY = 'mc_theme';
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
    const THEME_KEY = 'mc_theme';
    const toggleBtn = document.getElementById('themeToggle');

    if (!toggleBtn) return;

    function updateLabel() {
        const current = document.documentElement.getAttribute('data-theme');
        toggleBtn.setAttribute('aria-label', current === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    }

    updateLabel();

    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        updateLabel();
    });
});
