# 🎒 MC BACKPACK - Aplicación Web Completada

La aplicación ha sido completamente reescrita para ser una réplica fiel del diseño de Figma. A continuación, las capturas de pantalla de cada sección:

## Hero Section (Inicio)

![Hero Section - MC BACKPACK con degradado verde oscuro/negro, tipografía Monoton y Raleway](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/hero_section_top_1782621668519.png)

- Texto "MC" en fuente **Monoton** (200px responsive)
- "BACKPACK" en fuente **Raleway ExtraBold** con letter-spacing
- Fondo con degradado exacto del Figma: `linear-gradient(270deg, rgba(97,98,19,1) 23%, rgba(0,0,0,1) 75%)`
- Navbar con logo circular "MC", enlaces de navegación e iconos reales del Figma

## Productos - Mochilas Destacados

![Mochilas Destacados - Grid de 4 productos con imágenes reales del Figma](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/mochilas_destacados_1782621676937.png)

- Imágenes extraídas directamente del Figma (4 mochilas)
- Cards con `border-radius: 20px 23px 23px 23px` exacto
- Tipografías, precios y categorías tal cual el diseño

## Productos - Carteras Destacadas

![Carteras Destacadas con badges LIMITADO, DESTACADO, NUEVO y filtros](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/carteras_destacadas_1782621696117.png)

- Badges de colores: rojo (`#9E2424`), amarillo (`#F4AA31`), rosa (`#FA2EB6`)
- Filtros por categoría funcionales

## Productos - Artículos Destacados

![Artículos Destacados - accesorios Kratos, Corazón araña, Kawaii, Kirby](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/articulos_destacados_section_1782621969180.png)

## Newsletter

![Newsletter - suscripción con fondo verde oliva del Figma](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/newsletter_section_1782621978792.png)

- Fondo `#737417` (primary-light) con border-radius 20px
- Input + botón "ENVIAR" replicando el diseño del footer del Figma

## Contacto + Footer

![Formulario de contacto con degradado y footer MC BACKPACK](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/contact_end_and_footer_1782622075040.png)

- Formulario con inputs `border-radius: 20px` y borde verde oliva
- Footer con fondo `#303017`, iconos sociales del Figma e información de marca

## Grabación del navegador

![Recorrido completo de la página](C:/Users/PC/.gemini/antigravity-ide/brain/0cc9b17b-4fde-4528-961f-f986f4062297/homepage_preview_1782621542048.webp)

## Resumen técnico

| Componente | Archivo | Descripción |
|---|---|---|
| Servidor | [app.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/app.js) | Express + CORS + servir estáticos |
| Rutas API | [api.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/routes/api.js) | POST /api/contacto |
| Controlador | [contactController.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/controllers/contactController.js) | Validación y respuesta HTTP |
| Servicio | [contactService.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/services/contactService.js) | Lógica de negocio |
| Repositorio | [contactRepository.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/repositories/contactRepository.js) | Persistencia en JSON |
| HTML | [index.html](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/index.html) | Estructura semántica + Bootstrap + Accesibilidad |
| CSS | [style.css](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/css/style.css) | Diseño Figma-accurate con CSS Variables |
| JS | [main.js](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/js/main.js) | 10 funcionalidades interactivas documentadas |
| Assets | [assets/](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/assets) | 17 imágenes extraídas de Figma |
