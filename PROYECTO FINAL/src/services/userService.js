const userRepository = require('../repositories/userRepository');

const processRegistration = async (userData) => {
    try {
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            fecha: new Date().toISOString()
        };

        const result = await userRepository.saveToFile(newUser);
        return result;
    } catch (error) {
        console.error('Error in userService:', error);
        throw error;
    }
};

module.exports = {
    processRegistration
};
