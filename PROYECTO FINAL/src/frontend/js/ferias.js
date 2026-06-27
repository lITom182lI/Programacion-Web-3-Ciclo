/**
 * ferias.js
 * Carga ferias y determina la activa dinámicamente comparando fechas (C5).
 */

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/ferias')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaFerias');
            lista.innerHTML = '';
            
            // Formatear hoy a YYYY-MM-DD usando hora local de Perú
            const hoyStr = obtenerFechaLocalISO();

            data.forEach(feria => {
                const li = document.createElement('li');
                li.className = 'list-group-item p-4';
                
                // C5: Comparación 100% dinámica de fechas (Opción A)
                // Se eliminó el override manual (estado_activa) para que el sistema
                // dependa exclusivamente de la fecha actual vs fecha_iso.
                const esActiva = (feria.fecha_iso === hoyStr); 
                
                if (esActiva) {
                    li.innerHTML = `
                        <h3 class="h5 text-primary">${feria.nombre}</h3>
                        <p class="mb-1"><strong>Lugar:</strong> ${feria.lugar}</p>
                        <p class="mb-1"><strong>Fecha:</strong> ${feria.fecha}</p>
                        <p class="mb-2"><strong>Horario:</strong> ${feria.horario}</p>
                        <span class="badge bg-success fs-6">Feria Activa Hoy</span>
                    `;
                } else {
                    li.innerHTML = `
                        <h3 class="h5 text-dark">${feria.nombre}</h3>
                        <p class="mb-1"><strong>Lugar:</strong> ${feria.lugar}</p>
                        <p class="mb-1"><strong>Fecha:</strong> ${feria.fecha}</p>
                        <p class="mb-0"><strong>Horario:</strong> ${feria.horario}</p>
                    `;
                }
                lista.appendChild(li);
            });

            const footerLi = document.createElement('li');
            footerLi.className = 'list-group-item p-4 bg-light';
            footerLi.innerHTML = '<p class="mb-0 text-center text-muted">¿Te perdiste una feria? <a href="reserva.html" class="fw-bold">Contáctanos para envíos</a>.</p>';
            lista.appendChild(footerLi);
        })
        .catch(error => console.error('Error cargando ferias:', error));
});
