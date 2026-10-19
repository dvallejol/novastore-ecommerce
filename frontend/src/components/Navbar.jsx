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

  const totalItems = items.reduce((acc, el) => acc + el.cantidad, 0);

  return (
    <>
      <header className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-accent">NOVA</span>STORE
        </Link>

        <nav className="navbar-links">
          <Link to="/">Inicio</Link>
          {usuario?.rol === 'ADMIN' && (
            <Link to="/admin" className="admin-link">⚙ Panel Admin</Link>
          )}
        </nav>

        <div className="navbar-actions">
          {usuario ? (
            <>
              <span className="user-badge">
                {usuario.rol === 'ADMIN' ? '👑' : '🛍'} {usuario.nombre} ({usuario.rol})
              </span>
              <Link to="/carrito" className="cart-btn animate-cart">
                🛒 Carrito ({totalItems})
              </Link>
              <button onClick={cerrarSesion} className="btn-secondary logout-hover">Salir</button>
            </>
          ) : (
            <div className="login-quick">
              <button onClick={() => setIsLoginOpen(true)} className="btn-primary btn-login-nav">
                Ingresar / Registrarse
              </button>
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};