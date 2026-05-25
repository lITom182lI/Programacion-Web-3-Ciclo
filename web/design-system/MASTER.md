# MASTER.md — Sistema de Diseño Oficial de Apex Nova Studio

Este manifiesto consolidado representa la fuente única de verdad para el sistema de diseño visual, accesibilidad y usabilidad corporativa de **Apex Nova Studio**. Asegura la coherencia de marca en futuras implementaciones y expansiones del proyecto.

---

## 1. Identidad de Marca y Propósito

- **Nombre Oficial**: Apex Nova Studio
- **Propósito del Software**: Consultoría de Diseño Digital, Desarrollo Web de Alto Rendimiento y Posicionamiento SEO Estratégico.
- **Enfoque Heurístico**: Visibilidad de estados clara, reducción drástica de fricción cognitiva en formularios y consistencia visual premium en modo oscuro.

---

## 2. Tokens del Sistema de Diseño (Variables CSS)

Los siguientes tokens han sido extraídos del archivo de estilos corporativos principal y mapeados de forma semántica:

| Token Semántico | Código Hexadecimal (`#HEX`) | Propósito y Uso |
| :--- | :--- | :--- |
| **Color de Fondo** | `#0b0f19` | Superficie primaria de lectura en modo oscuro tecnológico. |
| **Fondo de Tarjeta** | `#151b2d` | Superficie secundaria para tarjetas, formularios y aside. |
| **Acento Primario** | `#3b82f6` (Azul Eléctrico) | Botones principales, enlaces en foco e iluminaciones. |
| **Acento Secundario** | `#8b5cf6` (Púrpura Neón) | Degradados de marca e indicadores de servicios. |
| **Acento de Realce** | `#10b981` (Verde Esmeralda) | Indicadores de éxito, validaciones y badges técnicos. |
| **Texto Principal** | `#f3f4f6` (Gris Claro) | Tipografía estándar para cuerpo y labels. |
| **Texto Secundario** | `#9ca3af` (Gris Mutado) | Subtítulos, descripciones secundarias y helper text. |

---

## 3. Tipografía del Sistema

- **Fuente Principal**: `Outfit` (importada desde Google Fonts).
- **Tipografía de Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Estrategia de Escala**:
  - Encabezados Principales (`h1`): `3.5rem` (con degradados de color).
  - Títulos de Sección (`h2`): `2.25rem` (peso 800).
  - Subtítulos de Lectura (`.section-subtitle`): `1.05rem` (color mutado).
  - Texto de Cuerpo y Inputs: `16px` (mínimo responsivo para evitar zoom automático en dispositivos móviles).

---

## 4. Políticas de Diseño y Accesibilidad (WCAG 2.2)

- **Relación de Contraste**: Todo texto sobre tarjetas (`#151b2d`) o fondo principal (`#0b0f19`) debe mantener un contraste mínimo de **4.5:1** (nivel AA).
- **Icons Policy**: Se prohíbe de forma absoluta el uso de emojis para navegación, servicios o aside. Se inyectan únicamente inline SVGs con un grosor de trazo de `1.8px`.
- **Área Táctil Responsiva**: Todo botón e input interactivo mantiene dimensiones físicas superiores a **44×44 pt** y espaciados mínimos de `8px`.
- **Compensación de Cabecera**: Todas las secciones con anclaje integran `scroll-margin-top: 6.5rem;` para evitar colisiones con el menú fijo de la parte superior.
