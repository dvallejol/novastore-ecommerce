// frontend/src/pages/AdminDashboard.jsx (o frontend/src/components/AdminDashboard.jsx)
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { Navigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { usuario } = useContext(AuthContext);

  // 1. Estado del Formulario de Productos
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'tecnologia',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: ''
  });
  const [mensaje, setMensaje] = useState('');

  // 2. Estados para el Historial de Pedidos / Ventas
  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [errorPedidos, setErrorPedidos] = useState(null);

  // Función para consultar las ventas registradas en MySQL
  const cargarPedidos = async () => {
    setCargandoPedidos(true);
    setErrorPedidos(null);
    try {
      const res = await fetch('/api/pedidos');
      if (!res.ok) {
        throw new Error('Error al obtener la lista de órdenes');
      }
      const data = await res.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorPedidos('No fue posible cargar el historial de pedidos.');
    } finally {
      setCargandoPedidos(false);
    }
  };

  // Cargar pedidos automáticamente al entrar al dashboard
  useEffect(() => {
    if (usuario && usuario.rol === 'ADMIN') {
      cargarPedidos();
    }
  }, [usuario]);

  // Protección de ruta para Administradores
  if (!usuario || usuario.rol !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  // Guardar nuevo producto en MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productoHttpRepository.crear(form);
      setMensaje('✔ Producto guardado con éxito directamente en MySQL.');
      setForm({
        nombre: '',
        categoria: 'tecnologia',
        precio: '',
        stock: '',
        imagen: '',
        descripcion: ''
      });
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container admin-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* SECCIÓN 1: Formulario de Registro de Productos */}
      <div className="admin-card-section" style={{ background: '#0b1329', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          📦 Registrar Nuevo Producto en Inventario
        </h2>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-field">
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Nombre del Producto:</label>
            <input 
              type="text" 
              placeholder="Ej. MacBook Pro M3 o Chaqueta Bomber" 
              value={form.nombre} 
              onChange={e => setForm({...form, nombre: e.target.value})} 
              required 
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Categoría:</label>
              <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
                <option value="tecnologia">💻 Tecnología</option>
                <option value="ropa">👕 Ropa & Calzado</option>
              </select>
            </div>

            <div className="form-field">
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Precio Unitario (COP):</label>
              <input 
                type="number" 
                placeholder="50000" 
                value={form.precio} 
                onChange={e => setForm({...form, precio: e.target.value})} 
                required 
                min="1000" 
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Stock Inicial:</label>
              <input 
                type="number" 
                placeholder="10" 
                value={form.stock} 
                onChange={e => setForm({...form, stock: e.target.value})} 
                required 
                min="1" 
              />
            </div>

            <div className="form-field">
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>URL de la Imagen:</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..." 
                value={form.imagen} 
                onChange={e => setForm({...form, imagen: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>Descripción del Producto:</label>
            <textarea 
              rows="3" 
              placeholder="Especificaciones técnicas, materiales, garantía..." 
              value={form.descripcion} 
              onChange={e => setForm({...form, descripcion: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1.2rem', width: '100%' }}>
            Guardar en Base de Datos MySQL
          </button>

          {mensaje && (
            <p className="status-msg" style={{ marginTop: '1rem', color: mensaje.startsWith('✔') ? '#34d399' : '#f87171', fontWeight: 600 }}>
              {mensaje}
            </p>
          )}
        </form>
      </div>

      {/* SECCIÓN 2: Registro de Compras y Facturación */}
      <div className="admin-card-section" style={{ background: '#0b1329', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: '1.6rem', margin: 0, textAlign: 'left' }}>
              📑 Registro de Compras y Pedidos
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.3rem 0 0 0', textAlign: 'left' }}>
              Historial de transacciones validadas en tiempo real
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              Total Pedidos: {pedidos.length}
            </span>
            <button 
              type="button" 
              onClick={cargarPedidos} 
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        {cargandoPedidos ? (
          <div style={{ padding: '2.5rem', color: '#94a3b8', textAlign: 'center' }}>
            Consultando registros en base de datos...
          </div>
        ) : errorPedidos ? (
          <div style={{ padding: '2.5rem', color: '#f87171', textAlign: 'center' }}>
            {errorPedidos}
          </div>
        ) : pedidos.length === 0 ? (
          <div style={{ padding: '2.5rem', color: '#94a3b8', textAlign: 'center' }}>
            No se han registrado compras todavía.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', background: 'rgba(15, 23, 42, 0.6)', textTransform: 'uppercase', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>N° Orden</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Cliente</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Total</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Estado</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.6)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>
                      {p.numero_orden}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#fff', fontWeight: 600 }}>
                      {p.nombre_cliente}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                      {p.email_cliente}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#34d399', fontWeight: 700, fontFamily: 'monospace' }}>
                      ${Number(p.total).toLocaleString('es-CO')} COP
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {p.estado}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {new Date(p.fecha).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};