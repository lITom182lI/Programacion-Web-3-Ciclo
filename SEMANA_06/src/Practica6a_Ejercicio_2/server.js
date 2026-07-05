const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Cambiamos el tipo de contenido a text/html para que el navegador entienda las etiquetas HTML
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Usamos comillas invertidas (`) para escribir texto en múltiples líneas fácilmente
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mi Servidor Node.js</title>
        </head>
        <body>
            <h1>¡Bienvenido a mi sitio web!</h1>
            <p>Esta es la primera línea de contenido.</p>
            <p>Esta es la segunda línea de contenido.</p>
            <hr>
            <footer>Servidor creado con Node.js puro.</footer>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
