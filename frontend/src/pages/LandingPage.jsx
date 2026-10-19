// frontend/src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { ProductCard } from '../components/ProductCard';
import { HeroSlider } from '../components/HeroSlider';

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
      {/* Banner Publicitario Dinámico Rotativo */}
      <HeroSlider onSelectCategory={(cat) => setCategoria(cat)} />

      <section className="catalog-section">
        <div className="catalog-header">
          <div>
            <h2>Catálogo de Productos</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
              Inventario en tiempo real sincronizado con MySQL
            </p>
          </div>

          <div className="filter-buttons">
            <button 
              type="button"
              className={categoria === 'todos' ? 'active' : ''} 
              onClick={() => setCategoria('todos')}
            >
              Todos
            </button>
            <button 
              type="button"
              className={categoria === 'tecnologia' ? 'active' : ''} 
              onClick={() => setCategoria('tecnologia')}
            >
              Tecnología
            </button>
            <button 
              type="button"
              className={categoria === 'ropa' ? 'active' : ''} 
              onClick={() => setCategoria('ropa')}
            >
              Ropa
            </button>
          </div>
        </div>

        {cargando ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--primary)', fontWeight: 600 }}>
            Cargando catálogo...
          </p>
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