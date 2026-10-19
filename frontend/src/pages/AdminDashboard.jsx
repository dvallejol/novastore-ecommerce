import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { productoHttpRepository } from '../repositories/productoHttpRepository';
import { Navigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { usuario } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'tecnologia',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: ''
  });
  const [mensaje, setMensaje] = useState('');

  if (!usuario || usuario.rol !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productoHttpRepository.crear(form);
      setMensaje('✔ Producto guardado con éxito directamente en MySQL.');
      setForm({ nombre: '', categoria: 'tecnologia', precio: '', stock: '', imagen: '', descripcion: '' });
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container admin-page">
      <h2>Panel Administrativo — Registrar Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-field">
          <label>Nombre del Producto:</label>
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
            <label>Categoría:</label>
            <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
              <option value="tecnologia">💻 Tecnología</option>
              <option value="ropa">👕 Ropa & Calzado</option>
            </select>
          </div>

          <div className="form-field">
            <label>Precio Unitario (COP):</label>
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
            <label>Stock Inicial:</label>
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
            <label>URL de la Imagen:</label>
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
          <label>Descripción del Producto:</label>
          <textarea 
            rows="3" 
            placeholder="Especificaciones técnicas, materiales, garantía..." 
            value={form.descripcion} 
            onChange={e => setForm({...form, descripcion: e.target.value})} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary btn-block" style={{ marginTop: '0.8rem' }}>
          Guardar en Base de Datos MySQL
        </button>

        {mensaje && <p className="status-msg">{mensaje}</p>}
      </form>
    </div>
  );
};