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
use App\Models\proveedores;
use App\Models\lotes;
use App\Models\sucursal;
use App\Models\categorias;

            


use Illuminate\Http\Request;
use Response;

class InventarioController extends Controller
{
    public function hacer_pedido($id,$id_pedido,$cantidad,$type,$lote=null)
    {   
        try {
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
                if ($lote) {
                    $checkIfExits = items_pedidos::where("id_producto",$id)
                    ->where("id_pedido",$id_pedido)
                    ->where("lote",$lote)
                    ->first();
                    
                }else{
                    $checkIfExits = items_pedidos::where("id_producto",$id)->where("id_pedido",$id_pedido)->first();

                }
                

                (new PedidosController)->checkPedidoAuth($id_pedido);

                
                if ($checkIfExits) {
                    $old_ct = $checkIfExits["cantidad"];

                    $setcantidad = $cantidad + $old_ct;
                    $setprecio = $setcantidad*$precio;
                }


                items_pedidos::updateOrCreate([
                    "id_producto"=>$id,
                    "id_pedido"=>$id_pedido,
                    "lote"=>$lote,
                ],[
                    "id_producto" => $id,
                    "id_pedido" => $id_pedido,
                    "cantidad" => $setcantidad,
                    "monto" => $setprecio,
                    "lote" => $lote,
                ]);
                if ($lote) {
                    $lote_obj = lotes::find($lote);
                    $ctSeter = (($lote_obj->cantidad + ($old_ct)) - $setcantidad);
                }else{
                    $ctSeter = (($producto->cantidad + ($old_ct)) - $setcantidad);

                }
                $this->descontarInventario($id,$ctSeter,$lote);
                

                $this->checkFalla($id,$ctSeter);
            }else if($type=="upd"){
                $checkIfExits = items_pedidos::find($id);
                (new PedidosController)->checkPedidoAuth($id,"item");


                $producto = inventario::find($checkIfExits->id_producto);
                $precio = $producto->precio;

                $old_ct = $checkIfExits->cantidad;
                $lote = $checkIfExits->lote;

                $setprecio = $cantidad*$precio;

                items_pedidos::updateOrCreate(["id"=>$id],[
                    "cantidad" => $cantidad,
                    "monto" => $setprecio
                ]);
                if ($lote) {
                    $lote_obj = lotes::find($lote);
                    
                    $ctSeter = (($lote_obj->cantidad + ($old_ct)) - $cantidad);
                }else{
                    $ctSeter = (($producto->cantidad + ($old_ct)) - $cantidad);

                }
                $this->descontarInventario($checkIfExits->id_producto,$ctSeter,$lote);


                $this->checkFalla($checkIfExits->id_producto,$ctSeter);
            }else if($type=="del"){
                (new PedidosController)->checkPedidoAuth($id,"item");
                
                    $item = items_pedidos::find($id);
                    $old_ct = $item->cantidad;
                    $id_producto = $item->id_producto;
                    $lote = $item->lote;
                
                    $producto = inventario::find($id_producto);
                    
                if($item->delete()){
                    if ($lote) {
                        $lote_obj = lotes::find($lote);
                        $ctSeter = $lote_obj->cantidad + ($old_ct);
                    }else{
                        $ctSeter = $producto->cantidad + ($old_ct);
                    }
                    
                    $this->descontarInventario($id_producto,$ctSeter,$lote);

                    $this->checkFalla($id_producto,$ctSeter);
                    // return Response::json(["msj"=>"Item Eliminado","estado"=>true]);

                }
            }
            
        } catch (\Exception $e) {

            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }

    }
    public function descontarInventario($id_producto,$cantidad,$lote)
    {

        if ($lote) {
            $lote = lotes::find($lote);
            $lote->cantidad = $cantidad;
            $lote->save();
        }else{
            $inv = inventario::find($id_producto);
            $inv->cantidad = $cantidad;
            $inv->save();

        }
    }
    public function getProductosSerial(Request $req)
    {
        try {
            $ids = $req->ids_productos;
            $count = $req->count;
            $uniques = array_unique($ids);

            if (count($uniques)!==count($ids)) {
                throw new \Exception("¡Productos duplicados!", 1);
            }
            if ($count!=count($uniques)) {
                throw new \Exception("¡Faltan/Sobran productos! ".$count." | ".count($uniques), 1);
            } 
            $where = inventario::whereIn("id",$ids)->get();
            if ($where->count()!=count($uniques)) {
                throw new \Exception("¡Algunos productos no están registrados!", 1);
            }
            return Response::json(["msj"=>$where,"estado"=>true]);   
            
        } catch (\Exception $e) {

            return Response::json(["msj"=>"Error. ".$e->getMessage(),"estado"=>false]);
            
        }
    }
    public function checkPedidosCentral(Request $req)
    {   
        $pedido = $req->pedido;
        try {
            //Check Items
            foreach ($pedido["items"] as $i => $item) {
                if (!isset($item["aprobado"])) {
                    throw new \Exception("¡Falta verificar productos!", 1);
                }

                if (isset($item["ct_real"])) {
                    if ($item["ct_real"]<=0 OR $item["ct_real"]==$item["cantidad"]) {
                        throw new \Exception("¡Error con cantidad verificada ".$item["ct_real"]."!", 1);
                    }
                }
            }
            //Check Proveedor
            $proveedor_name = "21628222-8";
            $proveedor = proveedores::where("rif",$proveedor_name)->first();


            if ($proveedor) {
                $id = $pedido["id"];
                $factInpid_proveedor = $proveedor->id;
                $factInpnumfact = $pedido["id"];
                $factInpdescripcion = "De centro de acopio ".$pedido["created_at"];
                $factInpmonto = $pedido["venta"];
                $factInpfechavencimiento = $pedido["created_at"];
                $factInpestatus = 1;


                $checkIfExitsFact = factura::find($id);
                if (!$checkIfExitsFact) {
                    $fact = new factura;
                    $fact->id = $id;
                    $fact->id_proveedor = $factInpid_proveedor;
                    $fact->numfact = $factInpnumfact;
                    $fact->descripcion = $factInpdescripcion;
                    $fact->monto = $factInpmonto;
                    $fact->fechavencimiento = $factInpfechavencimiento;
                    $fact->estatus = $factInpestatus;

                    if ($fact->save()) {
                        $num = 0;
                        foreach ($pedido["items"] as $i => $item) {
                            $id_pro = $item["producto"]["id"];
                            $ctNew = $item["cantidad"];

                            $precio_base = $item["producto"]["precio_base"];
                            $precio = $item["producto"]["precio"];

                            $codigo_proveedor = $item["producto"]["codigo_proveedor"];
                            $codigo_barras = $item["producto"]["codigo_barras"];
                            $descripcion = $item["producto"]["descripcion"];


                            if (isset($item["ct_real"])) {
                                $ctNew = $item["ct_real"];
                            }

                            
                            $insertOrUpdateInv = inventario::find($id_pro);
                            
                            $insertOrUpdateInv->cantidad = $insertOrUpdateInv->cantidad + $ctNew;
                            $insertOrUpdateInv->precio_base = $precio_base;
                            $insertOrUpdateInv->precio = $precio;
                            
                            $insertOrUpdateInv->codigo_proveedor = $codigo_proveedor;
                            $insertOrUpdateInv->codigo_barras = $codigo_barras;
                            $insertOrUpdateInv->descripcion = $descripcion;

                            
                            if ($insertOrUpdateInv->save()) {
                                $this->checkFalla($id_pro,$ctNew);
                                items_factura::updateOrCreate([
                                    "id_factura" => $id,
                                    "id_producto" => $id_pro,
                                ],[
                                    "cantidad" => $ctNew,
                                    "tipo" => "Actualización",
                                ]);
                                $num++;
                            }
                        }
                        (new sendCentral)->setFacturasCentral();
                        return Response::json(["msj"=>"¡Éxito.".$num." productos procesados!","estado"=>true]);
                    }
                }else{
                    throw new \Exception("¡Factura ya existe!", 1);

                }
            }else{
                throw new \Exception("¡No existe proveedor ".$proveedor_name."!", 1);

            }
            

            
        } catch (\Exception $e) {
            
            return Response::json(["msj"=>"Error. ".$e->getMessage(),"estado"=>false]);
        }
    }

    public function index(Request $req)
    {
        $exacto = false;

        if (isset($req->exacto)) {
            if ($req->exacto=="si") {
                $exacto = "si";
            }
            if ($req->exacto=="id_only") {
                $exacto = "id_only";
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
            $data = inventario::with([
                "proveedor",
                "categoria",
                "marca",
                "deposito",
                "lotes"=>function($q){
                    $q->orderBy("vence","asc");
                },
            ])->where(function($e) use($itemCero){
                if (!$itemCero) {
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
                "lotes"=>function($q){
                    $q->orderBy("vence","asc");
                },
            ])
            ->where(function($e) use($itemCero){
                if (!$itemCero) {
                    $e->where("cantidad",">",0);
                    // code...
                }

            })
            ->where(function($e) use($itemCero,$q,$exacto){

                if ($exacto=="si") {
                    $e->orWhere("codigo_barras","LIKE","$q")
                    ->orWhere("codigo_proveedor","LIKE","$q");
                }elseif($exacto=="id_only"){

                    $e->where("id","$q");
                }else{
                    $e->orWhere("descripcion","LIKE","%$q%")
                    ->orWhere("codigo_proveedor","LIKE","%$q%")
                    ->orWhere("codigo_barras","LIKE","%$q%");

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
            $q->lotes_ct = $q->lotes->sum("cantidad");
            return $q;
        });
        return $data;
        
    }
    public function setCarrito(Request $req)
    {
        $type = $req->type;
        $cantidad = $req->cantidad;
        $numero_factura = $req->numero_factura;
        $loteIdCarrito = $req->loteIdCarrito;
        
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


                $this->hacer_pedido($id_producto,$nuevo_pedido_num,$cantidad,"ins",$loteIdCarrito);
              return Response::json(["msj"=>"Agregado nuevo pedido #".$nuevo_pedido_num." || ".$producto["descripcion"]." || Cant. ".$cantidad,"estado"=>"ok","num_pedido"=>$nuevo_pedido_num,"type"=>$type]);
                

            }else{

                
                $this->hacer_pedido($id_producto,$id,$cantidad,"ins",$loteIdCarrito);

                return Response::json(["msj"=>"Agregado al pedido #".$id." || ".$producto["descripcion"]." || Cant. ".$cantidad,"estado"=>"ok","num_pedido"=>$id,"type"=>$type]);


            }
        }
        
    }
    public function delProductoFun($id)
    {
        try {
            inventario::find($id)->delete();
            return true;   
        } catch (\Exception $e) {
            throw new \Exception("Error al eliminar. ".$e->getMessage(), 1);
            
        }
    }
    public function delProducto(Request $req)
    {
        $id = $req->id;
        try {
            $this->delProductoFun($id);
            return Response::json(["msj"=>"Éxito al eliminar","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>$e->getMessage(),"estado"=>false]);
            
        }  
    }
    public function guardarNuevoProductoLote(Request $req)
    {
      try {
          foreach ($req->lotes as $key => $ee) {
            if (isset($ee["type"])) {
                if ($ee["type"]==="update"||$ee["type"]==="new") {

                    $this->guardarProducto(
                        $req->id_factura,
                        $ee["cantidad"],
                        $ee["id"],
                        $ee["codigo_barras"],
                        $ee["codigo_proveedor"],
                        $ee["unidad"],
                        $ee["id_categoria"],
                        $ee["descripcion"],
                        $ee["precio_base"],
                        $ee["precio"],
                        $ee["iva"],
                        $ee["id_proveedor"],
                        $ee["id_marca"],
                        /*$req->inpInvid_deposito*/"",
                        0,
                        /*$req->inpInvLotes*/[]);
                }else if ($ee["type"]==="delete") {
                    $this->delProductoFun($ee["id"]);
                }
            }   
          }
                return Response::json(["msj"=>"Éxito","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }  
    }
    public function guardarNuevoProducto(Request $req)
    {   
        try {
            $this->guardarProducto(
                $req->id_factura,
                $req->inpInvcantidad,
                $req->id,
                $req->inpInvbarras,
                $req->inpInvalterno,
                $req->inpInvunidad,
                $req->inpInvcategoria,
                $req->inpInvdescripcion,
                $req->inpInvbase,
                $req->inpInvventa,
                $req->inpInviva,
                $req->inpInvid_proveedor,
                $req->inpInvid_marca,
                $req->inpInvid_deposito,
                $req->inpInvporcentaje_ganancia,
                $req->inpInvLotes);
                return Response::json(["msj"=>"Éxito","estado"=>true]);   
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }



         
    }

    public function guardarProducto(
        $req_id_factura,
        $req_inpInvcantidad,
        $req_id,
        $req_inpInvbarras,
        $req_inpInvalterno,
        $req_inpInvunidad,
        $req_inpInvcategoria,
        $req_inpInvdescripcion,
        $req_inpInvbase,
        $req_inpInvventa,
        $req_inpInviva,
        $req_inpInvid_proveedor,
        $req_inpInvid_marca,
        $req_inpInvid_deposito,
        $req_inpInvporcentaje_ganancia,
        $req_inpInvLotes
    ){
        $id_factura = $req_id_factura;

        $ctInsert = $req_inpInvcantidad;

         try {
            
            $beforecantidad = 0;
            $ctNew = 0;
            $tipo = "";
            if (!$req_id) {
                $ctNew = $ctInsert;
                $tipo = "Nuevo";
            }else{
                $before = inventario::find($req_id);

                if ($before) {
                    $beforecantidad = $before->cantidad;
                    $ctNew = $ctInsert - $beforecantidad;
                    $tipo = "Actualización";
                }
            }
            
            $insertOrUpdateInv = inventario::updateOrCreate([
                "id" => $req_id
            ],[
                "codigo_barras" => $req_inpInvbarras,
                "cantidad" => $ctInsert,
                "codigo_proveedor" => $req_inpInvalterno,
                "unidad" => $req_inpInvunidad,
                "id_categoria" => $req_inpInvcategoria,
                "descripcion" => $req_inpInvdescripcion,
                "precio_base" => $req_inpInvbase,
                "precio" => $req_inpInvventa,
                "iva" => $req_inpInviva,
                "id_proveedor" => $req_inpInvid_proveedor,
                "id_marca" => $req_inpInvid_marca,
                "id_deposito" => $req_inpInvid_deposito,
                "porcentaje_ganancia" => $req_inpInvporcentaje_ganancia
            ]);

            foreach ($req_inpInvLotes as $ee) {
                if (isset($ee["type"])&&($ee["type"]==="update"||$ee["type"]==="new")) {
                    
                    if (isset($ee["id"])) {
                        lotes::updateOrCreate([
                            "id" => $ee["id"],
                        ],[
                            "cantidad" => $ee["cantidad"],
                            "lote" => $ee["lote"],
                            "creacion" => $ee["creacion"],
                            "vence" => $ee["vence"]
                        ]);
                    }else{
                        lotes::create([
                            "id_producto" => $req_id,
                            "cantidad" => $ee["cantidad"],
                            "lote" => $ee["lote"],
                            "creacion" => $ee["creacion"],
                            "vence" => $ee["vence"]
                        ]);
                    }
                }else if (isset($ee["type"])&&$ee["type"]==="delete") {
                    lotes::find($ee["id"])->delete();

                }
            
            }

            $this->checkFalla($req_id,$ctInsert);
            $this->insertItemFact($id_factura,$insertOrUpdateInv,$ctInsert,$beforecantidad,$ctNew,$tipo);
            

            return true;   
        } catch (\Exception $e) {
            throw new \Exception("Error: ".$e->getMessage(), 1);
        }
    }
    public function insertItemFact($id_factura,$insertOrUpdateInv,$ctInsert,$beforecantidad,$ctNew,$tipo)
    {
        $find_factura = factura::find($id_factura);

        if($insertOrUpdateInv && $find_factura){

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

    public function reporteInventario(Request $req)
    {
        $costo = 0;
        $venta = 0;

        $descripcion = $req->descripcion;
        $precio_base = $req->precio_base;
        $precio = $req->precio;
        $cantidad = $req->cantidad;
        $proveedor = $req->proveedor;
        $categoria = $req->categoria;
        $marca = $req->marca;

        $codigo_proveedor = $req->codigo_proveedor;
        $codigo_barras = $req->codigo_barras;

        $data= inventario::with("lotes","proveedor","categoria")->where(function($q) use ($codigo_proveedor,$codigo_barras,$descripcion,$precio_base,$precio,$cantidad,$proveedor,$categoria,$marca)
        {

            if($descripcion){$q->where("descripcion","LIKE",$descripcion."%");}
            if($codigo_proveedor){$q->where("codigo_proveedor","LIKE",$codigo_proveedor."%");}
            if($codigo_barras){$q->where("codigo_barras","LIKE",$codigo_barras."%");}

            if($precio_base){$q->where("precio_base",$precio_base);}
            if($precio){$q->where("precio",$precio);}
            if($cantidad){$q->where("cantidad",$cantidad);}
            if($proveedor){$q->where("id_proveedor",$proveedor);}
            if($categoria){$q->where("id_categoria",$categoria);}
            if($marca){$q->where("id_marca",$marca);}
        })->get()
        ->map(function($q) use (&$costo,&$venta)
        {
            if (count($q->lotes)) {
                $q->cantidad = $q->lotes->sum("cantidad"); 
            }
            $c = $q->cantidad*$q->precio_base;
            $v = $q->cantidad*$q->precio;

            $q->t_costo = number_format($c,"2"); 
            $q->t_venta = number_format($v,"2");
            
            $costo += $c;
            $venta += $v;

            return  $q;
        });
        $sucursal = sucursal::all()->first();
        $proveedores = proveedores::all();
        $categorias = categorias::all();
        
        
        return view("reportes.inventario",[
            "data"=>$data,
            "sucursal"=>$sucursal,
            "categorias"=>$categorias,
            "proveedores"=>$proveedores,

            "descripcion"=>$descripcion,
            "precio_base"=>$precio_base,
            "precio"=>$precio,
            "cantidad"=>$cantidad,
            "proveedor"=>$proveedor,
            "categoria"=>$categoria,
            "marca"=>$marca,

            "count" => count($data),
            "costo" => number_format($costo,"2"),
            "venta" => number_format($venta,"2"),

            "view_codigo_proveedor" => $req->view_codigo_proveedor==="off"?false:true,
            "view_codigo_barras" => $req->view_codigo_barras==="off"?false:true,
            "view_descripcion" => $req->view_descripcion==="off"?false:true,
            "view_proveedor" => $req->view_proveedor==="off"?false:true,
            "view_categoria" => $req->view_categoria==="off"?false:true,
            "view_id_marca" => $req->view_id_marca==="off"?false:true,
            "view_cantidad" => $req->view_cantidad==="off"?false:true,
            "view_precio_base" => $req->view_precio_base==="off"?false:true,
            "view_t_costo" => $req->view_t_costo==="off"?false:true,
            "view_precio" => $req->view_precio==="off"?false:true,
            "view_t_venta" => $req->view_t_venta==="off"?false:true,
           

        ]);
    }
            
}
