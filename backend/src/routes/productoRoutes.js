// backend/src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// GET /api/productos (listar todos o ?categoria=tecnologia)
router.get('/', productoController.obtenerTodos);

// GET /api/productos/:id (ver detalle del producto)
router.get('/:id', productoController.obtenerDetalle);

// POST /api/productos (crear nuevo producto - Administrador)
router.post('/', productoController.crear);

// POST /api/productos/liquidar (simular compra y totales)
router.post('/liquidar', productoController.liquidar);

module.exports = router;