const express = require('express');
const cors = require('cors');
const productoRoutes = require('./src/routes/productoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar las rutas
app.use('/api/productos', productoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor NovaStore corriendo en http://localhost:${PORT}`);
});