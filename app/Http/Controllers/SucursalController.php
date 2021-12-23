<?php

namespace App\Http\Controllers;

use App\Models\sucursal;
use Illuminate\Http\Request;

class SucursalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        $su = sucursal::find(1);
        return view("sucursal.crear",["sucursal"=>$su]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function setSucursal(Request $req)
    {
        if(sucursal::updateOrCreate(["id"=>1],[
                    "id"=>1,
                    "sucursal"=>$req->sucursal,
                    "codigo"=>$req->codigo,
                    "direccion_registro"=>$req->direccion_registro,
                    "direccion_sucursal"=>$req->direccion_sucursal,
                    "telefono1"=>$req->telefono1,
                    "telefono2"=>$req->telefono2,
                    "tickera"=> $req->tickera,
                    "fiscal"=> $req->fiscal,
                    
                    "correo"=> $req->correo,
                    "nombre_registro"=> $req->nombre_registro,
                    "rif"=> $req->rif,
                ])){
            return "¡Éxito!";
        }else{
            return "Error";

        }
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
     * @param  \App\Models\sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function show(sucursal $sucursal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function edit(sucursal $sucursal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, sucursal $sucursal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function destroy(sucursal $sucursal)
    {
        //
    }
}
