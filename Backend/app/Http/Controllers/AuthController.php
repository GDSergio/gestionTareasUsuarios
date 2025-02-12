<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register(RegisterUserRequest $request)
    {
        try {
           
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => $request->role_id,
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'message' => 'Usuario registrado exitosamente',
                'token' => $token,
            ], 201);

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
