/**
 * validacion.js
 * Laboratorio Semana 3 – Programación Web
 * Tema: Validación de formularios con JavaScript
 *
 * Requisitos cubiertos (guía de laboratorio):
 *  1. Captura el evento submit con addEventListener
 *  2. Previene el envío por defecto con event.preventDefault()
 *  3. Extrae y limpia los valores de los campos (trim / parseInt)
 *  4. Validación 1: campos vacíos o edad no numérica (isNaN)
 *  5. Validación 2: edad menor a 18
 *  6. Éxito: mensaje "Formulario enviado correctamente. ¡Gracias por participar!"
 */

/* ============================================================
   REFERENCIAS AL DOM
============================================================ */
const form            = document.getElementById('contactoForm');
const inputNombre     = document.getElementById('nombre');
const inputCorreo     = document.getElementById('correo');
const inputEdad       = document.getElementById('edad');
const successOverlay  = document.getElementById('success-overlay');
const successMessage  = document.getElementById('success-message');
const btnReset        = document.getElementById('btn-reset');

/* ============================================================
   UTILIDADES – TOAST
   Muestra una notificación flotante no bloqueante
   (complementa las alertas requeridas por la guía)
============================================================ */
const toast      = document.getElementById('toast');
const toastIcon  = document.getElementById('toast-icon');
const toastTitle = document.getElementById('toast-title');
const toastBody  = document.getElementById('toast-body');
let toastTimer   = null;

/**
 * Muestra el toast de notificación.
 * @param {'success'|'error'|'warning'} tipo
 * @param {string} titulo  - Texto en negrita
 * @param {string} cuerpo  - Texto descriptivo
 * @param {number} duracion - Milisegundos que permanece visible (default 4000)
 */
