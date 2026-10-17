// backend/src/controllers/productoController.js
const productoService = require('../services/productoService');

const productoController = {
  async obtenerTodos(req, res) {
    try {
      const { categoria } = req.query;
      const data = await productoService.listarProductos(categoria);
      res.status(200).json({ exito: true, data });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: error.message });
    }
  },

  async obtenerDetalle(req, res) {
    try {
      const { id } = req.params;
      const data = await productoService.obtenerPorId(id);
      res.status(200).json({ exito: true, data });
    } catch (error) {
      res.status(404).json({ exito: false, mensaje: error.message });
    }
  },

  async crear(req, res) {
    try {
      const data = await productoService.registrarProducto(req.body);
      res.status(201).json({ exito: true, data });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  },

  liquidar(req, res) {
    try {
      const { items, cupon } = req.body;
      const data = productoService.calcularLiquidacion(items, cupon);
      res.status(200).json({ exito: true, data });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
};

module.exports = productoController;