import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('nova_user');
    return guardado ? JSON.parse(guardado) : null;
  });

  // Autenticación con datos reales de MySQL (Login y Registro)
  const iniciarSesion = (userData) => {
    const userNormalizado = {
      id: userData.id,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol || (userData.rol_id === 1 ? 'ADMIN' : 'CLIENTE'),
      rol_id: userData.rol_id || (userData.rol === 'ADMIN' ? 1 : 2)
    };

    setUsuario(userNormalizado);
    localStorage.setItem('nova_user', JSON.stringify(userNormalizado));
  };

  // Mantener loginMock para pruebas rápidas
  const loginMock = (rol) => {
    const userMock = rol === 'ADMIN'
      ? { id: 1, nombre: 'Admin General', email: 'admin@novastore.com', rol: 'ADMIN', rol_id: 1 }
      : { id: 2, nombre: 'Cliente Registrado', email: 'cliente@novastore.com', rol: 'CLIENTE', rol_id: 2 };

    setUsuario(userMock);
    localStorage.setItem('nova_user', JSON.stringify(userMock));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('nova_user');
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      iniciarSesion, 
      login: iniciarSesion, 
      loginMock, 
      cerrarSesion 
    }}>
      {children}
    </AuthContext.Provider>
  );
};