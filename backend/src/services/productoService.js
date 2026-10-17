// backend/src/services/productoService.js
const productoRepository = require('../repositories/productoRepository');

const productoService = {
  async listarProductos(categoria) {
    return await productoRepository.findAll(categoria);
  },

  async obtenerPorId(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new Error('El producto solicitado no existe.');
    }
    return producto;
  },

  async registrarProducto(datos) {
    // 1. Validaciones de negocio
    if (!datos.nombre || datos.nombre.trim().length < 3) {
      throw new Error('El nombre del producto debe contener al menos 3 caracteres.');
    }
    if (!datos.precio || Number(datos.precio) < 5000) {
      throw new Error('El precio mínimo permitido es de $5.000 COP.');
    }

    // 2. Mapeo de categoría a ID relacional (1: tecnologia, 2: ropa)
    const categoriaNormalizada = (datos.categoria || '').toLowerCase();
    const categoriaId = categoriaNormalizada === 'ropa' ? 2 : 1;

    // 3. Persistencia en la Capa 4
    const nuevoId = await productoRepository.save({
      nombre: datos.nombre.trim(),
      categoria_id: categoriaId,
      precio: parseFloat(datos.precio),
      descripcion: datos.descripcion || 'Sin descripción',
      imagen: datos.imagen || 'https://via.placeholder.com/300',
      stock: parseInt(datos.stock, 10) || 5
    });

    return { id: nuevoId, mensaje: 'Producto registrado exitosamente en el inventario.' };
  },

  // Simulación de liquidación y cálculo de totales
  calcularLiquidacion(items, cupon) {
    if (!items || items.length === 0) {
      throw new Error('El carrito no contiene productos.');
    }

    const subtotalBruto = items.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    
    // Descuento opcional por cupón
    let porcentajeDescuento = 0;
    if (cupon && cupon.trim().toUpperCase() === 'NOVA10') {
      porcentajeDescuento = 0.10; // 10% de descuento
    }

    const descuento = subtotalBruto * porcentajeDescuento;
    const baseGravable = subtotalBruto - descuento;
    const iva = baseGravable * 0.19; // 19% IVA Colombia
    const total = baseGravable + iva;

    return {
      subtotalBruto,
      descuento,
      baseGravable,
      iva,
      total
    };
  }
};

module.exports = productoService;