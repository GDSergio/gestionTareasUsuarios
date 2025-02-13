<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdminOrOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        // Si el usuario es admin (role_id = 1) o el dueño de la tarea
        if ($user->role_id === 1 || $user->id === $request->task->user_id) {
            return $next($request);
        }

        // Si no es admin ni dueño de la tarea, se niega el acceso
        return response()->json(['error' => 'No tienes permisos para acceder a esta tarea'], 403);
    }
}
