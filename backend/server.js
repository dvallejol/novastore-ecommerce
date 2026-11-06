require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const productoRoutes = require('./src/routes/productoRoutes');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// 1. Rutas de la API
app.use('/api/productos', productoRoutes);

// Ruta de diagnóstico simple
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// 2. Servir los archivos estáticos de React (Vite)
const distPath = path.join(__dirname, 'public');
app.use(express.static(distPath));

// 3. Soporte para React Router (SPA): cualquier ruta que no sea API entrega index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Puerto dinámico asignado por Hostinger o 3000 en local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor NovaStore corriendo en el puerto ${PORT}`);
});