/*
 * tienda.js - MC BACKPACK (Página Tienda)
 * Funcionalidades: Filtro de categoría, slider de precio, menú hamburguesa, scroll to top
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Menú Hamburguesa =====
    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.getElementById('navbarLinks');

    if (hamburger && navbarLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navbarLinks.classList.toggle('show');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen.toString());
        });

        navbarLinks.querySelectorAll('.nav-link-custom').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('show');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== Filtro de Categorías + Búsqueda por nombre =====
    const tagButtons = document.querySelectorAll('.tag-btn');
    const shopItems = document.querySelectorAll('.shop-item');
    const shopSearchInput = document.getElementById('shopSearchInput');

    const applyFilters = () => {
        const activeTag = document.querySelector('.tag-btn.tag-active');
        const filterValue = activeTag ? activeTag.getAttribute('data-filter') : 'all';
        const maxPrice = parseInt(document.getElementById('priceRange').value, 10);
        const searchTerm = (shopSearchInput?.value || '').toLowerCase().trim();

        shopItems.forEach(item => {
            const itemCat = item.getAttribute('data-category');
            const itemPrice = parseInt(item.getAttribute('data-price'), 10);
            const itemName = (item.querySelector('.shop-name')?.textContent || '').toLowerCase();

            const matchesCat = (filterValue === 'all' || itemCat === filterValue);
            const matchesPrice = itemPrice <= maxPrice;
            const matchesSearch = (searchTerm === '' || itemName.includes(searchTerm));

            if (matchesCat && matchesPrice && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    tagButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tagButtons.forEach(b => b.classList.remove('tag-active'));
            e.target.classList.add('tag-active');
            applyFilters();
        });
    });

    if (shopSearchInput) {
        // Si llegamos desde la barra de búsqueda del navbar (tienda.html?q=termino), precargar el término
        const urlParams = new URLSearchParams(window.location.search);
        const queryTerm = urlParams.get('q');
        if (queryTerm) {
            shopSearchInput.value = queryTerm;
        }

        shopSearchInput.addEventListener('keyup', applyFilters);
        applyFilters();
    }

    // ===== Slider de Precio =====
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = 'S/ ' + priceRange.value;
            applyFilters();
        });
    }

    // ===== Botón Volver Arriba =====
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
