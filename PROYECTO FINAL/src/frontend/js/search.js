/*
 * search.js - MC BACKPACK
 * Despliega una barra de búsqueda al hacer clic en la lupa del navbar.
 * Al buscar, redirige a tienda.html?q=<término>, donde tienda.js aplica el filtro.
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchForm = document.getElementById('navbarSearchForm');
    const searchInput = document.getElementById('navbarSearchInput');

    if (!searchToggle || !searchForm || !searchInput) return;

    searchToggle.addEventListener('click', () => {
        const isOpen = searchForm.classList.toggle('show');
        searchToggle.setAttribute('aria-expanded', isOpen.toString());
        if (isOpen) searchInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (!searchForm.classList.contains('show')) return;
        if (searchForm.contains(e.target) || searchToggle.contains(e.target)) return;
        searchForm.classList.remove('show');
        searchToggle.setAttribute('aria-expanded', 'false');
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = searchInput.value.trim();
        if (!term) return;
        window.location.href = 'tienda.html?q=' + encodeURIComponent(term);
    });
});
