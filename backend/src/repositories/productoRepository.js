// backend/src/repositories/productoRepository.js
const pool = require('../../config/db');

const productoRepository = {
  // Obtener catálogo completo o filtrado por categoría
  async findAll(categoria) {
    let sql = `
      SELECT p.id, p.nombre, c.nombre AS categoria, p.precio, p.descripcion, p.imagen, p.stock
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.id
    `;
    const params = [];

    if (categoria && categoria !== 'todos') {
      sql += ' WHERE LOWER(c.nombre) = ?';
      params.push(categoria.toLowerCase());
    }

    sql += ' ORDER BY p.id DESC';
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  // Buscar un producto por ID para la vista de detalle
  async findById(id) {
    const sql = `
      SELECT p.id, p.nombre, c.nombre AS categoria, p.precio, p.descripcion, p.imagen, p.stock
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
  },

  // Insertar un nuevo producto en MySQL (para el Administrador)
  async save(producto) {
    const sql = `
      INSERT INTO productos (nombre, categoria_id, precio, descripcion, imagen, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [
      producto.nombre,
      producto.categoria_id,
      producto.precio,
      producto.descripcion,
      producto.imagen,
      producto.stock
    ]);
    return result.insertId;
  }
};

module.exports = productoRepository;