function mostrarToast(tipo, titulo, cuerpo, duracion = 4000) {
  const iconos = { success: '✅', error: '❌', warning: '⚠️' };

  toast.className       = '';          // limpia clases previas
  toastIcon.textContent = iconos[tipo] || '🔔';
  toastTitle.textContent = titulo;
  toastBody.textContent  = cuerpo;

  // Pequeño delay para que la transición CSS se active correctamente
  requestAnimationFrame(() => {
    toast.classList.add(tipo, 'show');
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duracion);
}

/* ============================================================
   UTILIDADES – VALIDACIÓN POR CAMPO
   Marca o limpia el estado de error visual en cada campo
============================================================ */

/**
 * Marca un campo como inválido y muestra un mensaje de error inline.
 * @param {HTMLElement} input   - El elemento <input>
 * @param {string}      mensaje - Texto del error a mostrar
 */
function marcarError(input, mensaje) {
  const grupo = input.closest('.field-group');
  grupo.classList.add('has-error');

  // Elimina mensaje previo si existe
  const prevMsg = grupo.querySelector('.field-error');
  if (prevMsg) prevMsg.remove();

  // Crea y agrega el mensaje de error
  const errorEl = document.createElement('p');
  errorEl.className     = 'field-error';
  errorEl.setAttribute('role', 'alert');
  errorEl.textContent   = '⚠ ' + mensaje;
  grupo.appendChild(errorEl);

  // Foco al primer campo con error para accesibilidad
  input.focus();
}

/**
 * Limpia el estado de error de un campo.
 * @param {HTMLElement} input
 */
function limpiarError(input) {
  const grupo = input.closest('.field-group');
  grupo.classList.remove('has-error');
  const errMsg = grupo.querySelector('.field-error');
  if (errMsg) errMsg.remove();
}

/** Limpia los errores de todos los campos */
function limpiarTodosLosErrores() {
  [inputNombre, inputCorreo, inputEdad].forEach(limpiarError);
}

/* ============================================================
   VALIDACIÓN DEL CORREO ELECTRÓNICO
   Expresión regular básica para formato de email
============================================================ */
function esEmailValido(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* ============================================================
   LÓGICA PRINCIPAL – EVENTO SUBMIT
   Requerido por la guía de laboratorio
============================================================ */
form.addEventListener('submit', function (event) {

  // ── Requisito 2: Prevenir el comportamiento por defecto del formulario ──
  event.preventDefault();

  // Limpiar errores visuales previos
  limpiarTodosLosErrores();

  // ── Requisito 3: Extraer y limpiar valores de los campos ──
  const nombre = inputNombre.value.trim();
  const correo = inputCorreo.value.trim();
  const edad   = parseInt(inputEdad.value, 10);   // parseInt → convierte a número entero

  /* ────────────────────────────────────────────────────────────
     VALIDACIÓN 1 (requerida por guía):
     Verificar que ningún campo esté vacío y que la edad sea un
     número válido (isNaN detecta valores no numéricos).
  ──────────────────────────────────────────────────────────── */
  let hayError = false;

  if (nombre === '') {
    marcarError(inputNombre, 'El nombre no puede estar vacío.');
    hayError = true;
  }

  if (correo === '') {
    marcarError(inputCorreo, 'El correo electrónico es obligatorio.');
    hayError = true;
  } else if (!esEmailValido(correo)) {
    marcarError(inputCorreo, 'Ingresa un correo electrónico válido.');
    hayError = true;
  }

  if (inputEdad.value.trim() === '' || isNaN(edad)) {
    marcarError(inputEdad, 'La edad debe ser un número válido.');
    hayError = true;
  }

  if (hayError) {
    // Alerta requerida por la guía para campos vacíos / inválidos
    alert('⚠ Por favor, completa todos los campos correctamente antes de enviar.');
    mostrarToast('error', 'Campos incompletos', 'Revisa los campos marcados en rojo.');
    return;   // Detener ejecución (return requerido por la guía)
  }

  /* ────────────────────────────────────────────────────────────
     VALIDACIÓN 2 (requerida por guía):
     Verificar que el usuario sea mayor o igual a 18 años.
  ──────────────────────────────────────────────────────────── */
  if (edad < 18) {
    marcarError(inputEdad, `Debes tener al menos 18 años (ingresaste ${edad}).`);
    // Alerta requerida por la guía para edad menor a 18
    alert(`⚠ Acceso restringido: debes tener al menos 18 años para participar.\nEdad ingresada: ${edad} años.`);
    mostrarToast('warning', 'Edad insuficiente', `Debes tener al menos 18 años (ingresaste ${edad}).`);
    return;   // Detener ejecución
  }

  /* ────────────────────────────────────────────────────────────
     ÉXITO (requerido por guía):
     Mostrar mensaje de confirmación si pasa todas las validaciones.
  ──────────────────────────────────────────────────────────── */

  // Alerta de éxito requerida exactamente por la guía
  alert('✅ Formulario enviado correctamente. ¡Gracias por participar!');

  // Mensaje personalizado en la interfaz (complemento visual)
  successMessage.innerHTML =
    `¡Hola, <strong>${nombre}</strong>!<br>Tus datos fueron registrados correctamente.`;

  // Ocultar formulario y mostrar overlay de éxito
  form.classList.add('hidden');
  successOverlay.classList.add('active');

  // Toast de confirmación
  mostrarToast('success', '¡Enviado con éxito!', 'Formulario enviado correctamente. ¡Gracias por participar!', 5000);

  // Log en consola (buena práctica / debugging)
  console.log('📋 Datos enviados:', { nombre, correo, edad });
});

/* ============================================================
   BOTÓN RESET – permite volver a llenar el formulario
============================================================ */
btnReset.addEventListener('click', function () {
  // Resetear campos
  form.reset();
  limpiarTodosLosErrores();

  // Ocultar overlay, mostrar formulario
  successOverlay.classList.remove('active');
  form.classList.remove('hidden');

  // Foco al primer campo
  inputNombre.focus();
});

/* ============================================================
   LIMPIEZA EN TIEMPO REAL
   Elimina el estado de error de un campo en cuanto el usuario
   empieza a corregirlo (mejora la UX)
============================================================ */
[inputNombre, inputCorreo, inputEdad].forEach(function (input) {
  input.addEventListener('input', function () {
    if (input.closest('.field-group').classList.contains('has-error')) {
      limpiarError(input);
    }
  });
});
