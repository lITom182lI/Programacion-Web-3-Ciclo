const contactRepository = require('../repositories/contactRepository');

const processContactData = async (contactData) => {
    try {
        // Aquí se puede agregar lógica de negocio adicional (ej. enviar email, formatear texto)
        const newContact = {
            id: Date.now().toString(),
            ...contactData,
            fecha: new Date().toISOString()
        };

        const result = await contactRepository.saveToFile(newContact);
        return result;
    } catch (error) {
        console.error('Error in contactService:', error);
        throw error;
    }
};

module.exports = {
    processContactData
};
