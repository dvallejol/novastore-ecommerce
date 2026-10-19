import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { usuario } = useContext(AuthContext);

  const agregarAlCarrito = (producto) => {
    // REGLA OBLIGATORIA: Validar inicio de sesión
    if (!usuario) {
      alert('Debes iniciar sesión para usar el carrito de compras y realizar pedidos.');
      return false;
    }

    setItems((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    return true;
  };

  const eliminarDelCarrito = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const subtotal = items.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <CartContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, subtotal, iva, total }}>
      {children}
    </CartContext.Provider>
  );
};