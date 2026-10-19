import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { CartContext } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);

  // Zoom estilo Mercado Libre
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center center' });
  const imgBoxRef = useRef(null);

  useEffect(() => {
    productoHttpRepository.obtenerPorId(id)
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleMouseMove = (e) => {
    if (!imgBoxRef.current) return;
    const { left, top, width, height } = imgBoxRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2)', // Nivel de acercamiento
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center'
    });
  };

  if (!producto) return <p className="container" style={{ color: 'var(--text-white)' }}>Cargando ficha técnica...</p>;

  return (
    <div className="container">
      <div className="detail-layout">
        {/* Contenedor con Lupa / Zoom interactivo */}
        <div 
          className="detail-img-wrapper" 
          ref={imgBoxRef} 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
        >
          <img src={producto.imagen} alt={producto.nombre} style={zoomStyle} />
        </div>

        <div className="detail-content-box">
          <span className="badge-category">{producto.categoria?.toUpperCase()} | NUEVO · GARANTÍA OFICIAL</span>
          <h1 className="detail-title">{producto.nombre}</h1>
          <p className="detail-price">${Number(producto.precio).toLocaleString('es-CO')} COP</p>
          <p className="detail-stock">Disponibilidad inmediata: <strong>{producto.stock} unidades en bodega</strong></p>

          <div className="detail-description">
            <h3>Descripción detallada</h3>
            <p>{producto.descripcion}</p>
          </div>

          <button onClick={() => agregarAlCarrito(producto)} className="btn-primary btn-block">
            🛒 Agregar al Carrito
          </button>
          <Link to="/" className="back-link">← Volver al catálogo de productos</Link>
        </div>
      </div>
    </div>
  );
};