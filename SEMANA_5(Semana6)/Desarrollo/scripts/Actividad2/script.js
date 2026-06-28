"use strict";
/**
 * Función para calcular el descuento de una compra.
 */
const calcularDescuento = () => {
    // Obtención de elementos del DOM
    const inputMonto = document.getElementById("monto");
    const inputCategoria = document.getElementById("categoria");
    const divResultado = document.getElementById("resultado");

    // Extracción y conversión de valores
    const monto = parseFloat(inputMonto.value);
    const categoria = inputCategoria.value;

    // Validación de datos de entrada
    if (isNaN(monto) || monto <= 0) {
        divResultado.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> Por favor, ingrese un monto numérico válido y mayor a 0.
            </div>`;
        return; // Detiene la ejecución cronológica si hay error
    }

    // Inicialización de variables
    let porcentajeDescuento = 0;
    let mensajeDescuento = "";

    // Lógica de cálculo de descuento
    if (monto >= 1000 && categoria === "vip") {
        porcentajeDescuento = 0.20; // 20% de descuento
        mensajeDescuento = "¡Excelente! Has aplicado al descuento VIP del 20%.";
    } else if (monto >= 500 || categoria === "frecuente") {
        porcentajeDescuento = 0.10; // 10% de descuento
        mensajeDescuento = "Has obtenido el descuento de Cliente Frecuente (10%).";
    } else {
        porcentajeDescuento = 0.00; // Sin descuento
        mensajeDescuento = "No se aplicaron descuentos especiales en esta compra.";
    }

    // Cálculo final
    const montoDescontado = monto * porcentajeDescuento;
    const totalPagar = monto - montoDescontado;

    // Renderizado en el DOM
    divResultado.innerHTML = `
        <div class="alert alert-success mt-3 shadow-sm" role="alert">
            <h5 class="alert-heading fw-bold">Resumen de tu Compra</h5>
            <p>${mensajeDescuento}</p>
            <hr>
            <div class="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>S/ ${monto.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between text-danger">
                <span>Descuento:</span>
                <span>- S/ ${montoDescontado.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between mt-2 fs-5 fw-bold text-dark">
                <span>Total a Pagar:</span>
                <span>S/ ${totalPagar.toFixed(2)}</span>
            </div>
        </div>
    `;
};
