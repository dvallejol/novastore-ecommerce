// frontend/src/components/LoginModal.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const LoginModal = ({ isOpen, onClose }) => {
  const { iniciarSesion } = useContext(AuthContext);

  // Estado para alternar entre Login y Registro
  const [esRegistro, setEsRegistro] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState('CLIENTE');

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetFormulario = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleCerrar = () => {
    resetFormulario();
    setEsRegistro(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (esRegistro) {
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          setCargando(false);
          return;
        }

        // Endpoint de registro (crea el usuario con rol_id = 2 en MySQL)
        const res = await fetch('/api/auth/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.mensaje || 'Error al crear la cuenta.');
        }

        if (iniciarSesion) iniciarSesion(data.usuario);
        handleCerrar();
      } else {
        // Endpoint de login
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.mensaje || 'Credenciales incorrectas.');
        }

        if (iniciarSesion) iniciarSesion(data.usuario);
        handleCerrar();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error de conexión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="factura-modal-overlay">
      <div className="factura-modal-card" style={{ maxWidth: '420px', padding: '1.75rem' }}>
        
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
              {esRegistro ? 'Crear Cuenta' : 'Inicia Sesión'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
              {esRegistro ? 'Regístrate para comprar y gestionar tus órdenes' : '¡Hola! Ingresa tus datos para continuar'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Pestañas modo login */}
        {!esRegistro && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: '#070c1b', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => {
                setRolSeleccionado('CLIENTE');
                setEmail('cliente@novastore.com');
                setPassword('cliente123');
              }}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '8px',
                border: 'none',
                background: rolSeleccionado === 'CLIENTE' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: rolSeleccionado === 'CLIENTE' ? '#38bdf8' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              🛍️ CLIENTE
            </button>
            <button
              type="button"
              onClick={() => {
                setRolSeleccionado('ADMIN');
                setEmail('admin@novastore.com');
                setPassword('admin123');
              }}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '8px',
                border: 'none',
                background: rolSeleccionado === 'ADMIN' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: rolSeleccionado === 'ADMIN' ? '#38bdf8' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              ⚙ ADMINISTRADOR
            </button>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          
          {esRegistro && (
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                Nombre Completo
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Diego Vallejo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              Correo electrónico
            </label>
            <input
              type="email"
              required
              placeholder="cliente@novastore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#fff',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.88rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#fff',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.88rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {esRegistro && (
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                Confirmar Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {error && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center', margin: '0.2rem 0' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.4rem', fontWeight: 800 }}
          >
            {cargando ? 'Procesando...' : esRegistro ? 'Registrarme' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Botón para cambiar entre Login y Registro */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.82rem', color: '#94a3b8' }}>
          {esRegistro ? (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  resetFormulario();
                  setEsRegistro(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Inicia sesión aquí
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  resetFormulario();
                  setEsRegistro(true);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Regístrate
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};