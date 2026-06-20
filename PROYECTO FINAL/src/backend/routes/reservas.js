const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/reservas.json');

const getReservas = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const saveReservas = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    res.json(getReservas());
});

router.post('/', (req, res) => {
    const { nombre, celular, modelo, mensaje } = req.body;
    
    // Validación mínima (B4)
    if (!nombre || !celular || !modelo) {
        return res.status(400).json({ error: 'Nombre, celular y modelo son obligatorios' });
    }

    if (!/^9\d{8}$/.test(celular)) {
        return res.status(400).json({ error: 'El celular debe iniciar con 9 y tener 9 dígitos.' });
    }

    const reservas = getReservas();
    const nuevaReserva = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        nombre,
        celular,
        modelo,
        mensaje: mensaje || ''
    };
    
    reservas.push(nuevaReserva);
    saveReservas(reservas);
    
    // Respuesta exitosa (redirección o JSON dependiendo del cliente)
    // Para simplificar, devolvemos JSON (luego el frontend lo maneja con fetch)
    res.status(201).json({ success: true, reserva: nuevaReserva });
});

module.exports = router;
