CREATE DATABASE IF NOT EXISTS novastore_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE novastore_db;

-- Roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);
INSERT INTO roles (id, nombre) VALUES (1, 'ADMIN'), (2, 'CLIENTE')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL DEFAULT 2,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO categorias (id, nombre) VALUES (1, 'tecnologia'), (2, 'ropa')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- Productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria_id INT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    stock INT NOT NULL DEFAULT 5,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Datos iniciales de prueba
INSERT INTO usuarios (id, nombre, email, password, rol_id) VALUES
(1, 'Administrador General', 'admin@novastore.com', 'admin123', 1),
(2, 'Cliente Prueba', 'cliente@novastore.com', 'cliente123', 2)
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO productos (nombre, categoria_id, precio, descripcion, imagen, stock) VALUES
('Portátil Ultrabook Core i7 16GB', 1, 3850000.00, 'Pantalla 14 pulgadas FHD, SSD 512GB NVMe.', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', 8),
('Auriculares Inalámbricos Pro ANC', 1, 480000.00, 'Cancelación activa de ruido y batería de 40 horas.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 15),
('Chaqueta Térmica Urbana', 2, 220000.00, 'Impermeable, con capota desmontable y bolsillos térmicos.', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', 20),
('Camiseta Polo Algodón Premium', 2, 95000.00, 'Algodón peinado suave de alta resistencia.', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80', 30);