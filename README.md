# Práctica Calificada 1: Fundamentos del Desarrollo Web y HTML5

Este repositorio contiene la entrega académica formal para la **Actividad 1** de la Práctica Calificada 1 del curso de **Programación Web**. El proyecto ha sido estructurado siguiendo estándares contemporáneos de arquitectura de información y separación de responsabilidades: maquetación web funcional e informe de sustento teórico bajo la norma internacional de estilo **APA 7ma edición** (100% conforme).

---

## 📁 Estructura del Proyecto

La información y los entregables se organizan en los siguientes directorios modulares:

```text
PRACTICA_CALIFICADA/
│
├── README.md               # Documentación y guía del proyecto (este archivo)
│
├── informe/                # Entregables teóricos y de investigación académica
│   ├── Actividad1_APA7.docx # Reporte Word definitivo compilado en estilo APA 7
│   ├── Actividad1.md       # Transcripción del contenido del informe en Markdown
│   ├── crear_word_actividad1.py # Script de automatización para compilación de Word
│   ├── Guia_Practica_ProgramacionWeb.pdf # Guía de evaluación de la universidad
│   └── figuras/            # Recursos visuales e ilustraciones insertadas
│       ├── figura_1_mapa_conceptual.png   # Mapa conceptual de fundamentos web (Español)
│       ├── figura_2_cliente_servidor.png  # Diagrama secuencial cliente-servidor (Español)
│       └── figura_3_modelo_caja.png       # Diagrama de Modelo de Caja CSS (Español)
│
└── web/                    # Implementación del entregable práctico frontend (Apex Nova Studio)
    ├── index.html          # Estructura semántica en estándar HTML5 con video y subtítulos nativos
    ├── css/                # Hoja de estilos premium organizada de forma externa
    │   └── styles.css      # Reglas y variables CSS3 responsivas y premium
    ├── assets/             # Recursos y recursos multimedia nativos
    │   ├── subtitles/      # Pistas de texto cronometradas WebVTT
    │   │   └── subtitulos.vtt # Archivo de subtítulos para accesibilidad web
    │   └── video/          # Directorio para archivos de video local nativos (.mp4)
    └── docs/               # Materiales y guías teóricas del curso
        └── Tema01Teoria_ProgramacionWeb_26.pdf # Guía teórica oficial de la UPN
```

---

## 📝 Entregables Detallados

### 1. Informe Académico (Normas APA 7ma Edición)
Ubicado en `informe/Actividad1_APA7.docx`, el documento de sustento teórico fue compilado y verificado utilizando las directrices de la guía oficial del consorcio APA:
*   **Tipografía:** Arial 11 pt, interlineado doble (2.0) en la totalidad del texto.
*   **Encabezados:** Capitalización universal (**Title Case**) de 5 niveles sin numeración fija para máxima conformidad de estilo.
*   **Figuras Integradas:**
    *   **Figura 1:** Mapa conceptual exhaustivo y jerárquico de fundamentos web.
    *   **Figura 2:** Diagrama de flujo de interacciones cliente-servidor y protocolo HTTP.
    *   **Figura 3 (Adicional):** Diagrama técnico del Modelo de Caja CSS (Box Model) e interrelación de espaciado.
*   **Citas y Referencias:** Citas narrativas y entre paréntesis adaptadas, aplicando *et al.* inmediato para 3+ autores. La bibliografía final incluye sangría francesa y la eliminación de la ubicación física de las editoriales, conforme a la 7ma edición.

### 2. Desarrollo Frontend (Apex Nova Studio)
Ubicado en `web/`, implementa una página web corporativa para una consultora digital bajo los estándares recomendados por la W3C:
*   **Estructura Semántica y Multimedia:** Uso de etiquetas estructurales e integración nativa de reproducción multimedia (`<video>` y `<track>`) con subtítulos cronometrados en formato estándar **WebVTT (.vtt)** para total conformidad con las pautas de accesibilidad e inclusión del curso.
*   **Estilos y Composición:** Hoja de estilos externa `css/styles.css` con variables CSS3, CSS Grid responsivo, selectores optimizados y micro-animaciones premium de hover.

---

## 🚀 Compilación del Reporte Word

Si desea realizar alguna edición al contenido o re-compilar el documento Word de forma automática, puede ejecutar el script en Python desde el directorio `informe/`:

```bash
# Navegar a la carpeta del informe
cd informe

# Ejecutar la automatización de Word (requiere librería 'python-docx')
python crear_word_actividad1.py
```

El script validará automáticamente los paths de las figuras y re-generará el archivo `Actividad1_APA7.docx` conservando todo el formato de manera impecable.

---
*Elaborado con excelencia y rigor académico de nivel profesional.*
