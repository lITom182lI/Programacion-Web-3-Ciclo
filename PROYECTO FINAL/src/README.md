# MC BackPack - Proyecto Final E-Commerce

Este proyecto es una plataforma de comercio electrónico desarrollada con HTML5, CSS3, JavaScript (Frontend) y Node.js con Express (Backend). Sigue las siguientes instrucciones para ejecutar el proyecto correctamente en cualquier computadora.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente en tu computadora:

1. **Node.js**: Debes tener Node.js instalado. Puedes descargarlo desde su página oficial: [https://nodejs.org/](https://nodejs.org/). Te recomendamos descargar la versión LTS (Long Term Support).
2. **Git (Opcional pero recomendado)**: Para clonar el repositorio, aunque también puedes descargar el código como `.zip`.

## 🚀 Cómo ejecutar el proyecto paso a paso

### Paso 1: Abrir la terminal en la carpeta correcta

Abre una terminal (Símbolo del sistema, PowerShell o la terminal de tu editor de código como VS Code) y navega hasta la carpeta `src` del proyecto. Si estás en VS Code, puedes simplemente abrir la carpeta `src` y abrir la terminal integrada (`Ctrl + \``).

### Paso 2: Instalar las dependencias

El backend necesita algunas librerías para funcionar (como Express y CORS). Para instalarlas, ejecuta el siguiente comando en la terminal:

```bash
npm install
```

*Este comando leerá el archivo `package.json` y descargará todo lo necesario en una carpeta llamada `node_modules`.*

### Paso 3: Iniciar el servidor

Una vez que las dependencias estén instaladas, puedes encender el servidor ejecutando el archivo principal de la aplicación (`app.js`):

```bash
node app.js
```

Si todo ha ido bien, verás un mensaje en la terminal que dice:
**`Servidor iniciado en http://localhost:3000`**

### Paso 4: Ver la página en el navegador

Con el servidor encendido, abre tu navegador web favorito (Google Chrome, Firefox, Edge, etc.) y visita la siguiente dirección:

**[http://localhost:3000](http://localhost:3000)**

¡Listo! Ahora deberías poder navegar por la plataforma, interactuar con el carrito de compras, crear usuarios y ver el catálogo.

## 🛑 Cómo detener el servidor

Cuando termines de usar la plataforma y quieras apagar el servidor, simplemente ve a la terminal donde lo iniciaste y presiona la siguiente combinación de teclas:

`Ctrl + C`

*(Si te pregunta si deseas "Terminar el trabajo por lotes (S/N)", escribe `S` y presiona Enter).*

---

## 🛠️ Solución de Errores Comunes

### Error de permisos al hacer `npm install` en Windows (PowerShell)

Si al intentar ejecutar `npm install` o cualquier otro script en Windows PowerShell te aparece un error rojo indicando:

> *"...la ejecución de scripts está deshabilitada en este sistema"*

Esto ocurre por las políticas de seguridad por defecto de Windows. Para solucionarlo, debes:

1. Abrir tu **PowerShell**.
2. Ejecutar el siguiente comando para darle permisos a tu usuario de forma segura:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Si el sistema te pide confirmar escribiendo una letra, presiona **`S`** y luego **Enter**.
4. ¡Listo! Ya puedes volver a intentar correr `npm install`. *(Alternativamente, puedes usar el "Símbolo del sistema" (CMD) en vez de PowerShell para evitar este bloqueo).*
