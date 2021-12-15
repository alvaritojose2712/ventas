<?php

namespace App\Http\Controllers;

use App\Models\pedidos;
use App\Models\inventario;
use App\Models\items_pedidos;
use App\Models\moneda;
use App\Models\pago_pedidos;
use App\Models\factura;
use App\Models\items_factura;

use Illuminate\Http\Request;
use Response;

class InventarioController extends Controller
{
    public function hacer_pedido($id,$id_pedido,$cantidad,$type)
    {
        if ($cantidad<0) {
            exit;
        }
        $cantidad = $cantidad==""?1:$cantidad;
        $old_ct = 0;
        
        

        // $old_cant_query = items_pedidos::where("id_producto",$id)->where("id_pedido",$id_pedido)->first();
        // $old_cant = $old_cant_query["cantidad"];

        switch ($type) {
            case 'ins':

                $producto = inventario::find($id);
                $precio = $producto->precio;
                
                $setcantidad = $cantidad;
                $setprecio = $precio;
                
                $checkIfExits = items_pedidos::where("id_producto",$id)->where("id_pedido",$id_pedido);
                
                if ($checkIfExits) {
                    $old_ct = $checkIfExits->first()["cantidad"];

                    $setcantidad = $cantidad + $old_ct;
                    $setprecio = $setcantidad*$precio;
                }


                items_pedidos::updateOrCreate(["id_producto"=>$id,"id_pedido"=>$id_pedido],[
                    "id_producto" => $id,
                    "id_pedido" => $id_pedido,
                    "cantidad" => $setcantidad,
                    "monto" => $setprecio
                ]);

                // $producto = inventario::find($id_producto);
                $producto->cantidad = (($producto->cantidad + ($old_ct)) - $setcantidad);
                $producto->save();
            break;
            
            case "upd":
                $checkIfExits = items_pedidos::find($id);

                $producto = inventario::find($checkIfExits->id_producto);
                $precio = $producto->precio;

                $old_ct = $checkIfExits->cantidad;

                $setprecio = $cantidad*$precio;

                items_pedidos::updateOrCreate(["id"=>$id],[
                    "cantidad" => $cantidad,
                    "monto" => $setprecio
                ]);

                $producto->cantidad = (($producto->cantidad + ($old_ct)) - $cantidad);
                $producto->save();
            break;

            case 'del':
                
                $item = items_pedidos::find($id);
                $old_ct = $item->cantidad;
                $id_producto = $item->id_producto;
                $producto = inventario::find($id_producto);

                if($item->delete()){
                    // $producto = inventario::find($id_producto);
                    $producto->cantidad = $producto->cantidad + ($old_ct);
                    $producto->save();
                    // return Response::json(["msj"=>"Item Eliminado","estado"=>true]);

                }
            break;

            
        }

    }
    public function index(Request $req)
    {
        $exacto = false;

        if (isset($req->exacto)) {
            if ($req->exacto=="si") {
                $exacto = true;
            }
        }
        $cop = moneda::where("tipo",2)->orderBy("id","desc")->first();
        $bs = moneda::where("tipo",1)->orderBy("id","desc")->first();


        $data = [];

        $q = $req->qProductosMain;
        $num = $req->num;
        $itemCero = $req->itemCero;

        $orderColumn = $req->orderColumn;
        $orderBy = $req->orderBy;

        if ($q=="") {
            $data = inventario::where(function($e) use($itemCero){
                if ($itemCero=="false") {
                    $e->where("cantidad",">",0);
                    // code...
                }

            })
            ->limit(20)
            ->orderBy($orderColumn,$orderBy)
            ->get();
        }else{
            $data = inventario::with([
                "proveedor",
                "categoria",
                "marca",
                "deposito",
            ])
            ->where(function($e) use($itemCero){
                if ($itemCero=="false") {
                    $e->where("cantidad",">",0);
                    // code...
                }

            })
            ->where(function($e) use($itemCero,$q,$exacto){

                if ($exacto) {
                    $e->orWhere("descripcion","$q")
                    ->orWhere("codigo_proveedor","$q");
                }else{
                    $e->orWhere("descripcion","LIKE","%$q%")
                    ->orWhere("codigo_proveedor","LIKE","$q%");

                }

            })
            ->limit($num)
            ->orderBy($orderColumn,$orderBy)
            ->get();
        }
        $data->map(function($q) use ($bs,$cop)
        {
            $q->bs = number_format($q->precio*$bs["valor"],2,".",",");
            $q->cop = number_format($q->precio*$cop["valor"],2,".",",");
            return $q;
        });
        return $data;
        
    }
    public function setCarrito(Request $req)
    {
        $type = $req->type;
        $cantidad = $req->cantidad;
        $numero_factura = $req->numero_factura;



        if (isset($numero_factura)) {
            $id = $numero_factura;
            $id_producto = $req->id;
            $cantidad = $cantidad==""?1:$cantidad;

            $usuario = "";

            if (session()->has("id_usuario")) {
                $usuario = session("id_usuario");
            }else{

                $usuario = $req->usuario;
            }

          $producto = inventario::find($id_producto);

            
            if ($id=="nuevo") {

              //Crea Pedido

                $new_pedido = new pedidos;

                $new_pedido->estado = 0;
                $new_pedido->id_cliente = 1;
                $new_pedido->id_vendedor = $usuario;
                $new_pedido->save();

              //Next pedido num
                $nuevo_pedido_num = $new_pedido->id;

                pago_pedidos::insert([
                    ["tipo"=>1,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                    ["tipo"=>2,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                    ["tipo"=>3,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                    ["tipo"=>4,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                    ["tipo"=>5,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                    ["tipo"=>6,"monto"=>0,"id_pedido"=>$nuevo_pedido_num],
                ]);

                // 1 Transferencia
               // 2 Debito 
               // 3 Efectivo 
               // 4 Credito  
               // 5 Otros
               // 6 vuelto


                $this->hacer_pedido($id_producto,$nuevo_pedido_num,$cantidad,"ins");
              return Response::json(["msj"=>"Agregado nuevo pedido #".$nuevo_pedido_num." || ".$producto["descripcion"]." || Cant. ".$cantidad,"estado"=>"ok","num_pedido"=>$nuevo_pedido_num,"type"=>$type]);
                

            }else{

                
                $this->hacer_pedido($id_producto,$id,$cantidad,"ins");

                return Response::json(["msj"=>"Agregado al pedido #".$id." || ".$producto["descripcion"]." || Cant. ".$cantidad,"estado"=>"ok","num_pedido"=>$id,"type"=>$type]);


            }
        }
        
    }
    
    public function delProducto(Request $req)
    {
        $id = $req->id;
        try {
            inventario::find($id)->delete();
            return Response::json(["msj"=>"Éxito al eliminar","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error al eliminar. ".$e->getMessage(),"estado"=>false]);
            
        }  
    }
    public function guardarNuevoProducto(Request $req)
    {   

        $id_factura = $req->id_factura;
        $find_factura = factura::find($id_factura);

        $ctInsert = $req->inpInvcantidad;

        if (!$find_factura) {
           return Response::json(["msj"=>"Error: No hay factura seleccionada","estado"=>false]);
        }
         try {
            
            $tipo = "";
            if (!$req->id) {
                $ctNew = $ctInsert;
                $tipo = "Nuevo";
            }else{
                $before = inventario::find($req->id);

                if ($before) {
                    $beforecantidad = $before->cantidad;
                    $ctNew = $ctInsert - $beforecantidad;
                    $tipo = "Actualización";
                }
            }

            $insertOrUpdateInv = inventario::updateOrCreate([
                "id" => $req->id
            ],[
                "codigo_barras" => $req->inpInvbarras,
                "cantidad" => $ctInsert,
                "codigo_proveedor" => $req->inpInvalterno,
                "unidad" => $req->inpInvunidad,
                "id_categoria" => $req->inpInvcategoria,
                "descripcion" => $req->inpInvdescripcion,
                "precio_base" => $req->inpInvbase,
                "precio" => $req->inpInvventa,
                "iva" => $req->inpInviva,
                "id_proveedor" => $req->inpInvid_proveedor,
                "id_marca" => $req->inpInvid_marca,
                "id_deposito" => $req->inpInvid_deposito,
                "porcentaje_ganancia" => $req->inpInvporcentaje_ganancia
            ]);

            if($insertOrUpdateInv){

                $id_pro = $insertOrUpdateInv->id;
                $check_fact = items_factura::where("id_factura",$id_factura)->where("id_producto",$id_pro)->first();

                if ($check_fact) {
                    $ctNew = $ctInsert - ($beforecantidad - $check_fact->cantidad);
                }

                if ($ctNew==0) {
                    items_factura::where("id_factura",$id_factura)->where("id_producto",$id_pro)->delete();
                }else{
                    items_factura::updateOrCreate([
                        "id_factura" => $id_factura,
                        "id_producto" => $id_pro,
                    ],[
                        "cantidad" => $ctNew,
                        "tipo" => $tipo,

                    ]);

                }

            }

            return Response::json(["msj"=>"Éxito","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        } 

        
    }
            
}
