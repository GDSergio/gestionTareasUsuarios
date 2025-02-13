<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        // Verifica si los roles existen
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $guestRole = Role::firstOrCreate(['name' => 'guest']);

        // Crear usuario administrador
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role_id' => $adminRole->id,
        ]);

        // Crear usuario invitado
        User::create([
            'name' => 'Guest',
            'email' => 'guest@guest.com',
            'password' => Hash::make('guest123'),
            'role_id' => $guestRole->id,
        ]);
    }
}
