// Capturar el evento submit del formulario
document.getElementById("contactoForm").addEventListener("submit", function(event) {

    // Prevenir que la página se recargue
    event.preventDefault();

    // Obtener los valores de los campos
    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var edad   = parseInt(document.getElementById("edad").value);

    // Validación 1: verificar que ningún campo esté vacío y que la edad sea un número
    if (nombre === "" || correo === "" || isNaN(edad)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Validación 2: verificar que el usuario sea mayor de 18 años
    if (edad < 18) {
        alert("Debes tener al menos 18 años para participar.");
        return;
    }

    // Si pasa las validaciones, mostrar mensaje de éxito
    alert("Formulario enviado correctamente. ¡Gracias por participar!");
});
