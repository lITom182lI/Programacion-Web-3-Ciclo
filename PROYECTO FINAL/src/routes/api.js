const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta para recibir los datos del formulario de contacto
router.post('/contacto', contactController.saveContact);

module.exports = router;
