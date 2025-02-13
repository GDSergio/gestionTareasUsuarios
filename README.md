
# Gestión de Tareas y Usuarios

Este proyecto es una aplicación para la gestión de tareas y usuarios. El backend está desarrollado con Laravel y el frontend con React, proporcionando una interfaz interactiva para gestionar tareas asignadas a usuarios, así como una autenticación segura mediante JWT.

## Requisitos

### Backend (Laravel)
- PHP 8.0 o superior
- Composer
- MySQL o MariaDB
### Frontend (React)
- Node.js 16 o superior
- npm (o yarn)

---
## Configuración del Backend
Para configurar el backend de Laravel, sigue estos pasos:

1. **Clonar Repositorio**

Primero, accede a tu carpeta donde desea clonar el proyecto:

```bash
git clone 
```

Accede a la carpeta del proyecto:

```bash
cd gestionTareasUsuarios
```

2. **Instalar la librería JWT para autenticación:**

Ejecuta el siguiente comando para instalar la librería JWT:

```bash
composer require tymon/jwt-auth
```

3. **Publicar los archivos de configuración de JWT:**

Publica los archivos de configuración de JWT para Laravel:
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
3. **Generar la clave secreta de JWT:**

Genera una clave secreta para JWT:
```bash
php artisan jwt:secret
```
Esto creará una clave secreta única y la almacenará en el archivo .env.


3. **Migrar la base de datos:**

Ejecuta las migraciones para crear las tablas necesarias:

 ```bash
php artisan migrate
```

6. **Crear los seeders para las tablas:**

Crea los seeders para las tablas de roles, usuarios y tareas:
```bash
php artisan make:seeder RoleSeeder
php artisan make:seeder UsersSeeder
php artisan make:seeder TasksSeeder
```
Luego corre los seeders para llenar la base de datos con datos de prueba:
 ```bash
php artisan migrate --seed
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UsersSeeder
php artisan db:seed --class=TasksSeeder
```

7. **Crear los controladores:**
Crea los controladores para manejar la autenticación y las tareas:
 ```bash
php artisan make:controller AuthController
php artisan make:controller TaskController
```

8. **Iniciar el servidor de Laravel:**

Para iniciar el servidor, ejecuta el siguiente comando:
```bash
php artisan serve
```
El backend estará corriendo en http://localhost:8000.

---

# Configuración del Frontend
Para configurar el frontend con React, sigue estos pasos:


1. **Crear el proyecto con Vite:**


Primero, crea el proyecto de React utilizando Vite:

```bash
npx create-vite@latest frontend --template react
```

Accede a la carpeta del frontend:
```bash
cd frontend
```

2. **Instalar las dependencias:**

Instala las dependencias necesarias:

 ```bash
npm install
```
- react-router-dom para manejar las rutas.
- axios para realizar peticiones HTTP a la API.
- bootstrap y react-bootstrap para el diseño responsivo y la interfaz de usuario.
- react-icons para iconos en la aplicación.

Ejecuta los siguientes comandos:

```bash
npm install react-router-dom
npm install axios
npm install bootstrap react-bootstrap
npm install react-icons
```

3. **Iniciar el servidor de desarrollo:**

Para iniciar el servidor de desarrollo de React, ejecuta:

 ```bash
npm run dev
```

El frontend estará corriendo en http://localhost:5173.

---

## Endpoints de la API
Aquí están los principales endpoints de la API del backend:

- POST /api/login: Autenticación de usuarios con JWT.
- POST /api/register: Registro de nuevos usuarios.
- GET /api/profile: Obtener información del perfil del usuario autenticado.
- GET /api/tasks: Obtener todas las tareas.
- POST /api/tasks: Crear una nueva tarea.
- PUT /api/tasks/{id}: Actualizar una tarea existente.
- DELETE /api/tasks/{id}: Eliminar una tarea.
- POST /api/logout: Cerrar sesión del usuario (invalidar el token - JWT).

--- 
## Documentación de la API
La documentación de los endpoints está disponible en la carpeta ```public/docs```, donde se encuentra el archivo Postman Collection con todos los endpoints configurados para que puedas importarlos directamente a Postman y probar la API.

## Estructura del Proyecto
#### Backend
- app/Http/Controllers/TaskController.php: Controlador para manejar las tareas.
- app/Http/Controllers/AuthController.php: Controlador para manejar la autenticación.
- config/jwt.php: Configuración de la librería JWT.
- database/migrations/: Archivos de migraciones para crear las tablas.
- database/seeders/: Archivos para insertar datos de prueba en la base de datos.
#### Frontend
- rc/App.jsx: Componente principal donde se consume la API de tareas.
- src/components/: Carpeta con los componentes de React (por ejemplo, formulario de tareas, vista de tareas, etc.).
- src/services/api.js: Archivo donde se configuran las peticiones HTTP con axios.
