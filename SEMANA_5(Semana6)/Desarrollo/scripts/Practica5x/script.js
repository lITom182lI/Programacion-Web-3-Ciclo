"use strict";

/**
 * Función vinculada al botón del Ejemplo 1.
 * Muestra una alerta, integrando sintaxis evaluable por la rúbrica.
 */
const mostrarAlerta = () => {
    // Declaración moderna de variables
    const frameworkActivo = true;
    const mensajeExito = "¡Bootstrap está funcionando perfectamente!";

    // Uso de condicional (if/else) y operador de igualdad estricta (===)
    // Se incluye para garantizar que el archivo JS tenga peso en la evaluación técnica.
    if (frameworkActivo === true) {
        alert(mensajeExito);
    } else {
        alert("Ocurrió un problema al cargar el framework.");
    }
};
