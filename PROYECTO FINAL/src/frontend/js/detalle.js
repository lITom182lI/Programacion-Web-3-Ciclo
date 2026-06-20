/**
 * detalle.js
 * Carga dinámicamente un producto y maneja la galería de imágenes (C3).
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '1';

    fetch(`/api/productos/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Producto no encontrado');
            return res.json();
        })
        .then(producto => {
            // Actualizar textos
            document.getElementById('detail-breadcrumb').textContent = producto.nombre;
            document.getElementById('detail-title').textContent = producto.nombre;
            document.getElementById('detail-price').textContent = `S/ ${producto.precio.toFixed(2)}`;
            document.getElementById('detail-desc').textContent = producto.desc;
            
            // Especificaciones
            const ul = document.querySelector('.list-group-flush');
            ul.innerHTML = `
                <li class="list-group-item"><strong>Capacidad:</strong> ${producto.especificaciones.capacidad}</li>
                <li class="list-group-item"><strong>Compartimento para Laptop:</strong> ${producto.especificaciones.compartimento_laptop}</li>
                <li class="list-group-item"><strong>Material:</strong> ${producto.especificaciones.material}</li>
                <li class="list-group-item"><strong>Origen:</strong> ${producto.origen}</li>
            `;

            // Galería (C3)
            const imgEl = document.getElementById('detail-img');
            imgEl.src = producto.imagen;
            imgEl.alt = producto.nombre;

            // Construir miniaturas si existen múltiples imágenes
            const galeriaContenedor = document.getElementById('galeria-miniaturas');
            if (producto.galeria && producto.galeria.length > 0) {
                // Agregar la imagen principal a la galería visual
                const todasLasImagenes = [producto.imagen, ...producto.galeria];
                
                todasLasImagenes.forEach(imgSrc => {
                    const thumb = document.createElement('img');
                    thumb.src = imgSrc;
                    thumb.alt = 'Miniatura';
                    thumb.className = 'img-thumbnail me-2 mb-2 cursor-pointer';
                    thumb.style.width = '80px';
                    thumb.style.height = '80px';
                    thumb.style.objectFit = 'cover';
                    thumb.style.cursor = 'pointer';
                    
                    thumb.addEventListener('click', () => {
                        imgEl.src = imgSrc;
                    });
                    
                    galeriaContenedor.appendChild(thumb);
                });
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('detail-title').textContent = 'Producto no encontrado';
            document.getElementById('detail-img').src = 'https://via.placeholder.com/600x600?text=Error';
        });
});
