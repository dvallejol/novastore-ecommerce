# NovaStore E-Commerce 🛒✨

Plataforma integral de comercio electrónico para líneas de tecnología y vestuario urbano contemporáneo. Desarrollada bajo los lineamientos académicos de la **Corporación Unificada Nacional de Educación Superior (CUN)** con una arquitectura desacoplada en 4 capas y control de versiones bajo metodología Git Flow.

---

## 👥 Desarrolladores (Autores)
* **Diego Vallejo Llano** — *Ingeniería de Sistemas*
* **Johanna Andrea Camacho Téllez** — *Ingeniería de Sistemas*

---

## 🏛 Arquitectura del Sistema (4 Capas)

El software sigue el patrón de separación estricta de responsabilidades:

1. **Capa de Presentación (Frontend - SPA):**
   - Construida con **React 18** y **Vite**.
   - Enrutamiento dinámico mediante `react-router-dom`.
   - Gestión de estado global con Context API (`AuthContext` y `CartContext`).
   - Abstracción de llamadas de red mediante el patrón de repositorio HTTP (`productoHttpRepository.js`).
   - Animación nativa bidimensional con **HTML5 Canvas** en el pie de página.

2. **Capa de Controladores (Backend - API REST):**
   - Implementada en **Node.js** con el framework **Express**.
   - Mapeo de rutas (`/api/productos`), recepción de peticiones HTTP, validación de parámetros y serialización de respuestas en formato JSON.

3. **Capa de Lógica de Negocio (Servicios):**
   - Validación de reglas de dominio (control de stock, cálculo de impuestos IVA 19%, obligatoriedad de autenticación para compras y validación de atributos obligatorios).

4. **Capa de Acceso a Datos (Repositorio & MySQL):**
   - Persistencia relacional con el driver `mysql2`.
   - Consultas SQL parametrizadas para mitigación de vulnerabilidades de inyección SQL (*SQL Injection*).
   - Relación de integridad referencial entre tablas `productos` y `categorias` (`categoria_id = 1` para Tecnología y `categoria_id = 2` para Ropa).

---

## 🌟 Funcionalidades y Experiencia de Usuario (UI/UX)

* **Hero Slider Publicitario:** Banner dinámico rotativo con ofertas de temporada y redirección directa por categoría.
* **Inspección con Zoom Óptico (Tipo Mercado Libre):** Ficha de detalle de producto con ampliación dinámica al deslizar el cursor sobre la imagen.
* **Carrito de Compras Interactivo:** Lista de artículos con miniaturas fotográficas, controles incrementales/decrementales (`+` / `−`), cálculo de subtotales, IVA y opción de vaciado.
* **Autenticación Multirrol:** Modal estilizado con *Glassmorphism* y pestañas para roles `CLIENTE` y `ADMINISTRADOR`.
* **Panel de Administración:** Módulo exclusivo para rol `ADMIN` con formulario de doble columna para el registro directo de ítems en MySQL.
* **Widget Asistente Virtual "Nova":** Botón flotante con avatar personalizado y pulso luminoso, respuestas automatizadas a preguntas frecuentes y derivación directa a WhatsApp (+57 324 269 9355).
* **Footer Interactivo con Canvas:** Animación de constelación de partículas de neón en segundo plano con ficha técnica y créditos del equipo.

---

## 🔀 Estrategia de Control de Versiones (Git Flow)

El desarrollo colaborativo se organizó mediante el modelo de ramificación:

* **`main`**: Versión estable de producción lista para despliegue y sustentación (v1.1.0).
* **`develop`**: Rama integradora donde convergen las características antes de su liberación.
* **`feature/diego-backend`**: Implementación de la API REST, configuración del servidor Express, conexión con MySQL y esquemas relacionales.
* **`feature/johanna-frontend`**: Maquetación de la SPA en React, componentes UI, estilos CSS, contextos y widgets interactivos.

---

## 🛠 Requisitos Previos

* **Node.js** (v18.0.0 o superior)
* **npm** (v9.0.0 o superior)
* **MySQL Server** (v8.0 o mediante XAMPP / MariaDB en el puerto por defecto `3306`)

---

## 🚀 Puesta en Marcha en Entorno Local

### 1. Base de Datos (MySQL)
1. Inicia el servicio de MySQL (Workbench o phpMyAdmin).
2. Crea la base de datos y ejecuta las migraciones:
   ```sql
   CREATE DATABASE IF NOT EXISTS novastore_db;
   USE novastore_db;

# Entrar a la carpeta del servidor
cd backend

# Instalar dependencias
npm install

# Iniciar servidor Express
node server.js

# Abrir una nueva terminal y entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con Vite
npm run dev

RolCorreo ElectrónicoContraseñaPermisosClientecliente@novastore.comcliente123Explorar, zoom, añadir al carrito y comprarAdministradoradmin@novastore.comadmin123Acceso a /admin para registrar productos en MySQL