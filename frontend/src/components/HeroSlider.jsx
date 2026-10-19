// frontend/src/components/HeroSlider.jsx
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    tag: '⚡ PROMO ESPECIAL CYBER WEEK',
    titulo: 'Tecnología de Punta con 40% OFF',
    descripcion: 'Equipos de alto rendimiento, periféricos profesionales y componentes con garantía extendida y despacho nacional inmediato.',
    imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    boton: 'Ver Tecnología',
    filtro: 'tecnologia'
  },
  {
    id: 2,
    tag: '🔥 NUEVA COLECCIÓN URBANA 2026',
    titulo: 'Moda Streetwear de Alta Resistencia',
    descripcion: 'Prendas confeccionadas en algodón peinado premium y cueros sintéticos de alta durabilidad para un estilo sofisticado.',
    imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    boton: 'Explorar Ropa',
    filtro: 'ropa'
  }
];

export const HeroSlider = ({ onSelectCategory }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="hero-slider-container">
      <div className="hero-slide" key={slide.id}>
        <div className="slide-content">
          <span className="slide-tag">{slide.tag}</span>
          <h1>{slide.titulo}</h1>
          <p>{slide.descripcion}</p>
          <button 
            type="button"
            className="btn-primary"
            onClick={() => onSelectCategory(slide.filtro)}
          >
            {slide.boton} →
          </button>
        </div>

        <div className="slide-image-wrapper">
          <img src={slide.imagen} alt={slide.titulo} />
        </div>
      </div>

      <div className="slider-controls">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`slider-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};