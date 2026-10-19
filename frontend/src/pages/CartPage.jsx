import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

export const CartPage = () => {
  const { usuario } = useContext(AuthContext);
  const { items, eliminarDelCarrito, vaciarCarrito, subtotal, iva, total } = useContext(CartContext);

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container cart-page">
      <h2>Tu Carrito de Compras</h2>
      {items.length === 0 ? (
        <div>
          <p>El carrito se encuentra vacío.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-row">
                <div>
                  <h4>{item.nombre}</h4>
                  <small>{item.cantidad} x ${Number(item.precio).toLocaleString('es-CO')}</small>
                </div>
                <div>
                  <span>${Number(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
                  <button onClick={() => eliminarDelCarrito(item.id)} className="btn-remove">✕</button>
                </div>
              </div>
            ))}
            <button onClick={vaciarCarrito} className="btn-outline" style={{ marginTop: '1rem' }}>
              Vaciar Carrito
            </button>
          </div>

          <div className="cart-totals-box">
            <h3>Resumen del Pedido</h3>
            <p>Subtotal: <span>${subtotal.toLocaleString('es-CO')}</span></p>
            <p>IVA (19%): <span>${iva.toLocaleString('es-CO')}</span></p>
            <hr />
            <p className="total-highlight">Total: <span>${total.toLocaleString('es-CO')} COP</span></p>
            <button onClick={() => { alert('¡Pedido confirmado con éxito!'); vaciarCarrito(); }} className="btn-primary btn-block">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};