# 🛍️ Listana

![Portada](https://listana.ndnestor.com/assets/images/share-cover.webp)

**Listana** es una aplicación web moderna para crear, gestionar y compartir listas de compras de forma colaborativa. Pensada para facilitar la organización entre miembros de una familia, amigos o compañeros de casa.

Puedes crear tus propias listas, invitar usuarios mediante correo, seguir el estado de los productos (comprados o pendientes), y llevar un control del total de productos y precios estimados.

---

## ⚙️ Tecnologías utilizadas

- **Laravel 10+** – Backend robusto en PHP
- **React.js** – Frontend interactivo
- **Inertia.js** – Navegación fluida sin recargas
- **Laravel Socialite** – Autenticación con terceros (Google, etc.)
- **Tailwind CSS** – Estilos modernos y responsivos
- **MySQL** – Base de datos relacional

---

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/listana.git
cd listana

# Instalar dependencias de PHP
composer install

# Instalar dependencias de JavaScript
npm install && npm run dev

# Copiar y configurar entorno
cp .env.example .env
php artisan key:generate

# Configura tu base de datos en .env
php artisan migrate
```

Opcionalmente, puedes ejecutar:

```bash
php artisan db:seed
```

---

## 📜 Rutas principales

### 🏠 Página principal

- `/` → Muestra el Home de bienvenida

### 👤 Autenticación

- `/login` → Inicio de sesión
- `/register` → Registro de usuario
- `/logout` → Cierre de sesión

### 📋 Dashboard

- `/dashboard` → Vista con resumen de tus listas y productos

### 🔐 Configuración y Perfil

- `/privacy` → Política de privacidad
- `/profile` (POST) → Actualizar perfil
- `/` (GET) → Página de configuración

### 📅 Listas de compras

- `/` (GET) → Ver todas las listas del usuario
- `/s/{uuid}` (GET) → Ver detalles de una lista específica
- `/create-list` (POST) → Crear nueva lista
- `/status/{shoppingList}` (POST) → Cambiar estado (activa/inactiva)
- `/update/{shoppingList}` (POST) → Actualizar una lista
- `/destroy/{shoppingList}` (POST) → Eliminar una lista

### 🛍️ Productos

- `/store` (POST) → Agregar nuevo producto
- `/update/{product}` (POST) → Actualizar producto

### 📧 Correos sugeridos (para compartir)

- `/suggest-emails?q={texto}` (GET) → Buscar emails por texto parcial

---

## 🙏 Contribuciones

Este proyecto está en constante mejora. Si deseas contribuir, envía un Pull Request o crea un issue con sugerencias.

---

## © Licencia

Listana es un proyecto personal. Todos los derechos reservados. Puedes usarlo con fines educativos o personales.
