// Importa el módulo nativo HTTP de Node.js
const http = require('http');

// Define el puerto donde funcionará el servidor
const PORT = 3000;

// Crea el servidor web
const server = http.createServer((req, res) => {
    // Configura la cabecera de la respuesta con código 200 (OK) y tipo de contenido texto plano
    // Es crucial incluir el charset=utf-8 para que los caracteres especiales (como ¡) se muestren correctamente
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    // Envía el mensaje final al navegador
    res.end('¡Hola Mundo, te envio un saludo desde Mi primer Servidor con Node.js!');
});

// Enciende el servidor en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
