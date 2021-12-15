<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!session()->has('role')) {
            return redirect()->route("login");
        }
        
        if (session('role') == 1) {
            return $next($request);
        }
        if (session('role') == 2) {
            return redirect()->route("caja");
        }
    }
}
