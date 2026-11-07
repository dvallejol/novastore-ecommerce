// frontend/src/components/FacturaModal.jsx
import React from 'react';

export const FacturaModal = ({ orden, onClose }) => {
  if (!orden) return null;

  const fechaFormateada = new Date(orden.fecha).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const imprimirFactura = () => {
    const ventana = window.open('', '_blank', 'width=800,height=900');
    if (!ventana) {
      alert('Por favor permite las ventanas emergentes para imprimir la factura.');
      return;
    }

    const filasProductos = orden.items.map(item => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">
          <strong>${item.nombre}</strong>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 13px; color: #1e293b;">
          ${item.cantidad}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px; font-family: monospace; color: #1e293b;">
          $${Number(item.precio).toLocaleString('es-CO')}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px; font-family: monospace; font-weight: bold; color: #0284c7;">
          $${Number(item.precio * item.cantidad).toLocaleString('es-CO')} COP
        </td>
      </tr>
    `).join('');

    const contenidoHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Factura ${orden.numero_orden} - NOVASTORE</title>
        <style>
          @page {
            size: auto;
            margin: 15mm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 24px;
            box-sizing: border-box;
          }
          .invoice-box {
            max-width: 680px;
            margin: 0 auto;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .brand-logo {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: 1px;
            color: #0f172a;
            margin: 0;
          }
          .brand-logo span {
            color: #0284c7;
          }
          .brand-tagline {
            font-size: 12px;
            color: #64748b;
            margin: 4px 0 0 0;
          }
          .badge-order {
            text-align: right;
          }
          .status-pill {
            display: inline-block;
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
            font-size: 11px;
            font-weight: 800;
            padding: 3px 10px;
            border-radius: 9999px;
            text-transform: uppercase;
          }
          .order-number {
            font-family: monospace;
            font-size: 13px;
            font-weight: 700;
            color: #0284c7;
            margin: 6px 0 0 0;
          }
          .client-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 18px;
            margin-bottom: 24px;
            font-size: 13px;
            line-height: 1.6;
          }
          .client-box strong {
            color: #475569;
          }
          .table-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .table-items th {
            background: #f1f5f9;
            color: #475569;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 12px;
            border-bottom: 2px solid #cbd5e1;
          }
          .totals-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .totals-table td {
            padding: 6px 12px;
            font-size: 13px;
          }
          .total-highlight {
            font-size: 16px !important;
            font-weight: 800 !important;
            color: #0284c7 !important;
            border-top: 2px solid #0f172a;
            padding-top: 10px !important;
          }
          .invoice-footer {
            border-top: 1px dashed #cbd5e1;
            padding-top: 16px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <table class="header-table">
            <tr>
              <td>
                <h1 class="brand-logo"><span>NOVA</span>STORE</h1>
                <p class="brand-tagline">Tecnología de Punta & Accesorios Oficiales</p>
                <p class="brand-tagline">Comprobante de Pago Electrónico</p>
              </td>
              <td class="badge-order">
                <span class="status-pill">✓ Pago Confirmado</span>
                <p class="order-number">${orden.numero_orden}</p>
                <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0;">${fechaFormateada}</p>
              </td>
            </tr>
          </table>

          <div class="client-box">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 50%;"><strong>Cliente:</strong> ${orden.nombre_cliente}</td>
                <td style="width: 50%;"><strong>Email:</strong> ${orden.email_cliente}</td>
              </tr>
              <tr>
                <td><strong>Estado:</strong> ${orden.estado || 'PAGADO'}</td>
                <td><strong>Método:</strong> Pago Digital Seguro</td>
              </tr>
            </table>
          </div>

          <table class="table-items">
            <thead>
              <tr>
                <th style="text-align: left;">Descripción del Producto</th>
                <th style="text-align: center; width: 60px;">Cant.</th>
                <th style="text-align: right; width: 110px;">V. Unitario</th>
                <th style="text-align: right; width: 130px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${filasProductos}
            </tbody>
          </table>

          <table class="totals-table">
            <tr>
              <td style="width: 60%;"></td>
              <td style="text-align: right; color: #475569;">Subtotal:</td>
              <td style="text-align: right; font-family: monospace; font-weight: 600;">
                $${Number(orden.subtotal).toLocaleString('es-CO')} COP
              </td>
            </tr>
            <tr>
              <td></td>
              <td style="text-align: right; color: #475569;">IVA (19%):</td>
              <td style="text-align: right; font-family: monospace; font-weight: 600;">
                $${Number(orden.iva).toLocaleString('es-CO')} COP
              </td>
            </tr>
            <tr>
              <td></td>
              <td style="text-align: right; color: #166534; font-weight: 600;">Envío Nacional:</td>
              <td style="text-align: right; color: #166534; font-weight: 700;">GRATIS</td>
            </tr>
            <tr>
              <td></td>
              <td class="total-highlight" style="text-align: right;">Total Pagado:</td>
              <td class="total-highlight" style="text-align: right; font-family: monospace;">
                $${Number(orden.total).toLocaleString('es-CO')} COP
              </td>
            </tr>
          </table>

          <div class="invoice-footer">
            <p>Este documento constituye un comprobante formal de despacho generado por <strong>NovaStore E-commerce</strong>.</p>
            <p>Para consultas sobre garantía o estado de entrega, escribe con tu número de orden a soporte@novastore.com.</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    ventana.document.open();
    ventana.document.write(contenidoHtml);
    ventana.document.close();
  };

  return (
    <div className="factura-modal-overlay">
      <div className="factura-modal-card">
        {/* Cabecera del Modal */}
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

        {/* Resumen de Datos */}
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

        {/* Desglose de Artículos */}
        <div className="factura-items-scroll">
          <table className="modal-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Ítem</th>
                <th style={{ textAlign: 'center', width: '50px' }}>Cant</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((prod, idx) => (
                <tr key={idx}>
                  <td className="prod-col">{prod.nombre}</td>
                  <td className="cant-col">{prod.cantidad}</td>
                  <td className="price-col">
                    ${Number(prod.precio * prod.cantidad).toLocaleString('es-CO')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cuadro de Totales */}
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

        {/* Botones */}
        <div className="factura-modal-footer">
          <button onClick={imprimirFactura} className="btn-action-print">
            🖨 Imprimir / Guardar PDF
          </button>
          <button onClick={onClose} className="btn-action-finish">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};