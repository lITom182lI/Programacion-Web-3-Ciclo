const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/ferias.json');

const getFerias = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const saveFerias = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    res.json(getFerias());
});

router.post('/', (req, res) => {
    const ferias = getFerias();
    const nuevaFeria = {
        id: Date.now().toString(),
        ...req.body
    };
    ferias.push(nuevaFeria);
    saveFerias(ferias);
    res.status(201).json(nuevaFeria);
});

router.put('/:id', (req, res) => {
    const ferias = getFerias();
    const index = ferias.findIndex(f => f.id === req.params.id);
    if (index !== -1) {
        ferias[index] = { ...ferias[index], ...req.body, id: req.params.id };
        saveFerias(ferias);
        res.json(ferias[index]);
    } else {
        res.status(404).json({ message: 'Feria no encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const ferias = getFerias();
    const index = ferias.findIndex(f => f.id === req.params.id);
    if (index !== -1) {
        ferias.splice(index, 1);
        saveFerias(ferias);
        res.json({ message: 'Feria eliminada' });
    } else {
        res.status(404).json({ message: 'Feria no encontrada' });
    }
});

module.exports = router;
