const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const userController = require('../controllers/userController');
const pedidoController = require('../controllers/pedidoController');

// Ruta para recibir los datos del formulario de contacto
router.post('/contacto', contactController.saveContact);

// Ruta para registrar un nuevo usuario
router.post('/registro', userController.registerUser);

// Ruta para registrar un pedido del checkout
router.post('/pedido', pedidoController.savePedido);

module.exports = router;
