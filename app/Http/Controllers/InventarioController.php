<?php

namespace App\Http\Controllers;

use App\Models\pedidos;
use App\Models\inventario;
use App\Models\items_pedidos;
use App\Models\moneda;
use App\Models\pago_pedidos;
use App\Models\factura;
use App\Models\items_factura;
use App\Models\fallas;

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
        if ($type=="ins") {
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

            $ctSeter = (($producto->cantidad + ($old_ct)) - $setcantidad);
            $producto->cantidad = $ctSeter;
            $producto->save();

            $this->checkFalla($id,$ctSeter);
        }else if($type=="upd"){
            $checkIfExits = items_pedidos::find($id);

            $producto = inventario::find($checkIfExits->id_producto);
            $precio = $producto->precio;

            $old_ct = $checkIfExits->cantidad;

            $setprecio = $cantidad*$precio;

            items_pedidos::updateOrCreate(["id"=>$id],[
                "cantidad" => $cantidad,
                "monto" => $setprecio
            ]);
            $ctSeter = (($producto->cantidad + ($old_ct)) - $cantidad);
            $producto->cantidad = $ctSeter;
            $producto->save();

            $this->checkFalla($checkIfExits->id_producto,$ctSeter);
        }else if($type=="del"){
            $item = items_pedidos::find($id);
                $old_ct = $item->cantidad;
                $id_producto = $item->id_producto;
            
            $producto = inventario::find($id_producto);

            if($item->delete()){
                $ctSeter = $producto->cantidad + ($old_ct);
                $producto->cantidad = $ctSeter;
                $producto->save();

                $this->checkFalla($id_producto,$ctSeter);
                // return Response::json(["msj"=>"Item Eliminado","estado"=>true]);

            }
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

            $this->checkFalla($req->id,$ctInsert);

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

    public function getFallas(Request $req)
    {


        $qFallas = $req->qFallas;
        $orderCatFallas = $req->orderCatFallas;
        $orderSubCatFallas = $req->orderSubCatFallas;
        $ascdescFallas = $req->ascdescFallas;
       
        // $query_frecuencia = items_pedidos::with("producto")->select(['id_producto'])
        //     ->selectRaw('COUNT(id_producto) as en_pedidos, SUM(cantidad) as cantidad')
        //     ->groupBy(['id_producto']);

        // if ($orderSubCatFallas=="todos") {
        //     // $query_frecuencia->having('cantidad', '>', )
        // }else if ($orderSubCatFallas=="alta") {
        //     $query_frecuencia->having('cantidad', '>', )
        // }else if ($orderSubCatFallas=="media") {
        //     $query_frecuencia->having('cantidad', '>', )
        // }else if ($orderSubCatFallas=="baja") {
        //     $query_frecuencia->having('cantidad', '>', )
        // }

        // return $query_frecuencia->get();
        if ($orderCatFallas=="categoria") {
            
            return fallas::with(["producto"=>function($q){
                $q->with(["proveedor","categoria"]);
            }])->get()->groupBy("producto.categoria.descripcion");

        }else if ($orderCatFallas=="proveedor") {
            return fallas::with(["producto"=>function($q){
                $q->with(["proveedor","categoria"]);
            }])->get()->groupBy("producto.proveedor.descripcion");

        }

            
            
        
        

    }
    public function setFalla(Request $req)
    {   
        try {
            fallas::updateOrCreate(["id_producto"=>$req->id_producto],["id_producto"=>$req->id_producto]);
            
            return Response::json(["msj"=>"Falla enviada con Éxito","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        } 
    }
    public function delFalla(Request $req)
    {   
        try {
            fallas::find($req->id)->delete();
            
            return Response::json(["msj"=>"Falla Eliminada","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        } 
    }
    public function checkFalla($id,$ct)
    {   
        if ($ct>1) {
            $f = fallas::where("id_producto",$id);
            if ($f) {
                $f->delete();
            }
        }else if($ct<=1){

            fallas::updateOrCreate(["id_producto"=>$id],["id_producto"=>$id]);
        }

    }
            
}
