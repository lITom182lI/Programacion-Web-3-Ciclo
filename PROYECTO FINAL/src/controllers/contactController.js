const contactService = require('../services/contactService');

const saveContact = async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        
        // Validación básica a nivel de controlador
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ success: false, message: 'Todos los campos son requeridos.' });
        }

        const result = await contactService.processContactData({ nombre, email, mensaje });
        
        if (result.success) {
            return res.status(201).json({ success: true, message: 'Mensaje enviado correctamente.' });
        } else {
            return res.status(500).json({ success: false, message: 'Error procesando el contacto.' });
        }
    } catch (error) {
        console.error('Error in contactController:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};

module.exports = {
    saveContact
};
