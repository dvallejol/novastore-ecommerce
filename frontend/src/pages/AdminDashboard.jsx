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
      setMensaje('✔ Producto guardado directamente en la base de datos.');
      setForm({ nombre: '', categoria: 'tecnologia', precio: '', stock: '', imagen: '', descripcion: '' });
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container admin-page">
      <h2>Panel de Administración - Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>Nombre:</label>
        <input type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />

        <label>Categoría:</label>
        <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
          <option value="tecnologia">Tecnología</option>
          <option value="ropa">Ropa</option>
        </select>

        <label>Precio Unitario (COP):</label>
        <input type="number" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required min="1000" />

        <label>Stock:</label>
        <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required min="1" />

        <label>URL Imagen:</label>
        <input type="url" value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} required placeholder="https://..." />

        <label>Descripción:</label>
        <textarea rows="3" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} required />

        <button type="submit" className="btn-primary">Guardar en Base de Datos</button>
        {mensaje && <p className="status-msg">{mensaje}</p>}
      </form>
    </div>
  );
};