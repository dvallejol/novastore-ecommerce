import React, { useState, useEffect } from 'react';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { ProductCard } from '../components/ProductCard';

export const LandingPage = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('todos');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    productoHttpRepository.obtenerTodos(categoria)
      .then(data => setProductos(data))
      .catch(err => console.error(err))
      .finally(() => setCargando(false));
  }, [categoria]);

  return (
    <main className="container">
      <section className="hero-landing">
        <h1>NovaStore E-Commerce</h1>
        <p>
          Tienda especializada en tecnología y moda urbana de alta calidad. 
          Envíos nacionales, garantía de fábrica y plataforma construida bajo arquitectura en capas.
        </p>
      </section>

      <section className="catalog-section">
        <div className="catalog-header">
          <h2>Catálogo de Productos</h2>
          <div className="filter-buttons">
            <button className={categoria === 'todos' ? 'active' : ''} onClick={() => setCategoria('todos')}>Todos</button>
            <button className={categoria === 'tecnologia' ? 'active' : ''} onClick={() => setCategoria('tecnologia')}>Tecnología</button>
            <button className={categoria === 'ropa' ? 'active' : ''} onClick={() => setCategoria('ropa')}>Ropa</button>
          </div>
        </div>

        {cargando ? (
          <p className="loading-text">Cargando productos...</p>
        ) : (
          <div className="product-grid">
            {productos.map(p => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};