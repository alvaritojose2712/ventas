<?php

namespace App\Http\Controllers;

use App\Models\home;
use App\Models\usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Response;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("facturar.index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    public function selectRedirect()
    {
      $selectRedirect = "/";
        switch(session("tipo_usuario")){
            case 1:
                $selectRedirect = '/admin';
                break;
            case 2:
                $selectRedirect = '/cajero';
                break;
            default:
                $selectRedirect = '/login';
        }
      return $selectRedirect;
         
        // return $next($request);
    } 
    public function verificarLogin(Request $req)
    {
        if (session()->has("id_usuario")) {
            return Response::json( ["estado"=>true] );
        }else{
            return Response::json( ["estado"=>false] );
        }
    }
    public function logout(Request $request)
    {
        $request->session()->flush();

    }
    public function login(Request $req)
    {
        try {

            $d = usuarios::where(function($query) use ($req){
                $query->orWhere('usuario', $req->usuario);
            })
            ->first();
            
            if ($d&&Hash::check($req->clave, $d->clave)) {
                 session([
                    "id_usuario" => $d->id,
                    "tipo_usuario" => $d->tipo_usuario,
                    "usuario" => $d->usuario,
                    "nombre" => $d->nombre,
                ]);
                
                $estado = $this->selectRedirect();
            }else{
                throw new \Exception("¡Datos Incorrectos!", 1);
                
            } 
            
            return Response::json( ["estado"=>true,"msj"=>"¡Inicio exitoso! Bienvenido/a, ".$d->nombre] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
        
        
        return Response::json(["estado"=>$estado,"user"=>$d]);
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\home  $home
     * @return \Illuminate\Http\Response
     */
    public function show(home $home)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\home  $home
     * @return \Illuminate\Http\Response
     */
    public function edit(home $home)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\home  $home
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, home $home)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\home  $home
     * @return \Illuminate\Http\Response
     */
    public function destroy(home $home)
    {
        //
    }
}
