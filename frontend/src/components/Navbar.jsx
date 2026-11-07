// frontend/src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { LoginModal } from './LoginModal';

export const Navbar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = items.reduce((acc, el) => acc + el.cantidad, 0);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        {/* Logotipo */}
        <Link to="/" className="navbar-logo" onClick={handleCloseMenu}>
          <span className="logo-accent">NOVA</span>STORE
        </Link>

        {/* Zona móvil derecha: Carrito fijo + Botón hamburguesa */}
        <div className="mobile-header-right">
          <Link to="/carrito" className="cart-mobile-trigger" onClick={handleCloseMenu} aria-label="Ver Carrito">
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && <span className="cart-badge-count">{totalItems}</span>}
          </Link>

          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Menú Desplegable / Escritorio */}
        <div className={`navbar-collapse ${isMenuOpen ? 'is-active' : ''}`}>
          <nav className="navbar-links">
            <Link to="/" onClick={handleCloseMenu}>Inicio</Link>
            {usuario?.rol === 'ADMIN' && (
              <Link to="/admin" className="admin-link" onClick={handleCloseMenu}>
                ⚙ Panel Admin
              </Link>
            )}
          </nav>

          <div className="navbar-actions">
            {usuario ? (
              <>
                <span className="user-badge">
                  {usuario.rol === 'ADMIN' ? '👑' : '🛍'} {usuario.nombre} ({usuario.rol})
                </span>
                {/* Carrito de escritorio */}
                <Link to="/carrito" className="cart-btn desktop-only" onClick={handleCloseMenu}>
                  🛒 Carrito <span className="cart-pill">{totalItems}</span>
                </Link>
                <button
                  onClick={() => {
                    cerrarSesion();
                    handleCloseMenu();
                  }}
                  className="btn-secondary logout-hover"
                >
                  Salir
                </button>
              </>
            ) : (
              <div className="login-quick">
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    handleCloseMenu();
                  }}
                  className="btn-primary btn-login-nav"
                >
                  Ingresar / Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop oscuro para cerrar al hacer clic afuera en móviles */}
      {isMenuOpen && <div className="navbar-backdrop" onClick={handleCloseMenu} />}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};