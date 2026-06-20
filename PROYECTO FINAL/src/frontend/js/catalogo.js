/**
 * catalogo.js
 * Gestiona la carga de productos, el buscador y los filtros.
 */

document.addEventListener('DOMContentLoaded', () => {
    let todosLosProductos = []; // Almacena cache local
    let origenActivo = 'Todos';
    let categoriaActiva = 'Todas';

    const contenedor = document.getElementById('catalogoProductos');
    const formBuscar = document.getElementById('formBuscar');
    const inputBuscar = document.getElementById('inputBuscar');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const botonesCategoria = document.querySelectorAll('.btn-categoria');

    // 1. Cargar productos desde la API
    fetch('/api/productos')
        .then(res => res.json())
        .then(data => {
            todosLosProductos = data;
            renderizarProductos(data);
        })
        .catch(error => {
            console.error('Error cargando productos:', error);
            contenedor.innerHTML = '<div class="alert alert-danger w-100">Error cargando el catálogo.</div>';
        });

    // 2. Renderizar (inyectar en DOM)
    function renderizarProductos(productos) {
        contenedor.innerHTML = '';
        if (productos.length === 0) {
            contenedor.innerHTML = '<div class="col-12"><p class="text-muted">No se encontraron productos.</p></div>';
            return;
        }

        productos.forEach(prod => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300x250?text=Sin+Imagen'">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="badge bg-secondary">${prod.origen}</span>
                            <span class="badge bg-success">${prod.categoria}</span>
                        </div>
                        <h2 class="card-title h5">${prod.nombre}</h2>
                        <p class="card-text text-muted mb-2">${prod.desc}</p>
                        <p class="card-text fw-bold fs-4 text-primary mt-auto">S/ ${prod.precio.toFixed(2)}</p>
                        <a href="detalle.html?id=${prod.id}" class="btn btn-primary w-100 btn-lg mt-2" aria-label="Ver detalles de ${prod.nombre}">Ver Detalles</a>
                    </div>
                </div>
            `;
            contenedor.appendChild(col);
        });
    }

    // Aplica búsqueda + filtro de origen + filtro de categoría combinados
    function aplicarFiltros() {
        const termino = inputBuscar.value.toLowerCase().trim();
        let filtrados = todosLosProductos;

        if (termino) {
            filtrados = filtrados.filter(p =>
                p.nombre.toLowerCase().includes(termino) ||
                p.desc.toLowerCase().includes(termino)
            );
        }
        if (origenActivo !== 'Todos') {
            filtrados = filtrados.filter(p => p.origen === origenActivo);
        }
        if (categoriaActiva !== 'Todas') {
            filtrados = filtrados.filter(p => p.categoria === categoriaActiva);
        }

        renderizarProductos(filtrados);
    }

    // 3. Lógica del Buscador (C1)
    formBuscar.addEventListener('submit', (e) => {
        e.preventDefault();
        aplicarFiltros();
    });

    // 4. Lógica de Filtros por Origen (C2)
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            origenActivo = boton.getAttribute('data-filtro');
            aplicarFiltros();
        });
    });

    // 5. Lógica de Filtros por Categoría
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesCategoria.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            categoriaActiva = boton.getAttribute('data-categoria');
            aplicarFiltros();
        });
    });
});
