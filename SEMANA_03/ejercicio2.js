// Ejercicio 2: Área total y volumen de un cilindro regular

function calcular() {

    // 1. Obtener los valores de entrada
    const radio  = parseFloat(document.getElementById("radio").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // 2. Validar que ambos campos tengan valores numéricos
    if (isNaN(radio) || isNaN(altura)) {
        alert("Por favor, ingresa todos los valores correctamente.");
        return;
    }

    // 3. Validar que los valores sean estrictamente mayores a cero
    if (radio <= 0 || altura <= 0) {
        alert("El radio y la altura deben ser valores mayores a cero.");
        return;
    }

    // 4. Calcular área total y volumen del cilindro (lógica secuencial)
    const pi          = Math.PI;
    const areaBase    = pi * radio * radio;          // Área de una tapa circular
    const areaLateral = 2 * pi * radio * altura;    // Área lateral del cilindro
    const areaTotal   = 2 * areaBase + areaLateral; // Área total = 2 tapas + lateral
    const volumen     = areaBase * altura;           // Volumen = área base × altura

    // 5. Mostrar resultados
    document.getElementById("area").textContent        = areaTotal.toFixed(2);
    document.getElementById("volumen").textContent     = volumen.toFixed(2);
    document.getElementById("resultado").style.display = "block";
}
