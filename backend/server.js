require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 1. Importar rutas
const productoRoutes = require('./src/routes/productoRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const authRoutes = require('./src/routes/authRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// 2. Rutas de la API
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/auth', authRoutes); 

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// 3. Servir estáticos de React
const distPath = path.join(__dirname, 'public');
app.use(express.static(distPath));

// 4. Fallback para SPA compatible con Express 5 / path-to-regexp moderno
app.get('{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor NovaStore corriendo en el puerto ${PORT}`);
});