<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email', // Validar que el correo sea único
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:roles,id', // Validar que el role_id exista
        ];
    }

    /**
     * Obtener los mensajes de error personalizados para las validaciones.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.unique' => 'Este correo ya se encuentra asociado a otra cuenta. Por favor, intente con otro correo.',
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña requiere minimo 8 caracteres.',
            'role_id.exists' => 'El rol seleccionado no existe.',
        ];
    }
}
