// frontend/src/components/FacturaModal.jsx
import React from 'react';
import printJS from 'print-js';

export const FacturaModal = ({ orden, onClose }) => {
  if (!orden) return null;

  const fechaFormateada = new Date(orden.fecha).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    printJS({
      printable: 'area-impresion-factura',
      type: 'html',
      targetStyles: ['*'], // Copia todos los estilos visuales
      documentTitle: `Factura-${orden.numero_orden}-NOVASTORE`,
      style: `
        @page { size: auto; margin: 15mm; }
        body { font-family: system-ui, sans-serif; background: #fff !important; color: #000 !important; }
        .factura-print-wrapper { background: #fff !important; color: #0f172a !important; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; }
        .logo-cyan { color: #0284c7 !important; }
        .factura-brand { color: #0f172a !important; font-size: 26px; margin: 0; }
        .pill-aprobado { background: #dcfce7 !important; color: #166534 !important; border: 1px solid #86efac !important; padding: 3px 8px; border-radius: 999px; font-weight: bold; font-size: 11px; }
        .orden-codigo { color: #0284c7 !important; font-family: monospace; font-weight: bold; }
        .factura-meta-container { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; padding: 12px; border-radius: 8px; margin: 15px 0; }
        .meta-item { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; }
        .meta-item .lbl { color: #475569 !important; }
        .meta-item .val { color: #0f172a !important; font-weight: 600; }
        .modal-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .modal-table th { background: #f1f5f9 !important; color: #475569 !important; padding: 8px; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #cbd5e1; }
        .modal-table td { padding: 8px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b !important; }
        .factura-totales-section { border-top: 1px solid #cbd5e1; padding-top: 10px; margin-top: 10px; }
        .t-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px; color: #475569 !important; }
        .t-final { border-top: 2px solid #0f172a; padding-top: 8px; font-size: 16px; font-weight: 800; color: #0f172a !important; }
        .t-cyan { color: #0284c7 !important; font-family: monospace; }
      `
    });
  };

  return (
    <div className="factura-modal-overlay">
      <div className="factura-modal-card">
        
        {/* Contenedor que será capturado por print-js */}
        <div id="area-impresion-factura" className="factura-print-wrapper">
          {/* Cabecera */}
          <div className="factura-modal-header">
            <div>
              <h2 className="factura-brand">
                <span className="logo-accent">NOVA</span>STORE
              </h2>
              <p className="factura-caption">Comprobante de Venta Electrónico</p>
            </div>
            <div className="factura-badge-col">
              <span className="pill-aprobado">APROBADO</span>
              <p className="orden-codigo">{orden.numero_orden}</p>
            </div>
          </div>

          {/* Metadatos */}
          <div className="factura-meta-container">
            <div className="meta-item">
              <span className="lbl">Cliente:</span>
              <span className="val">{orden.nombre_cliente}</span>
            </div>
            <div className="meta-item">
              <span className="lbl">Email:</span>
              <span className="val">{orden.email_cliente}</span>
            </div>
            <div className="meta-item">
              <span className="lbl">Fecha:</span>
              <span className="val">{fechaFormateada}</span>
            </div>
          </div>

          {/* Artículos */}
          <div className="factura-items-scroll">
            <table className="modal-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Producto</th>
                  <th style={{ textAlign: 'center', width: '60px' }}>Cant</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orden.items.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="prod-col">{prod.nombre}</td>
                    <td className="cant-col" style={{ textAlign: 'center' }}>{prod.cantidad}</td>
                    <td className="price-col" style={{ textAlign: 'right' }}>
                      ${Number(prod.precio * prod.cantidad).toLocaleString('es-CO')} COP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totales */}
          <div className="factura-totales-section">
            <div className="t-row">
              <span>Subtotal:</span>
              <span>${Number(orden.subtotal).toLocaleString('es-CO')} COP</span>
            </div>
            <div className="t-row">
              <span>IVA (19%):</span>
              <span>${Number(orden.iva).toLocaleString('es-CO')} COP</span>
            </div>
            <div className="t-row t-final">
              <span>Total Pagado:</span>
              <span className="t-cyan">${Number(orden.total).toLocaleString('es-CO')} COP</span>
            </div>
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className="factura-modal-footer">
          <button type="button" onClick={handlePrint} className="btn-action-print">
            🖨 Imprimir / Guardar PDF
          </button>
          <button type="button" onClick={onClose} className="btn-action-finish">
            Finalizar Compra
          </button>
        </div>

      </div>
    </div>
  );
};