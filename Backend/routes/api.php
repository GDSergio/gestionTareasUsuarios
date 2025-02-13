<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']); 

Route::post('login', [AuthController::class, 'login']); 

Route::middleware('auth:api')->group(function () {

    Route::get('profile', [AuthController::class, 'profile']); // Obtener el perfil

    // Solo el admin puede ver todas las tareas, los usuarios normales solo pueden ver sus mismas tareas
    Route::get('tasks', [TaskController::class, 'index']);

    // Crear una tarea (todos los usuarios pueden crear tareas)
    Route::post('tasks', [TaskController::class, 'store']);

    // Solo el admin o el dueño de la tarea pueden actualizarla
    Route::put('tasks/{task}', [TaskController::class, 'update'])->middleware('admin_or_owner');

    // Solo el admin o el dueño de la tarea pueden eliminarla
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->middleware('admin_or_owner');
});

Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']); // Cerrar sesión