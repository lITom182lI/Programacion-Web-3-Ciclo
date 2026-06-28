/*
 * checkout.js - MC BACKPACK
 * Resumen de pedido (lee el carrito de cart.js), validación y envío a /api/pedido
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    }

    const cart = getCart();
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const summaryTotals = document.getElementById('checkoutSummaryTotals');
    const emptyNotice = document.getElementById('emptyCartNotice');
    const checkoutForm = document.getElementById('checkoutForm');

    function renderSummary() {
        const currentCart = getCart();

        if (currentCart.length === 0) {
            emptyNotice.classList.remove('d-none');
            checkoutForm.classList.add('d-none');
            summaryItems.innerHTML = '';
            summaryTotals.innerHTML = '';
            return;
        }

        summaryItems.innerHTML = currentCart.map(item => `
            <div class="checkout-summary-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="checkout-summary-item-info">
                    <span class="checkout-summary-item-name">${item.name}</span>
                    <span class="checkout-summary-item-qty">Cantidad: ${item.qty}</span>
                </div>
                <span class="checkout-summary-item-price">S/ ${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `).join('');

        const { subtotal, total } = calcTotals(currentCart);
        summaryTotals.innerHTML = `
            <div class="checkout-totals-row">
                <span>Subtotal</span>
                <span>S/ ${subtotal.toFixed(2)}</span>
            </div>
            <div class="checkout-totals-row checkout-total-main">
                <span>TOTAL :</span>
                <span>S/ ${total.toFixed(2)}</span>
            </div>
        `;
    }

    renderSummary();

    // Toggle de dirección de facturación
    const billingSame = document.getElementById('billingSame');
    const billingDifferent = document.getElementById('billingDifferent');
    const billingAltForm = document.getElementById('billingAltForm');

    [billingSame, billingDifferent].forEach(radio => {
        radio?.addEventListener('change', () => {
            billingAltForm.classList.toggle('d-none', !billingDifferent.checked);
        });
    });

    // Envío del formulario
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fields = {
                ckEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                ckNombre: /.{3,}/,
                ckDni: /^\d{8}$/,
                ckDireccion: /.{5,}/,
                ckCiudad: /.{2,}/
            };

            let isValid = true;
            Object.keys(fields).forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                el.classList.remove('is-invalid');
                if (!fields[id].test(el.value.trim())) {
                    el.classList.add('is-invalid');
                    isValid = false;
                }
            });

            if (!isValid) return;

            const currentCart = getCart();
            const { total } = calcTotals(currentCart);

            const submitBtn = document.getElementById('checkoutSubmitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Procesando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/pedido', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cliente: {
                            email: document.getElementById('ckEmail').value.trim(),
                            nombre: document.getElementById('ckNombre').value.trim(),
                            dni: document.getElementById('ckDni').value.trim(),
                            direccion: document.getElementById('ckDireccion').value.trim(),
                            ciudad: document.getElementById('ckCiudad').value.trim(),
                            codigoPostal: document.getElementById('ckCodigoPostal').value.trim()
                        },
                        items: currentCart,
                        total
                    })
                });

                const data = await response.json();

                if (data.success) {
                    saveCart([]);
                    window.location.href = 'checkout-confirmacion.html';
                } else {
                    alert(data.message || 'No se pudo procesar el pedido.');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                alert('Error de conexión. Intenta nuevamente.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
