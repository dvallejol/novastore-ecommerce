import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <article className="product-card">
      <div className="card-image-box">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </div>
      <div className="card-info">
        <span className="card-tag">{producto.categoria}</span>
        <h3 className="card-name">{producto.nombre}</h3>
        <p className="card-price">${Number(producto.precio).toLocaleString('es-CO')} COP</p>

        <div className="card-actions">
          <Link to={`/producto/${producto.id}`} className="btn-outline">Ver Detalle</Link>
          <button onClick={() => agregarAlCarrito(producto)} className="btn-primary">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};