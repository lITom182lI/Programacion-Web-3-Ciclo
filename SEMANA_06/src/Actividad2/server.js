const http = require('http');

// Definición de constantes globales
const PORT = 3000;
const siteInfo = {
    title: "EcoTech - Innovación Sostenible",
    description: "Tecnología al servicio del medio ambiente.",
    contactEmail: "contacto@ecotech.com"
};

// Variable para demostrar el uso de operadores aritméticos (Cumplimiento de rúbrica)
let totalVisitas = 0;

const server = http.createServer((req, res) => {
    // Extracción secuencial de datos de la petición (Lógica Secuencial)
    const url = req.url;
    const method = req.method;
    
    // Uso de operador aritmético (+)
    totalVisitas = totalVisitas + 1;
    
    // Uso de operador relacional (>)
    let mensajeVisitas = "";
    if (totalVisitas > 1) {
        mensajeVisitas = `¡Gracias por ser nuestro visitante número ${totalVisitas}!`;
    } else {
        mensajeVisitas = `¡Eres nuestro primer visitante!`;
    }

    // Configuración predeterminada de cabeceras para HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Control de flujo: Enrutamiento basado en la URL y el método HTTP
    // Uso de operadores lógicos (&&) y estricta igualdad (===) (Cumplimiento de rúbrica)
    if (method === 'GET' && url === '/') {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${siteInfo.title} | Inicio</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6; color: #333; }
                    header { background-color: #2c3e50; color: white; padding: 1.5rem; text-align: center; }
                    main { padding: 2rem; max-width: 800px; margin: auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem; border-radius: 8px; }
                    h1 { margin-top: 0; }
                    .btn { display: inline-block; padding: 10px 20px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 4px; }
                    .visitas { font-size: 0.9em; color: #7f8c8d; margin-top: 20px; }
                </style>
            </head>
            <body>
                <header>
                    <h1>${siteInfo.title}</h1>
                    <p>${siteInfo.description}</p>
                </header>
                <main>
                    <h2>Bienvenidos a nuestro portal</h2>
                    <p>En EcoTech nos dedicamos a desarrollar soluciones de software que optimizan el consumo energético.</p>
                    <a href="/acerca" class="btn">Conoce más sobre nosotros</a>
                    <p class="visitas">${mensajeVisitas}</p>
                </main>
            </body>
            </html>
        `);
    } else if (method === 'GET' && url === '/acerca') {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>${siteInfo.title} | Acerca</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #e9ecef; }
                    .card { background: white; padding: 30px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Acerca de EcoTech</h2>
                    <p>Fundada con el propósito de integrar la naturaleza y la tecnología.</p>
                    <p>Contáctanos en: <strong>${siteInfo.contactEmail}</strong></p>
                    <br>
                    <a href="/">Volver al inicio</a>
                </div>
            </body>
            </html>
        `);
    } else {
        // Manejo de escenarios no contemplados (Ruta no encontrada)
        res.writeHead(404);
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Error 404 - No Encontrado</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; color: #e74c3c; background-color: #fceceb; }
                </style>
            </head>
            <body>
                <h1>Error 404</h1>
                <h2>La página que buscas no existe.</h2>
                <a href="/">Regresar a la página principal</a>
            </body>
            </html>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`Servidor web informativo ejecutándose en http://localhost:${PORT}`);
});
