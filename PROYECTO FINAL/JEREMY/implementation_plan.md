# Reestructuración Frontend: Réplica Exacta de Figma

Entiendo tu requerimiento. Mi plan anterior utilizó plantillas de Bootstrap genéricas, lo cual no refleja el diseño exclusivo del Figma. Para solucionarlo, voy a reescribir por completo la capa visual para que sea una réplica **1 a 1** de tu prototipo.

> [!WARNING]
> **User Review Required**
> Este plan implica sobreescribir `index.html` y `style.css` para remover las estructuras prefabricadas de Bootstrap y aplicar tus diseños, fondos, posiciones e imágenes exactas. Si estás de acuerdo, haz clic en **Proceed**.

## Proposed Changes

### 1. Extracción de Activos (Assets)
- Usaré la herramienta `download_figma_images` para descargar todas las imágenes, logos vectoriales y fondos directamente de tu archivo Figma y guardarlos en `src/frontend/assets/`.

### 2. Estructura HTML (`index.html`)
#### [MODIFY] [index.html](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/index.html)
- **Header:** Replicación del menú ("Sobre nosotros", "Contacto", "Envíos", "Devoluciones") con la tipografía exacta `42dot Sans`.
- **Hero:** Texto masivo "ANTIGRAVITY" usando la fuente `Monoton` en 200px (ajustado para responsive) y el fondo oscuro con degradado linear de Figma: `linear-gradient(270deg, rgba(97, 98, 19, 1) 23%, rgba(0, 0, 0, 1) 75%)`.
- **Secciones Intermedias:** Creación de las tarjetas "MC BACKPACK" (Mochilas, Accesorios) utilizando exactamente el mismo tamaño, espaciado e imágenes que el archivo de diseño, usando fuentes `Host Grotesk` y `Questrial`.
- **Newsletter / Footer:** Fondo oscuro, input para "tu@email.com" y el texto de aceptación de políticas exactamente como está diagramado.

### 3. Sistema de Diseño CSS (`style.css`)
#### [MODIFY] [style.css](file:///c:/Users/PC/Desktop/Programacion-web/Programacion-Web-3-Ciclo/PROYECTO%20FINAL/src/frontend/css/style.css)
- Implementaré **CSS Grid/Flexbox** a medida para posicionar los elementos exactamente donde van, sin depender del layout de columnas estándar de Bootstrap si este rompe tu diseño. Bootstrap solo se mantendrá para la funcionalidad JS requerida (ej. Carrusel) y resets básicos, pero todo el aspecto visual se regirá estrictamente por el CSS personalizado.
- Se incluirán exactamente los colores: `#303017`, `#737417`, `#D9D9D9`, `#060606`, etc.

## Verification Plan
1. Descargar las imágenes de Figma.
2. Reescribir el HTML y CSS basándome en las coordenadas y estilos absolutos y relativos de la data extraída de Figma.
3. Asegurar que las 10 funcionalidades JS sigan operando correctamente dentro de la nueva estructura.
