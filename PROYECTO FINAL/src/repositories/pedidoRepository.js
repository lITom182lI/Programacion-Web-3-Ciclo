const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/pedidos.json');

const saveToFile = async (pedido) => {
    try {
        let data = [];

        try {
            const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
            if (fileContent) {
                data = JSON.parse(fileContent);
            }
        } catch (readError) {
            if (readError.code !== 'ENOENT') {
                throw readError;
            }
        }

        data.push(pedido);

        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

        return { success: true };
    } catch (error) {
        console.error('Error writing to JSON file:', error);
        return { success: false, error };
    }
};

module.exports = {
    saveToFile
};
