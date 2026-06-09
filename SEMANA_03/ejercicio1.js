// Ejercicio 1: Recibo de consumo de agua

function calcular() {

    // 1. Obtener los valores de entrada
    const lecturaActual   = parseFloat(document.getElementById("lecturaActual").value);
    const lecturaAnterior = parseFloat(document.getElementById("lecturaAnterior").value);
    const tarifa          = parseFloat(document.getElementById("tarifa").value);

    // 2. Validar que todos los campos tengan valores numéricos
    if (isNaN(lecturaActual) || isNaN(lecturaAnterior) || isNaN(tarifa)) {
        alert("Por favor, ingresa todos los valores correctamente.");
        return;
    }

    // 3. Validar que los valores sean positivos
    if (lecturaActual <= 0 || lecturaAnterior <= 0 || tarifa <= 0) {
        alert("Todos los valores deben ser mayores a cero.");
        return;
    }

    // 4. Validar que la lectura actual sea mayor que la anterior
    if (lecturaActual < lecturaAnterior) {
        alert("La lectura actual no puede ser menor que la lectura anterior.");
        return;
    }

    // 5. Calcular consumo y pago (lógica secuencial)
    const consumo = lecturaActual - lecturaAnterior;
    const pago    = consumo * tarifa;

    // 6. Mostrar resultados
    document.getElementById("consumo").textContent     = consumo.toFixed(2);
    document.getElementById("pago").textContent        = "S/ " + pago.toFixed(2);
    document.getElementById("resultado").style.display = "block";
}
