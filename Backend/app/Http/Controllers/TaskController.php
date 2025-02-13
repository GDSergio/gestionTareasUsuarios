<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

    // Verifico que el usuario este autenticado
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        // Si el usuario es un administrador, puede ver todas las tareas
        if (Auth::user()->role_id === 1) {
            // Admin puede ver todas las tareas
            $tasks = Task::all();
        } else {
            // Si no es administrador, solo puede ver las tareas que le pertenecen
            $tasks = Task::where('user_id', Auth::id())->get();
        }

        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',  // Suponiendo que 'completed' es un valor booleano
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Tarea creada con éxito',
            'task' => $task
        ], 201);
    }

    public function update(Request $request, Task $task)
    {
        // Verificar si el usuario autenticado es un administrador o si la tarea pertenece a él
        if (Auth::user()->role_id !== 1 && $task->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'No autorizado para editar esta tarea.'
            ], 403);
        }

        // Actualizar la tarea
        $task->update($request->only(['title', 'description', 'status']));

        return response()->json([
            'message' => 'Tarea actualizada con éxito',
            'task' => $task
        ]);
    }


    public function destroy(Task $task)
    {
        // Verificar si el usuario autenticado es un administrador o si la tarea pertenece a él
        if (Auth::user()->role_id !== 1 && $task->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'No autorizado para eliminar esta tarea.'
            ], 403);
        }

        // Eliminar la tarea
        $task->delete();

        return response()->json([
            'message' => 'Tarea eliminada con éxito'
        ]);
    }

}
