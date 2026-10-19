import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const { usuario, loginMock, cerrarSesion } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  const totalItems = items.reduce((acc, el) => acc + el.cantidad, 0);

  return (
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
            <span className="user-badge">{usuario.nombre} ({usuario.rol})</span>
            <Link to="/carrito" className="cart-btn">
              🛒 Carrito ({totalItems})
            </Link>
            <button onClick={cerrarSesion} className="btn-secondary">Salir</button>
          </>
        ) : (
          <div className="login-quick">
            <button onClick={() => loginMock('CLIENTE')} className="btn-secondary">Entrar Cliente</button>
            <button onClick={() => loginMock('ADMIN')} className="btn-secondary">Entrar Admin</button>
          </div>
        )}
      </div>
    </header>
  );
};