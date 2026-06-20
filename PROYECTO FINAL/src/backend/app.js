const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
const productosRoutes = require('./routes/productos');
const feriasRoutes = require('./routes/ferias');
const reservasRoutes = require('./routes/reservas');

app.use('/api/productos', productosRoutes);
app.use('/api/ferias', feriasRoutes);
app.use('/api/reserva', reservasRoutes);

// Servir frontend y recursos estáticos
app.use('/PROGRAMA', express.static(path.join(__dirname, '../../PROGRAMA')));
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
