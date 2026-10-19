// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { usuario } = useContext(AuthContext);

  const agregarAlCarrito = (producto) => {
    if (!usuario) {
      alert('Debes iniciar sesión para usar el carrito de compras.');
      return false;
    }

    setItems((prevItems) => {
      const existe = prevItems.find((item) => item.id === producto.id);
      if (existe) {
        return prevItems.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevItems, { ...producto, cantidad: 1 }];
    });
    return true;
  };

  const actualizarCantidad = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const eliminarDelCarrito = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const subtotal = items.reduce((acc, el) => acc + (Number(el.precio) * el.cantidad), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <CartContext.Provider
      value={{
        items,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        subtotal,
        iva,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};