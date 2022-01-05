<?php

namespace App\Http\Controllers;

use App\Models\factura;
use App\Models\sucursal;
use Illuminate\Http\Request;
use Response;
class FacturaController extends Controller
{      
    public function verFactura(Request $req)
    {
        $id = $req->id;
        $factura = factura::with(["proveedor","items"=>function($q){
            $q->with("producto");
        }])
        ->find($id);

        $factura->items->map(function($q)
        {   
            $q->subtotal = number_format($q->producto->precio*$q->cantidad,2);
            return $q;
        });
        $factura->monto = number_format($factura->monto,2);

        $sucursal = sucursal::all()->first();

        return view("reportes.factura",["factura"=>$factura,"sucursal"=>$sucursal]);
    }
    public function getFacturas(Request $req)
    {
        $factqBuscar = $req->factqBuscar;
        $factqBuscarDate = $req->factqBuscarDate;
        $factOrderBy = $req->factOrderBy;
        $factOrderDescAsc = $req->factOrderDescAsc;

        if ($factqBuscarDate=="") {
            return factura::with(["proveedor","items"=>function($q){
                $q->with("producto");
            }])
            ->where("descripcion","LIKE","$factqBuscar%")
            ->orWhere("numfact","LIKE","$factqBuscar%")
                ->orderBy($factOrderBy,$factOrderDescAsc)
                ->get();
        }else{
            return factura::with(["proveedor","items"=>function($q){
                $q->with("producto");
            }])->where("descripcion","LIKE","$factqBuscar%")->where("created_at","LIKE","$factqBuscarDate%")
                ->orderBy($factOrderBy,$factOrderDescAsc)
                ->get();
        }
    }

    public function setFactura(Request $req)
    {
        try {
            $id = $req->id;
            $factInpid_proveedor = $req->factInpid_proveedor;
            $factInpnumfact = $req->factInpnumfact;
            $factInpdescripcion = $req->factInpdescripcion;
            $factInpmonto = $req->factInpmonto;
            $factInpfechavencimiento = $req->factInpfechavencimiento;
            $factInpestatus = $req->factInpestatus;



            factura::updateOrCreate(
                [
                    "id" => $id,
                ],
                [
                    "id_proveedor" => $factInpid_proveedor,
                    "numfact" => $factInpnumfact,
                    "descripcion" => $factInpdescripcion,
                    "monto" => $factInpmonto,
                    "fechavencimiento" => $factInpfechavencimiento,
                    "estatus" => $factInpestatus,

                ]

            );
            return Response::json(["msj"=>"Éxito","estado"=>true]);
            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }
      
    }

    public function delFactura(Request $req)
    {
        try {
            $id = $req->id;
            factura::find($id)->delete();
            return Response::json(["msj"=>"Éxito al eliminar","estado"=>true]);

            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }
    }

    
    

}
