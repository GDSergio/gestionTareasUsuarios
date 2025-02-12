<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TasksSeeder extends Seeder
{
    public function run()
    {
        // Obtener un usuario aleatorio
        $user = User::inRandomOrder()->first();

        // Crear algunas tareas de ejemplo
        Task::create([
            'title' => "Diseñar tareas",
            'description' => "crear y asignar las tareas.",
            'status' => "pendiente",
            'user_id' => $user->id,
        ]);

        Task::create([
            'title' => "Modulo cronograma de muestreo",
            'description' => "Realizar listas desplegables del modulo muestreo",
            'status' => "progreso",
            'user_id' => $user->id,
        ]);
    }
}
