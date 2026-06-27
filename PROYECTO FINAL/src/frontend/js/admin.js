/**
 * admin.js
 * Lógica CRUD avanzada y pestañas para el Dashboard (Tarea 3).
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarPestañas();
    cargarEstadisticas();
    cargarProductos();
    cargarFerias();
    cargarReservas();

    // Eventos de botones de creación
    document.getElementById('btnNuevoProducto')?.addEventListener('click', crearNuevoProducto);
    document.getElementById('btnNuevaFeria')?.addEventListener('click', crearNuevaFeria);
});

// --- LÓGICA DE PESTAÑAS ---
function inicializarPestañas() {
    const links = document.querySelectorAll('#adminSidebar .list-group-item');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Desmarcar todos
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Ocultar todas las secciones
            document.querySelectorAll('.admin-section').forEach(sec => sec.classList.add('d-none'));

            // Mostrar la seleccionada
            const target = link.getAttribute('data-target');
            document.getElementById(target).classList.remove('d-none');
        });
    });
}

// --- LÓGICA DE ESTADÍSTICAS GLOBALES ---
function cargarEstadisticas() {
    fetch('/api/ferias')
        .then(res => res.json())
        .then(data => document.getElementById('totalFerias').textContent = data.length)
        .catch(err => document.getElementById('totalFerias').textContent = 'Error');

    fetch('/api/reserva')
        .then(res => res.json())
        .then(data => document.getElementById('totalReservas').textContent = data.length)
        .catch(err => document.getElementById('totalReservas').textContent = 'Error');
}

// ==========================================
// SECCIÓN PRODUCTOS
// ==========================================
function cargarProductos() {
    fetch('/api/productos')
        .then(res => res.json())
        .then(data => {
            document.getElementById('adminTableBody').innerHTML = '';
            document.getElementById('totalProductos').textContent = data.length;

            data.forEach(prod => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>S/ ${parseFloat(prod.precio).toFixed(2)}</td>
                    <td><span class="badge bg-success">Disponible</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary me-1" onclick="editarProducto('${prod.id}', '${prod.nombre.replace(/'/g, "\\'")}', '${prod.precio}')">Editar</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${prod.id}')">Eliminar</button>
                    </td>
                `;
                document.getElementById('adminTableBody').appendChild(tr);
            });
        })
        .catch(err => console.error(err));
}

function eliminarProducto(id) {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
        fetch('/api/productos/' + id, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => { cargarProductos(); cargarEstadisticas(); })
            .catch(err => alert('Error eliminando producto'));
    }
}

function crearNuevoProducto() {
    const nombre = prompt('Ingresa el nombre del nuevo producto:');
    if (!nombre) return;
    const precioStr = prompt('Ingresa el precio:');
    const precio = parseFloat(precioStr);
    if (isNaN(precio)) return alert('Precio inválido');

    const nuevo = {
        nombre: nombre,
        precio: precio,
        desc: "Producto nuevo agregado",
        especificaciones: { capacidad: "N/A", compartimento_laptop: "N/A", material: "N/A" },
        imagen: "https://via.placeholder.com/600x600?text=Nuevo",
        origen: "Nacional"
    };

    fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
    }).then(() => { cargarProductos(); cargarEstadisticas(); });
}

function editarProducto(id, nombreActual, precioActual) {
    const nuevoNombre = prompt('Editar nombre:', nombreActual);
    if (nuevoNombre === null) return;
    const nuevoPrecioStr = prompt('Editar precio:', precioActual);
    if (nuevoPrecioStr === null) return;
    const nuevoPrecio = parseFloat(nuevoPrecioStr);
    if (isNaN(nuevoPrecio)) return alert('Precio inválido');

    fetch('/api/productos/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre, precio: nuevoPrecio })
    }).then(() => cargarProductos());
}

// ==========================================
// SECCIÓN FERIAS
// ==========================================
function cargarFerias() {
    fetch('/api/ferias')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('feriasTableBody');
            tbody.innerHTML = '';
            data.forEach(feria => {
                const hoyStr = obtenerFechaLocalISO();
                const esActiva = (feria.fecha_iso === hoyStr);

                const estadoBadge = esActiva 
                    ? '<span class="badge bg-success">Activa</span>' 
                    : '<span class="badge bg-secondary">Inactiva</span>';
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${feria.nombre}</td>
                    <td>${feria.lugar}</td>
                    <td>${feria.fecha_iso || feria.fecha}</td>
                    <td>${estadoBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary me-1" onclick="editarFeria('${feria.id}', '${feria.nombre}', '${feria.fecha_iso}')">Editar</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarFeria('${feria.id}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function crearNuevaFeria() {
    const nombre = prompt('Nombre de la Feria (Ej. Expo Anime):');
    if (!nombre) return;
    const fechaIso = prompt('Fecha en formato YYYY-MM-DD (Ej. 2026-06-30):');
    if (!fechaIso) return;

    const nueva = {
        nombre: nombre,
        lugar: "Lugar por definir",
        fecha: "Fecha por definir",
        horario: "9:00 AM - 6:00 PM",
        fecha_iso: fechaIso,
        enlace_maps: "https://google.com/maps"
    };

    fetch('/api/ferias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nueva)
    }).then(() => { cargarFerias(); cargarEstadisticas(); });
}

function editarFeria(id, nombreAct, fechaAct) {
    const nuevoNombre = prompt('Editar nombre:', nombreAct);
    if (!nuevoNombre) return;
    const nuevaFecha = prompt('Editar fecha ISO (YYYY-MM-DD):', fechaAct || '');
    if (!nuevaFecha) return;

    fetch('/api/ferias/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre, fecha_iso: nuevaFecha })
    }).then(() => cargarFerias());
}

function eliminarFeria(id) {
    if(confirm('¿Eliminar esta feria permanentemente?')) {
        fetch('/api/ferias/' + id, { method: 'DELETE' })
            .then(() => { cargarFerias(); cargarEstadisticas(); });
    }
}

// ==========================================
// SECCIÓN RESERVAS
// ==========================================
function cargarReservas() {
    fetch('/api/reserva')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('reservasTableBody');
            tbody.innerHTML = '';
            
            // Reversa para ver más recientes primero
            const reservasReversas = [...data].reverse();

            reservasReversas.forEach(r => {
                const tr = document.createElement('tr');
                const fechaCorta = new Date(r.timestamp).toLocaleString();
                tr.innerHTML = `
                    <td>${r.nombre}</td>
                    <td>${r.celular}</td>
                    <td>${r.modelo}</td>
                    <td><span class="text-muted small">${fechaCorta}</span></td>
                `;
                tbody.appendChild(tr);
            });
        });
}
