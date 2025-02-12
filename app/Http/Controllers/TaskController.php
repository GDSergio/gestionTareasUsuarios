<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::where('user_id', Auth::id())->get());
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
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'No autorizado para editar esta tarea.'
            ], 403);
        }

        $task->update($request->only(['title', 'description', 'status']));
        return response()->json([
            'message' => 'Tarea actualizada con éxito',
            'task' => $task
        ]);
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'No autorizado para eliminar esta tarea.'
            ], 403);
        }
    
        $task->delete();
        return response()->json([
            'message' => 'Tarea eliminada con éxito'
        ]);
    }
}
