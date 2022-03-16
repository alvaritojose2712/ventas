<?php

namespace App\Http\Controllers;

use App\Models\pago_facturas;
use App\Models\factura;
use Illuminate\Http\Request;
use Response;

class PagoFacturasController extends Controller
{
    public function getPagoProveedor(Request $req)
    {
        $id_proveedor = $req->id_proveedor;
        $facturas = factura::where("id_proveedor",$id_proveedor)->orderBy("created_at","desc")->get();
        $pagos = pago_facturas::where("id_proveedor",$id_proveedor)->orderBy("created_at","desc")->get();

        return $facturas->merge($pagos);

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
