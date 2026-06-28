const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { email, newsletter } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'El correo electrónico es requerido.' });
        }

        const result = await userService.processRegistration({ email, newsletter: !!newsletter });

        if (result.success) {
            return res.status(201).json({ success: true, message: 'Registro iniciado correctamente.' });
        } else {
            return res.status(500).json({ success: false, message: 'Error procesando el registro.' });
        }
    } catch (error) {
        console.error('Error in userController:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};

module.exports = {
    registerUser
};
