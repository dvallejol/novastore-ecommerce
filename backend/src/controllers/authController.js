// backend/src/controllers/authController.js
const pool = require('../../config/db');

// REGISTRO DE NUEVO CLIENTE (rol_id = 2)
exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // 1. Verificar si el correo ya está registrado
    const [existente] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existente.length > 0) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    // 2. Insertar nuevo usuario con rol_id = 2 (Cliente)
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, 2)',
      [nombre, email, password]
    );

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: 'CLIENTE',
        rol_id: 2
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al registrar' });
  }
};

// INICIO DE SESIÓN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Debe ingresar correo y contraseña' });
    }

    // Consulta con JOIN para obtener el nombre del rol (ADMIN o CLIENTE)
    const [rows] = await pool.query(
      `SELECT u.id, u.nombre, u.email, u.password, u.rol_id, r.nombre AS rol_nombre 
       FROM usuarios u
       LEFT JOIN roles r ON u.rol_id = r.id
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const usuario = rows[0];

    // Validación de contraseña (compatible con texto plano como admin123 o cliente123)
    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Normalizar el nombre del rol a mayúsculas para las vistas del frontend
    const rolFormateado = usuario.rol_nombre ? usuario.rol_nombre.toUpperCase() : (usuario.rol_id === 1 ? 'ADMIN' : 'CLIENTE');

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: rolFormateado,
        rol_id: usuario.rol_id
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};