import { api } from '../services/api';

export const productoHttpRepository = {
  async obtenerTodos(categoria = 'todos') {
    const query = categoria !== 'todos' ? `?categoria=${categoria}` : '';
    const response = await api.get(`/productos${query}`);
    return response.data;
  },

  async obtenerPorId(id) {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  async crear(nuevoProducto) {
    const response = await api.post('/productos', nuevoProducto);
    return response.data;
  }
};