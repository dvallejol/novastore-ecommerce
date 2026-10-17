const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL si la tienes configurada
  database: 'novastore_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;