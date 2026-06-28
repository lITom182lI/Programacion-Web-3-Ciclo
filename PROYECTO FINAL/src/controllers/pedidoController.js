const pedidoService = require('../services/pedidoService');

const savePedido = async (req, res) => {
    try {
        const { cliente, items, total } = req.body;

        if (!cliente || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Datos del pedido incompletos.' });
        }

        const result = await pedidoService.processPedido({ cliente, items, total });

        if (result.success) {
            return res.status(201).json({ success: true, message: 'Pedido registrado correctamente.' });
        } else {
            return res.status(500).json({ success: false, message: 'Error procesando el pedido.' });
        }
    } catch (error) {
        console.error('Error in pedidoController:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};

module.exports = {
    savePedido
};
