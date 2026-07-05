/*
 * cart.js - MC BACKPACK
 * Estado del carrito (localStorage) + drawer lateral, compartido en todas las páginas
 * =====================================================
 */

const CART_KEY = 'mc_cart';
const FREE_SHIPPING_THRESHOLD = 215;

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartDrawer();
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
    openCartDrawer();
}

function removeFromCart(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
}

function updateQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    saveCart(cart);
}

function calcTotals(cart) {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    return { subtotal, total: subtotal, missingForFreeShipping };
}

function injectCartDrawer() {
    if (document.getElementById('cartDrawer')) return;

    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';

    const drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.setAttribute('aria-label', 'Carrito de compras');
    drawer.innerHTML = `
        <div class="cart-drawer-header">
            <span class="cart-drawer-title">Carrito</span>
            <button type="button" class="cart-drawer-close" id="cartDrawerClose" aria-label="Cerrar carrito">&times;</button>
        </div>
        <div class="cart-drawer-body" id="cartDrawerBody"></div>
        <div class="cart-drawer-footer d-none" id="cartDrawerFooter"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    overlay.addEventListener('click', closeCartDrawer);
    document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);
}

function openCartDrawer() {
    document.getElementById('cartOverlay')?.classList.add('show');
    document.getElementById('cartDrawer')?.classList.add('show');
}

function closeCartDrawer() {
    document.getElementById('cartOverlay')?.classList.remove('show');
    document.getElementById('cartDrawer')?.classList.remove('show');
}

function renderCartDrawer() {
    const body = document.getElementById('cartDrawerBody');
    const footer = document.getElementById('cartDrawerFooter');
    if (!body || !footer) return;

    const cart = getCart();
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

    // Badge en el ícono del navbar
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalQty.toString();
        badge.classList.toggle('d-none', totalQty === 0);
    }

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <p class="cart-empty-text">Su carrito está vacío</p>
                <a href="tienda.html" class="btn-explore">EMPEZAR A COMPRAR</a>
            </div>
        `;
        footer.classList.add('d-none');
        footer.innerHTML = '';
        return;
    }

    const { subtotal, total, missingForFreeShipping } = calcTotals(cart);

    const shippingBanner = missingForFreeShipping > 0
        ? `<div class="cart-shipping-banner">¡Gasta S/ ${missingForFreeShipping.toFixed(2)} más y obtén el envío gratuito!</div>`
        : `<div class="cart-shipping-banner">¡Tu pedido tiene envío gratuito!</div>`;

    const itemsHtml = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img-wrap">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            </div>
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-origin">${item.origin || ''}</span>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">S/ ${(item.price * item.qty).toFixed(2)}</span>
                    <div class="cart-qty-controls">
                        <button type="button" class="cart-qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Restar cantidad">−</button>
                        <span class="cart-qty-value">${item.qty}</span>
                        <button type="button" class="cart-qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Sumar cantidad">+</button>
                    </div>
                </div>
                <button type="button" class="cart-item-remove" data-id="${item.id}">Eliminar</button>
            </div>
        </div>
    `).join('');

    body.innerHTML = `${shippingBanner}<div class="cart-items">${itemsHtml}</div><p class="cart-shipping-note">Envío e impuestos calculados en el momento de la compra.</p>`;

    footer.classList.remove('d-none');
    footer.innerHTML = `
        <div class="cart-totals-row">
            <span>Subtotal</span>
            <span>S/ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-totals-row cart-total-main">
            <span>TOTAL :</span>
            <span>S/ ${total.toFixed(2)}</span>
        </div>
        <a href="checkout.html" class="cart-checkout-btn">PAGAR</a>
    `;

    // Delegación de eventos para qty/eliminar
    body.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => updateQty(btn.dataset.id, -1));
    });
    body.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => updateQty(btn.dataset.id, 1));
    });
    body.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    injectCartDrawer();
    renderCartDrawer();

    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    }

    // Botones "Añadir al carrito" en las tarjetas de producto (index.html, tienda.html)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;

        const card = btn.closest('[data-id]');
        if (!card) return;

        const name = card.querySelector('.product-name, .shop-name')?.textContent.trim() || 'Producto';
        const priceText = card.querySelector('.product-price, .shop-price')?.textContent.trim() || '0';
        const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
        const img = card.querySelector('img')?.getAttribute('src') || '';
        const origin = card.querySelector('.product-origin, .shop-origin')?.textContent.trim() || '';
        const category = card.dataset.category || '';

        addToCart({ id: card.dataset.id, name, price, img, origin, category });
    });
});
