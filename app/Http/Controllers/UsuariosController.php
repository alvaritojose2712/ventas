<?php

namespace App\Http\Controllers;

use App\Models\usuarios;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

use Response;


class UsuariosController extends Controller
{
    public function setUsuario(Request $req)
    {
        try {
            usuarios::updateOrCreate(
                ["id"=>$req->id],[
                "nombre"=>$req->nombres,
                "usuario"=>$req->usuario,
                "clave"=>Hash::make($req->clave),
                "tipo_usuario"=>$req->role,
            ]);
        } catch (\Exception $e) {
            
        }
    }
    public function delUsuario(Request $req)
    {
        try {
            $id = $req->id;
            if ($id) {
                usuarios::find($id)->delete();
            }
            return Response::json(["msj"=>"Éxito al eliminar usuario.","estado"=>true]);
            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }
    }

    public function getUsuarios(Request $req)
    {
        return usuarios::all(["id","nombre","usuario","tipo_usuario"]);
    }
    
}
