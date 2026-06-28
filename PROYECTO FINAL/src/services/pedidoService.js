const pedidoRepository = require('../repositories/pedidoRepository');

const processPedido = async (pedidoData) => {
    try {
        const newPedido = {
            id: Date.now().toString(),
            ...pedidoData,
            fecha: new Date().toISOString()
        };

        const result = await pedidoRepository.saveToFile(newPedido);
        return result;
    } catch (error) {
        console.error('Error in pedidoService:', error);
        throw error;
    }
};

module.exports = {
    processPedido
};
