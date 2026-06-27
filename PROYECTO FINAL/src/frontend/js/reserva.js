/**
 * reserva.js
 * Validación estricta y envío de formulario (C4).
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formReserva');
    const inputCelular = document.getElementById('celular');
    const selectModelo = document.getElementById('modelo');

    // Carga dinámica de productos disponibles, agrupados por categoría
    fetch('/api/productos')
        .then(res => res.json())
        .then(productos => {
            const categorias = {};
            productos.forEach(p => {
                if (!categorias[p.categoria]) categorias[p.categoria] = [];
                categorias[p.categoria].push(p);
            });

            Object.keys(categorias).sort().forEach(categoria => {
                const grupo = document.createElement('optgroup');
                grupo.label = categoria + 's';
                categorias[categoria].forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p.nombre;
                    opt.textContent = `${p.nombre} (S/ ${parseFloat(p.precio).toFixed(2)})`;
                    grupo.appendChild(opt);
                });
                selectModelo.appendChild(grupo);
            });
        })
        .catch(err => console.error('Error cargando productos para el formulario:', err));


    // Contenedor de error específico para celular (WCAG 3.3.1)
    const errorCelular = document.createElement('div');
    errorCelular.className = 'text-danger mt-1 fw-bold d-none';
    errorCelular.id = 'error-celular-msg';
    errorCelular.textContent = 'El celular debe iniciar con 9 y tener 9 dígitos numéricos exactos.';
    
    inputCelular.parentNode.insertBefore(errorCelular, inputCelular.nextSibling);
    inputCelular.setAttribute('aria-describedby', 'error-celular-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validación estricta del celular
        const celularRegex = /^9\d{8}$/;
        const celularVal = inputCelular.value.trim();
        
        if (!celularRegex.test(celularVal)) {
            inputCelular.classList.add('is-invalid');
            errorCelular.classList.remove('d-none');
            inputCelular.focus();
            return; // Bloquea el envío
        } else {
            inputCelular.classList.remove('is-invalid');
            errorCelular.classList.add('d-none');
        }

        const formData = {
            nombre: document.getElementById('nombre').value,
            celular: celularVal,
            modelo: document.getElementById('modelo').value,
            mensaje: document.getElementById('mensaje').value
        };

        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Enviando...';

        fetch('/api/reserva', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            btn.disabled = false;
            btn.textContent = 'Enviar Solicitud';

            if(data.success) {
                document.getElementById('reservaMensaje').innerHTML = '<div class="alert alert-success mt-3" role="alert">¡Reserva enviada con éxito! Nos contactaremos pronto.</div>';
                form.reset();
            } else {
                document.getElementById('reservaMensaje').innerHTML = '<div class="alert alert-danger mt-3" role="alert">Error: ' + data.error + '</div>';
            }
        })
        .catch(err => {
            btn.disabled = false;
            btn.textContent = 'Enviar Solicitud';
            document.getElementById('reservaMensaje').innerHTML = '<div class="alert alert-danger mt-3" role="alert">Error de conexión. Inténtalo de nuevo.</div>';
        });
    });
});
