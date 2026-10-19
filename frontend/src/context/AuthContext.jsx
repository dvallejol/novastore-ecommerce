import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('nova_user');
    return guardado ? JSON.parse(guardado) : null;
  });

  const loginMock = (rol) => {
    const userMock = rol === 'ADMIN'
      ? { id: 1, nombre: 'Admin General', email: 'admin@novastore.com', rol: 'ADMIN' }
      : { id: 2, nombre: 'Cliente Registrado', email: 'cliente@novastore.com', rol: 'CLIENTE' };

    setUsuario(userMock);
    localStorage.setItem('nova_user', JSON.stringify(userMock));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('nova_user');
  };

  return (
    <AuthContext.Provider value={{ usuario, loginMock, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};