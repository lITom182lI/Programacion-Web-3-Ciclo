const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/productos.json');

// Funciones utilitarias para leer y escribir
const getProductos = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const saveProductos = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Obtener todos
router.get('/', (req, res) => {
    res.json(getProductos());
});

// Obtener uno por ID
router.get('/:id', (req, res) => {
    const productos = getProductos();
    const producto = productos.find(p => p.id === req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Crear producto
router.post('/', (req, res) => {
    const productos = getProductos();
    const nuevoProducto = {
        id: Date.now().toString(),
        ...req.body
    };
    productos.push(nuevoProducto);
    saveProductos(productos);
    res.status(201).json(nuevoProducto);
});

// Editar producto
router.put('/:id', (req, res) => {
    const productos = getProductos();
    const index = productos.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...req.body, id: req.params.id };
        saveProductos(productos);
        res.json(productos[index]);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar producto
router.delete('/:id', (req, res) => {
    const productos = getProductos();
    const index = productos.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        productos.splice(index, 1);
        saveProductos(productos);
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

module.exports = router;
