<?php

namespace App\Http\Controllers;

use App\Models\items_pedidos;
use Illuminate\Http\Request;
use Response;

class ItemsPedidosController extends Controller
{
    

   
    public function delItemPedido(Request $req)
    {   
        return (new InventarioController)->hacer_pedido($req->index,null,99,"del");
    }
    public function setDescuentoUnitario(Request $req)
    {


        try {
            (new PedidosController)->checkPedidoAuth($req->index,"item");

            $item = items_pedidos::find($req->index);
            $item->descuento = floatval($req->descuento);
            $item->save();

            return Response::json(["msj"=>"¡Éxito!","estado"=>true]);
            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }
    }

    public function setCantidad(Request $req)
    {
        return (new InventarioController)->hacer_pedido($req->index,null,floatval($req->cantidad),"upd");
    }

    
    public function setDescuentoTotal(Request $req)
    {
        try {
            (new PedidosController)->checkPedidoAuth($req->index);
            
            $item = items_pedidos::where("id_pedido",$req->index)->update(["descuento"=>floatval($req->descuento)]);
            return Response::json(["msj"=>"¡Éxito!","estado"=>true]);
            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }


    }


    
}
