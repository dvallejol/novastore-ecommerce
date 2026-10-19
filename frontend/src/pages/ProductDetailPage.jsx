import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { CartContext } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    productoHttpRepository.obtenerPorId(id)
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!producto) return <p className="container">Cargando producto...</p>;

  return (
    <div className="container detail-container">
      <div className="detail-layout">
        <div className="detail-img-box">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="detail-content-box">
          <span className="badge-category">{producto.categoria?.toUpperCase()} | Nuevo</span>
          <h1 className="detail-title">{producto.nombre}</h1>
          <p className="detail-price">${Number(producto.precio).toLocaleString('es-CO')} COP</p>
          <p className="detail-stock">Stock disponible: <strong>{producto.stock} unidades</strong></p>

          <div className="detail-description">
            <h3>Descripción del Producto</h3>
            <p>{producto.descripcion}</p>
          </div>

          <button onClick={() => agregarAlCarrito(producto)} className="btn-primary btn-block">
            Agregar al Carrito
          </button>
          <Link to="/" className="back-link">← Volver al catálogo</Link>
        </div>
      </div>
    </div>
  );
};