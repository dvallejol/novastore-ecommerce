// frontend/src/components/FacturaModal.jsx
import React from 'react';

export const FacturaModal = ({ orden, onClose }) => {
  if (!orden) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="factura-modal-overlay">
      <div className="factura-modal-card">
        {/* Contenedor imprimible */}
        <div id="seccion-factura-imprimible" className="factura-body">
          {/* Cabecera */}
          <div className="factura-header">
            <div>
              <h2 className="factura-logo">
                <span className="logo-cyan">NOVA</span>STORE
              </h2>
              <p className="factura-sub">Comprobante de Venta Electrónico</p>
            </div>
            <div className="factura-badge-box">
              <span className="factura-badge">APROBADO</span>
              <p className="factura-orden-num">{orden.numero_orden}</p>
            </div>
          </div>

          {/* Datos del Cliente y Fecha */}
          <div className="factura-meta-box">
            <div className="factura-meta-row">
              <span className="meta-label">Cliente:</span>
              <span className="meta-val">{orden.nombre_cliente}</span>
            </div>
            <div className="factura-meta-row">
              <span className="meta-label">Email:</span>
              <span className="meta-val">{orden.email_cliente}</span>
            </div>
            <div className="factura-meta-row">
              <span className="meta-label">Fecha:</span>
              <span className="meta-val">
                {new Date(orden.fecha).toLocaleString('es-CO', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* Tabla de Artículos */}
          <div className="factura-table-wrap">
            <table className="factura-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Producto</th>
                  <th style={{ textAlign: 'center' }}>Cant</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orden.items.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="item-name">{prod.nombre}</td>
                    <td className="item-qty">{prod.cantidad}</td>
                    <td className="item-sub">
                      ${Number(prod.precio * prod.cantidad).toLocaleString('es-CO')} COP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Desglose de Totales */}
          <div className="factura-totals-box">
            <div className="tot-row">
              <span>Subtotal:</span>
              <span>${Number(orden.subtotal).toLocaleString('es-CO')} COP</span>
            </div>
            <div className="tot-row">
              <span>IVA (19%):</span>
              <span>${Number(orden.iva).toLocaleString('es-CO')} COP</span>
            </div>
            <div className="tot-row tot-final">
              <span>Total Pagado:</span>
              <span className="tot-accent">${Number(orden.total).toLocaleString('es-CO')} COP</span>
            </div>
          </div>

          <div className="factura-footer-msg">
            <p>Gracias por tu compra en NovaStore. Conserva este comprobante.</p>
          </div>
        </div>

        {/* Botones de acción (no se imprimen) */}
        <div className="factura-modal-actions no-print">
          <button onClick={handlePrint} className="btn-print">
            🖨 Imprimir / Guardar PDF
          </button>
          <button onClick={onClose} className="btn-close-modal">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};