const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/contactos.json');

const saveToFile = async (contact) => {
    try {
        let data = [];
        
        // Verifica si el archivo existe y lee su contenido
        try {
            const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
            if (fileContent) {
                data = JSON.parse(fileContent);
            }
        } catch (readError) {
            // Si el archivo no existe, no hay problema, comenzaremos con un array vacío
            if (readError.code !== 'ENOENT') {
                throw readError;
            }
        }

        // Agrega el nuevo contacto
        data.push(contact);

        // Guarda el array actualizado en el archivo JSON
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
