# Reporte Formal de Accesibilidad (WCAG 2.1 & Lighthouse)
**Proyecto:** MC BackPack - Catálogo y Reservas
**Fecha de Auditoría:** Junio 2026

## 1. Resultados Generales (Objetivo: >80/100)
Las páginas principales (`index.html`, `detalle.html`, `ferias.html`, `reserva.html`) han sido optimizadas estructural y semánticamente. La arquitectura está preparada para obtener una puntuación de **100/100** en la auditoría de accesibilidad de Google Lighthouse y para justificar las alertas de contraste en herramientas como WebAIM WAVE.

## 2. Auditoría de Criterios WCAG Cumplidos

### 2.1. Percepción (Criterios visuales y auditivos)
- **Contraste de Color (WCAG 1.4.3 - Nivel AA/AAA):** 
  - El color primario (`--brand-primary`: `#0056b3`) sobre fondo blanco (`#ffffff`) tiene un ratio de contraste superior a **4.5:1** (Pasa AA).
  - **Botón de WhatsApp (`.btn-success` modificado):**
    - En estado de reposo (fondo `#25D366` / texto `#111`), el ratio de contraste es de **≈ 9.5:1**, lo cual aprueba holgadamente el Nivel **AAA**.
    - En estado `hover/focus` (fondo `#128C7E` / texto `#ffffff`), el ratio de contraste se reduce a **≈ 4.1:1**. Esto aprueba el Nivel **AA** *únicamente* porque el botón implementa las clases `.btn-lg` y `.fw-bold`, lo que lo califica ante la WCAG como "Texto Grande" (el cual exige un mínimo de 3.0:1 en vez de 4.5:1).
- **Textos Alternativos (WCAG 1.1.1):** Todas las etiquetas `<img>` cuentan con el atributo `alt="..."` descriptivo. El logotipo de navegación cuenta además con un manejador en caso de error de carga.

### 2.2. Operatividad (Navegación por Teclado y Ayudas)
- **Enlaces de Salto (Skip Links) (WCAG 2.4.1):** Se ha implementado el código `<a href="#main-content" class="skip-link visually-hidden-focusable">Saltar al contenido principal</a>` al inicio del `<body>` en todas y cada una de las 5 pantallas, lo cual permite saltar el bloque de navegación repetitivo.
- **Foco Visible (WCAG 2.4.7):** Elementos interactivos nativos de Bootstrap proveen un *focus ring* visible y accesible que resalta el componente al navegar con la tecla Tabulador.

### 2.3. Comprensibilidad (Lectores de Pantalla y Formularios)
- **Etiquetas y Entradas (WCAG 3.3.2):** Se comprobó que en `reserva.html` todos los campos (Nombre, Celular, Modelo, Mensaje) tienen el atributo `<label for="[id]">` exactamente vinculado con el `id="..."` de la caja de texto o selector (`<select>`). El `<form>` del buscador usa `aria-label="Término de búsqueda"`.
- **Mensajes de Error Específicos (WCAG 3.3.1):** El validador JavaScript implementado inyecta un div debajo del campo de celular cuando hay error (Regex de celular peruano). El lector de pantalla lo identifica gracias al atributo `aria-describedby`.

## 3. Instrucciones para la Validación Final (Paso 4)
Para incluir el screenshot real en el *INFORME FINAL.docx*:
1. Ejecuta el servidor (`npm start`).
2. Abre Google Chrome y entra a `http://localhost:3000`.
3. Presiona **F12** y ve a la pestaña **Lighthouse**.
4. Selecciona **Solo Accesibilidad** y dale clic en **Analizar carga de página**.
5. Toma un screenshot al círculo verde de puntuación y adjúntalo bajo este documento.
