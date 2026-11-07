import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { FacturaModal } from '../components/FacturaModal'; // Componente de factura

export const CartPage = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const { 
    items, 
    actualizarCantidad, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    subtotal, 
    iva, 
    total 
  } = useContext(CartContext);

  // Estados para procesar el pago y mostrar la factura
  const [ordenProcesada, setOrdenProcesada] = useState(null);
  const [cargando, setCargando] = useState(false);

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  const totalArticulos = items.reduce((acc, el) => acc + el.cantidad, 0);

  // Función que registra el pedido en MySQL
  const procesarPago = async () => {
    if (items.length === 0) return;

    setCargando(true);
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id || null,
          nombre_cliente: usuario.nombre || 'Cliente NovaStore',
          email_cliente: usuario.email || 'cliente@novastore.com',
          items: items,
          subtotal: subtotal,
          iva: iva,
          total: total
        })
      });

      const data = await res.json();

      if (res.ok) {
        setOrdenProcesada(data.orden);
        vaciarCarrito();
      } else {
        alert(data.mensaje || 'Error al procesar el pedido');
      }
    } catch (err) {
      console.error('Error al conectar con la API de pedidos:', err);
      alert('Error de conexión al procesar el pago. Revisa el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container cart-page">
      <div className="cart-header-title">
        <h2>Tu Carrito de Compras</h2>
        <span className="cart-count-badge">
          {totalArticulos} {totalArticulos === 1 ? 'artículo' : 'artículos'}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty-card">
          <span className="empty-icon">🛍️</span>
          <h3>Tu carrito está vacío</h3>
          <p>Explora nuestro catálogo con los mejores productos de tecnología y moda urbana.</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '1.2rem' }}>
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {/* Lista de productos */}
          <div className="cart-items-wrapper">
            <div className="cart-table-head">
              <span>Producto</span>
              <span>Precio Unitario</span>
              <span>Cantidad</span>
              <span>Total</span>
              <span></span>
            </div>

            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-card-item">
                  <div className="cart-item-info">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      className="cart-thumb-img" 
                    />
                    <div className="cart-item-details">
                      <span className="cart-item-tag">{item.categoria?.toUpperCase() || 'NOVA'}</span>
                      <h4 className="cart-item-title">{item.nombre}</h4>
                      <small className="cart-item-stock">✓ En stock disponible</small>
                    </div>
                  </div>

                  <div className="cart-price-unit">
                    ${Number(item.precio).toLocaleString('es-CO')}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="cart-qty-controls">
                    <button 
                      type="button" 
                      onClick={() => actualizarCantidad(item.id, -1)}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-number">{item.cantidad}</span>
                    <button 
                      type="button" 
                      onClick={() => actualizarCantidad(item.id, 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-subtotal-item">
                    ${Number(item.precio * item.cantidad).toLocaleString('es-CO')}
                  </div>

                  <button 
                    type="button"
                    onClick={() => eliminarDelCarrito(item.id)} 
                    className="btn-trash"
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions-bar">
              <Link to="/" className="btn-outline">
                ← Continuar Comprando
              </Link>
              <button onClick={vaciarCarrito} className="btn-clear-cart">
                Vaciar Carrito
              </button>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="cart-totals-box">
            <h3>Resumen del Pedido</h3>

            <div className="totals-row">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString('es-CO')} COP</span>
            </div>

            <div className="totals-row">
              <span>IVA (19%)</span>
              <span>${iva.toLocaleString('es-CO')} COP</span>
            </div>

            <div className="totals-row">
              <span>Envío Nacional</span>
              <span className="free-shipping">GRATIS 🚚</span>
            </div>

            <div className="coupon-box">
              <input type="text" placeholder="Código de descuento" />
              <button type="button" onClick={() => alert('¡Cupón NOVA2026 aplicado! (Demo)')}>Aplicar</button>
            </div>

            <hr className="totals-divider" />

            <div className="totals-row total-highlight">
              <span>Total a Pagar</span>
              <span>${total.toLocaleString('es-CO')} COP</span>
            </div>

            {/* Botón conectado al proceso real de pago */}
            <button 
              onClick={procesarPago}
              disabled={cargando}
              className="btn-primary btn-block checkout-glow"
            >
              {cargando ? 'Procesando Compra...' : '🔒 Proceder al Pago Seguro'}
            </button>

            <div className="secure-badges">
              <span>🛡️ Pago 100% Protegido</span>
              <span>•</span>
              <span>⚡ Envío 24-48h</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de factura tras completar la orden */}
      {ordenProcesada && (
        <FacturaModal 
          orden={ordenProcesada} 
          onClose={() => {
            setOrdenProcesada(null);
            navigate('/');
          }} 
        />
      )}
    </div>
  );
};