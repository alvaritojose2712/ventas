<?php

namespace App\Http\Controllers;

use App\Models\items_pedidos;
use Illuminate\Http\Request;

class ItemsPedidosController extends Controller
{
    

   
    public function delItemPedido(Request $req)
    {   
        return (new InventarioController)->hacer_pedido($req->index,null,99,"del");
    }
    public function setDescuentoUnitario(Request $req)
    {
        $item = items_pedidos::find($req->index);

        $item->descuento = floatval($req->descuento);

        $item->save();
    }

    public function setCantidad(Request $req)
    {
        return (new InventarioController)->hacer_pedido($req->index,null,floatval($req->cantidad),"upd");
    }

    
    public function setDescuentoTotal(Request $req)
    {
        $item = items_pedidos::where("id_pedido",$req->index)->update(["descuento"=>floatval($req->descuento)]);

    }


    
}
