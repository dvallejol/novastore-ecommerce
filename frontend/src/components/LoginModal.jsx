// frontend/src/components/LoginModal.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const LoginModal = ({ isOpen, onClose }) => {
  const { loginMock } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('CLIENTE'); // CLIENTE o ADMIN
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación interactiva rápida para simulación
    if (activeTab === 'ADMIN') {
      if (email === 'admin@novastore.com' && password === 'admin123') {
        loginMock('ADMIN');
        onClose();
      } else {
        setError('Acceso denegado. Para Admin usa: admin@novastore.com y admin123');
      }
    } else {
      if (email === 'cliente@novastore.com' && password === 'cliente123') {
        loginMock('CLIENTE');
        onClose();
      } else {
        setError('Acceso denegado. Para Cliente usa: cliente@novastore.com y cliente123');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <h2>Inicia Sesión</h2>
        <p className="modal-subtitle">¡Hola! Ingresa tus datos para continuar</p>

        {/* Tabs de Rol */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'CLIENTE' ? 'active blue-glow' : ''}`}
            onClick={() => { setActiveTab('CLIENTE'); setEmail('cliente@novastore.com'); setPassword('cliente123'); setError(''); }}
          >
            🛍 CLIENTE
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ADMIN' ? 'active amber-glow' : ''}`}
            onClick={() => { setActiveTab('ADMIN'); setEmail('admin@novastore.com'); setPassword('admin123'); setError(''); }}
          >
            ⚙ ADMINISTRADOR
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label>Correo electrónico</label>
            <div className="input-with-icon">
              <span>👤</span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="ejemplo@novastore.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-with-icon">
              <span>🔒</span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="modal-error-msg">{error}</p>}

          <button type="submit" className="btn-primary btn-block glow-button">
            Iniciar Sesión
          </button>

          <div className="modal-footer">
            <a href="#recuperar" onClick={(e) => { e.preventDefault(); alert('Función de recuperación en desarrollo'); }}>¿Olvidaste tu contraseña?</a>
            <p>¿No tienes cuenta? <a href="#registro" onClick={(e) => { e.preventDefault(); alert('Módulo de registro en desarrollo'); }}>Regístrate</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};