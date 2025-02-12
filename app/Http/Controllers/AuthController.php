<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
                'role_id' => 'required|exists:roles,id', // Valida que el role_id exista en la tabla roles
            ]);
        
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'role_id' => $validated['role_id'],
            ]);
    
            $token = JWTAuth::fromUser($user);
            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            // Captura cualquier excepción y devuelve un error con el mensaje
            return response()->json(['error' => 'Error al registrar el usuario: ' . $e->getMessage()], 500);
        }
    }
    

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    public function profile()
    {
        return response()->json(Auth::user());
    }


}
