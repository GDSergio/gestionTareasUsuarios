
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
git clone https://github.com/GDSergio/gestionTareasUsuarios.git
```

Accede a la carpeta del proyecto:

```bash
cd gestionTareasUsuarios
```

2. **Instalar el vendor al Backend:**

Ejecuta el siguiente comando para acceder a la carpeta Backend:

```bash
cd Backend
```
luego de acceder a la carpeta Backend ejecutar para instalar las librerias 
```bash
composer install
```

3. **Publicar los archivos de configuración de JWT:**

Publica los archivos de configuración de JWT para Laravel:
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
4. **Generar la clave secreta de JWT:**

Genera una clave secreta para JWT:
```bash
php artisan jwt:secret
```
Esto creará una clave secreta única y la almacenará en el archivo .env.


5. **Migrar la base de datos:**

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

7.  **Iniciar el servidor de Laravel:**

Para iniciar el servidor, ejecuta el siguiente comando:
```bash
php artisan serve
```
El backend estará corriendo en http://localhost:8000.

---

# Configuración del Frontend
Para configurar el frontend con React, sigue estos pasos:


1. **Iniciar Frontend:**

- nota no es necesario descargar nuevamente el proyecto ya que se encuentra el backend y el frontend dentro del mismo repositorio
  
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
Aca ya estaras iniciando el proyecto para poder correr en funcion

el usuario administrador y el usuario guest para acceder son los siguientes

Admin: 
correo: admin@admin.com
Password: admin123

Guest
correo: guest@guest.com
Password: guest123

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
