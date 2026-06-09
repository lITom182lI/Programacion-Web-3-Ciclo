// Ejercicio 3: Área y perímetro de un trapecio regular

function calcular() {

    // 1. Obtener los valores de entrada
    const baseMayor = parseFloat(document.getElementById("baseMayor").value);
    const baseMenor = parseFloat(document.getElementById("baseMenor").value);
    const altura    = parseFloat(document.getElementById("altura").value);

    // 2. Validar que todos los campos tengan valores numéricos
    if (isNaN(baseMayor) || isNaN(baseMenor) || isNaN(altura)) {
        alert("Por favor, ingresa todos los valores correctamente.");
        return;
    }

    // 3. Validar que todos los valores sean estrictamente mayores a cero
    if (baseMayor <= 0 || baseMenor <= 0 || altura <= 0) {
        alert("Todos los valores deben ser mayores a cero.");
        return;
    }

    // 4. Validar que la base mayor sea estrictamente mayor que la base menor
    if (baseMenor >= baseMayor) {
        alert("La base mayor debe ser mayor que la base menor.");
        return;
    }

    // 5. Calcular área, lado lateral y perímetro (lógica secuencial)
    const area       = ((baseMayor + baseMenor) / 2) * altura;
    const diferencia = (baseMayor - baseMenor) / 2;
    const lado       = Math.sqrt(altura * altura + diferencia * diferencia);
    const perimetro  = baseMayor + baseMenor + 2 * lado;

    // 6. Mostrar resultados
    document.getElementById("area").textContent        = area.toFixed(2);
    document.getElementById("lado").textContent        = lado.toFixed(2);
    document.getElementById("perimetro").textContent   = perimetro.toFixed(2);
    document.getElementById("resultado").style.display = "block";
}
