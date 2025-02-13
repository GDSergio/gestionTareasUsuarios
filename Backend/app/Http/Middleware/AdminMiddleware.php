<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar si el usuario autenticado tiene el rol de admin
        if (Auth::check() && Auth::user()->role_id == 1) {
            // Si es admin, permite que la solicitud continúe
            return $next($request);
        }

        // Si no es admin, puedes redirigirlo o devolver un error
        return response()->json(['message' => 'Acceso denegado'], 403);
    }
}
