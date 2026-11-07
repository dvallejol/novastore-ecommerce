const db = require('../../config/db');

// Crear un nuevo pedido con transacción
exports.crearPedido = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { usuario_id, nombre_cliente, email_cliente, items, subtotal, iva, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito no contiene productos' });
    }

    // Generar código único de factura ej: ORD-202611-8492
    const numero_orden = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const [pedidoResult] = await connection.query(
      `INSERT INTO pedidos (numero_orden, usuario_id, nombre_cliente, email_cliente, subtotal, iva, total, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'PAGADO')`,
      [numero_orden, usuario_id || null, nombre_cliente || 'Cliente NovaStore', email_cliente || 'cliente@novastore.com', subtotal, iva, total]
    );

    const pedidoId = pedidoResult.insertId;

    // Insertar cada producto comprado
    for (const item of items) {
      const itemSubtotal = item.precio * item.cantidad;
      await connection.query(
        `INSERT INTO detalle_pedidos (pedido_id, producto_id, nombre_producto, precio_unitario, cantidad, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [pedidoId, item.id, item.nombre, item.precio, item.cantidad, itemSubtotal]
      );
    }

    await connection.commit();

    res.status(201).json({
      mensaje: 'Pedido procesado con éxito',
      orden: {
        id: pedidoId,
        numero_orden,
        nombre_cliente,
        email_cliente,
        items,
        subtotal,
        iva,
        total,
        fecha: new Date().toISOString()
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error al registrar pedido:', error);
    res.status(500).json({ mensaje: 'Error interno al procesar el pedido' });
  } finally {
    connection.release();
  }
};

// Obtener todas las órdenes para el Panel de Administrador
exports.obtenerPedidos = async (req, res) => {
  try {
    const [pedidos] = await db.query(
      `SELECT id, numero_orden, nombre_cliente, email_cliente, total, estado, fecha 
       FROM pedidos ORDER BY fecha DESC`
    );
    res.json(pedidos);
  } catch (error) {
    console.error('Error al listar pedidos:', error);
    res.status(500).json({ mensaje: 'Error al consultar pedidos' });
  }
};