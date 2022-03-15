<?php

namespace App\Http\Controllers;

use App\Models\pago_facturas;
use Illuminate\Http\Request;
use Response;

class PagoFacturasController extends Controller
{
    public function getPagoProveedor(Request $req)
    {
        # code...
    }
   public function setPagoProveedor(Request $req)
   {
       try {
            $pago = new pago_facturas;
            $pago->tipo = $req->tipo;
            $pago->monto = $req->monto;
            $pago->id_proveedor = $req->id_proveedor;
            $pago->save();
            return Response::json(["msj"=>"¡Éxito al agregar pago a proveedor!","estado"=>true]);

            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }
   } 
}
