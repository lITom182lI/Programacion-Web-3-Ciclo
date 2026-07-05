# Guia de Capturas para Anexos (Proyecto Final)

Basado en el analisis de la **Rubrica de Evaluacion** (DESAFIO20261_UAIN1349R.pdf) y el **Informe Final** (INFORME FINAL.pdf), aqui tienes el desglose exacto de las carpetas y archivos dentro de `src` a los que **debes tomarles captura de pantalla** para los anexos. 

Esta lista esta estructurada **exactamente segun los criterios de la rubrica** para asegurar el puntaje nivel "Avanzado" (20/20):

## 1. Criterio Rubrica: Implementacion del prototipo (HTML, CSS, Bootstrap)
* **Objetivo Avanzado:** HTML semantico, CSS modular con Bootstrap, mobile-first, responsivo.
* **Que capturar en `src/frontend/`:**
  - **`index.html` y `tienda.html`:** Toma capturas de partes del codigo donde se evidencie claramente el uso de **etiquetas HTML5 semanticas** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) y las clases de grillas de **Bootstrap 5** (ej. `col-md-6`, `container`).
  - **Carpeta `src/frontend/css/`:** Captura los archivos de estilos personalizados (por ejemplo, donde se configure el **"Modo Oscuro"** que mencionas en el informe, o los media queries que demuestran el enfoque *mobile-first*).

## 2. Criterio Rubrica: Interactividad con JavaScript
* **Objetivo Avanzado:** Validacion completa (al menos 10 funcionalidades interactivas), codigo modular y **documentado/comentado**.
* **Que capturar en `src/frontend/js/`:**
  - Debes capturar los archivos JS demostrando que separaste la logica (codigo modular). Asegurate de **capturar las partes del codigo que tengan comentarios**.
  - **`cart.js`:** Captura la logica de manipulacion del DOM, el uso de `LocalStorage` y el calculo matematico de subtotales y totales.
  - **`checkout.js` y `registro.js`:** Captura las funciones de validacion de formularios en el cliente.
  - **`tienda.js` o `search.js`:** Captura la funcionalidad de filtrado dinamico del catalogo.

## 3. Criterio Rubrica: Back-end con Node.js y Express.js
* **Objetivo Avanzado:** Servidor con endpoints organizados, procesamiento de formularios y de datos (archivos JSON).
* **Que capturar:**
  - **`src/app.js`:** Captura la configuracion inicial del servidor Express.js y los middlewares (CORS, parseo JSON).
  - **`src/routes/api.js`:** Captura el archivo de rutas para demostrar que los endpoints (GET, POST) estan centralizados y organizados.
  - **Carpeta `src/controllers/`:** Captura la logica de procesamiento de formularios y datos dentro de **`userController.js`**, **`pedidoController.js`** y **`contactController.js`**. Esto valida la "arquitectura estricta en capas" de la que hablas en la pagina 49 de tu informe.
  - **Carpeta `src/data/`:** Toma captura de los archivos **`usuarios.json`**, **`pedidos.json`** y **`contactos.json`** (abiertos, para que se vea el contenido JSON). La rubrica exige literalmente el manejo de "almacenamiento de datos con uno o varios archivos JSON".

## 4. Criterio Rubrica: Accesibilidad y buenas practicas
* **Objetivo Avanzado:** Accesibilidad completa (atributos alt, ARIA), codigo limpio y estructurado.
* **Que capturar:**
  - **Estructura del proyecto (Arbol de carpetas):** Expande tu explorador de archivos en el editor de codigo para que se vea claramente toda la estructura de la carpeta `src` (`controllers/`, `data/`, `frontend/`, `repositories/`, `routes/`, `services/`). Esta es tu prueba principal de "codigo bien estructurado" bajo el patron Cliente-Servidor (MVC).
  - **Accesibilidad en HTML (`src/frontend/*.html`):** Toma una captura especifica apuntando a las etiquetas de imagenes `<img>` donde se vea el uso del atributo `alt="Descripcion..."` o etiquetas ARIA en formularios.
  - **`package.json`:** Captura este archivo para demostrar las dependencias de tu entorno backend (Node.js/Express) correctamente configuradas.

---

### Recomendacion para armar el anexo en el documento final:
Para facilitarle el trabajo al docente que te evaluara, no pongas las capturas sueltas. Agrupalas bajo los siguientes titulos:
1. *Anexo 1: Arquitectura Cliente-Servidor y Patron de Carpetas (Buena estructura)*
2. *Anexo 2: Frontend Semantico, CSS y Accesibilidad (HTML/CSS)*
3. *Anexo 3: Modularidad, Interactividad y Validacion en el Cliente (Javascript)*
4. *Anexo 4: Endpoints, Controladores y Persistencia JSON (Node.js / Express)*
