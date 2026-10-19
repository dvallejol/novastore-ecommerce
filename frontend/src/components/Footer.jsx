// frontend/src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const canvasRef = useRef(null);

  // Efecto Canvas: Constelación de partículas interactivas de neón
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particulas = [];
    const cantidadParticulas = 45;

    for (let i = 0; i < cantidadParticulas; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radio: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: i % 2 === 0 ? 'rgba(56, 189, 248, ' : 'rgba(192, 132, 252, '
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particulas.length; i++) {
        const p1 = particulas[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radio, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}0.7)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();

        for (let j = i + 1; j < particulas.length; j++) {
          const p2 = particulas[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacidad = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacidad})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="interactive-footer">
      {/* Fondo interactivo Canvas */}
      <canvas ref={canvasRef} className="footer-canvas" />

      {/* Contenido Documentado del Footer */}
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Columna 1: Identidad del Proyecto */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo">
              <span className="logo-accent">NOVA</span>STORE
            </h3>
            <p className="footer-desc">
              Plataforma de comercio electrónico diseñada para la comercialización ágil de tecnología 
              y vestuario urbano contemporáneo. Construida con arquitectura desacoplada en 4 capas.
            </p>
            <div className="tech-pills">
              <span className="pill">React 18</span>
              <span className="pill">Vite</span>
              <span className="pill">Node.js</span>
              <span className="pill">Express</span>
              <span className="pill">MySQL</span>
            </div>
          </div>

          {/* Columna 2: Ficha Técnica & Arquitectura */}
          <div className="footer-col">
            <h4 className="col-title">Arquitectura en 4 Capas</h4>
            <ul className="footer-links-spec">
              <li>
                <strong>1. Presentación:</strong> SPA React modular, Context API y estilos dinámicos.
              </li>
              <li>
                <strong>2. Controladores:</strong> Endpoints REST con Node.js y Express.
              </li>
              <li>
                <strong>3. Lógica Negocio:</strong> Reglas de validación, stock e impuestos.
              </li>
              <li>
                <strong>4. Datos:</strong> MySQL relacional con consultas parametrizadas.
              </li>
            </ul>
          </div>

          {/* Columna 3: Navegación & Soporte */}
          <div className="footer-col">
            <h4 className="col-title">Navegación Rápida</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">Catálogo General</Link></li>
              <li><Link to="/carrito">Mi Carrito</Link></li>
              <li><Link to="/admin">Panel Administrativo</Link></li>
              <li>
                <a 
                  href="https://wa.me/573242699355" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-wa-link"
                >
                  Soporte WhatsApp (+57 324 269 9355)
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Créditos Académicos y Autores */}
          <div className="footer-col">
            <h4 className="col-title">Ficha Académica</h4>
            <div className="academic-card">
              <p><strong>Institución:</strong> CUN - Corporación Unificada Nacional</p>
              <p><strong>Programa:</strong> Ingeniería de Sistemas</p>
              <p>
                <strong>Desarrolladores:</strong><br />
                • Diego Vallejo Llano<br />
                • Johanna Andrea Camacho Téllez
              </p>
              <p><strong>Metodología:</strong> Git Flow (main, develop, features)</p>
              <p><strong>Versión:</strong> 1.1.0 Stable Release</p>
            </div>
          </div>
        </div>

        {/* Línea inferior de derechos y créditos de autoría */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NovaStore E-Commerce. Todos los derechos reservados.</p>
          <p className="footer-credits">
            Desarrollada por <strong>Diego Vallejo Llano</strong> y <strong>Johanna Andrea Camacho Téllez</strong> para la CUN.
          </p>
        </div>
      </div>
    </footer>
  );
};