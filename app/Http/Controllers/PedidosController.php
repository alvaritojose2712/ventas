<?php

namespace App\Http\Controllers;

use App\Models\cierres;
use App\Models\pedidos;
use App\Models\moneda;
use App\Models\inventario;
use App\Models\items_pedidos;
use App\Models\pago_pedidos;
use App\Models\clientes;

use App\Models\movimientos_caja;
use App\Models\sucursal;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Mail\enviarCierre;

use Response;

class PedidosController extends Controller
{  
    public function getPedidosFast(Request $req)
    {
        $fecha = $req->fecha1pedido;

        return pedidos::whereBetween("created_at",["$fecha 00:00:01","$fecha 23:59:59"])->limit(7)->orderBy("id","desc")->get();
    }
    public function get_moneda()
    {
        $cop = moneda::where("tipo",2)->orderBy("id","desc")->first()["valor"];
        $bs = moneda::where("tipo",1)->orderBy("id","desc")->first()["valor"];
        return ["cop"=>$cop, "bs"=>$bs];
    }
    public function today()
    {
        return date("Y-m-d");
    } 
    public function sumpedidos(Request $req)
    {
        $ped = pedidos::with(["cliente","pagos","items"=>function($q)
        {

            $q->with("producto");
            $q->orderBy("id","desc");

        }])->whereIn("id",explode(",", $req->id))
        ->get();

        $items = [];

        $cliente = [];

        $subtotal = 0;
        $total_porciento = 0;
        $total_des = 0;
        $total = 0;
        foreach ($ped as $key => $val) {
            if ($key==0) {
                $cliente = $val->cliente;
            }
            foreach ($val["items"] as $item) {
                if (!$item->id_producto) {
                    return "No puede seleccioar un pago: #".$item->id_pedido;

                }
                $ct = 0;
                if (isset($items[$item->id_producto])) {
                    $ct = $items[$item->id_producto]->ct+$item->cantidad;
                }else{
                    $ct = $item->cantidad;
                }
                $item->ct = $ct;
                $items[$item->id_producto] = $item;

                $des = ($item->descuento/100)*$item->monto;
                $total += $item->monto-$des;
                $subtotal+=$item->monto;
                $total_porciento+=$item->descuento;
                $item->total_des = round($des,2);
                $total_des += $des;
            }
        }



        // return $items;

        return view("reportes.sumpedidos",[
            "pedido"=>$items,
            "cliente"=>$cliente,

            "created_at"=> $this->today(),
            "id"=>time(),

            "subtotal"=> round($subtotal,2),
            "total_porciento"=> $total_porciento,
            "total_des"=> round($total_des,2),
            "total"=> round($total,2)
        ]);

    }
    public function getVentas(Request $req)
    {
        $fechaventas = $req->fechaventas;

        return $this->cerrarFun($fechaventas,0,0);
    }
    public function getPedidos(Request $req)
    {   
        $fact = [];
        $prod = [];


        $tipobusquedapedido = $req->tipobusquedapedido;
        $busquedaPedido = $req->busquedaPedido;
        $fecha1pedido = $req->fecha1pedido;
        $fecha2pedido = $req->fecha2pedido;

        $filterMetodoPagoToggle = $req->filterMetodoPagoToggle;



        $tipoestadopedido = $req->tipoestadopedido;

        $subtotal = 0;
        $desctotal = 0;
        $totaltotal = 0;
        $porctotal = 0;
        $itemstotal = 0;

        $totalventas = 0;

        $limit = 1000;
        if ($fecha1pedido=="" AND $fecha2pedido=="") {
            $fecha1pedido = "0000-00-00";
            $fecha2pedido = "9999-12-31";
            $limit = 25;
        }else if($fecha1pedido == ""){
            $fecha1pedido = "0000-00-00";
            $limit = 25;
        }else if($fecha2pedido == ""){
            $fecha2pedido = "9999-12-31";
            $limit = 25;
        }

        if ($tipobusquedapedido=="prod") {
            $prod = inventario::with([
                "proveedor",
                "categoria",
                "marca",
                "deposito",
            ])
            ->where(function($q) use ($busquedaPedido)
            {
                $q->orWhere("descripcion","LIKE","%$busquedaPedido%")
                ->orWhere("codigo_proveedor","LIKE","%$busquedaPedido%");
                
            })
            ->whereIn("id",function($q) use ($fecha1pedido,$fecha2pedido,$tipoestadopedido){
                $q->from("items_pedidos")
                ->whereIn("id_pedido",function($q) use ($fecha1pedido,$fecha2pedido,$tipoestadopedido){
                    $q->from("pedidos")
                    ->whereBetween("created_at",["$fecha1pedido 00:00:01","$fecha2pedido 23:59:59"])
                    ->where(function($q) use ( $tipoestadopedido){

                        if (!$tipoestadopedido) {
                            $q->where("estado",false);
                        }
                        if($tipoestadopedido==1){
                            $q->where("estado",true);
                        }

                        if($tipoestadopedido=="todos"){

                            // $q->where("estado",true);
                        }
                    })
                    ->select("id");
                })
                ->select("id_producto");

            })
            ->get()
            ->map(function($q)use ($fecha1pedido,$fecha2pedido){
                $items = items_pedidos::whereBetween("created_at",["$fecha1pedido 00:00:01","$fecha2pedido 23:59:59"])->where("id_producto",$q->id);
                $q->cantidadtotal = $items->sum("cantidad");
                $q->items = $items->get();

                return $q;
            });


            // code...
        }else if ($tipobusquedapedido=="fact") {
            $fact = pedidos::where("id","LIKE","$busquedaPedido%")
            ->where(function($q) use ( $tipoestadopedido){

                if (!$tipoestadopedido) {
                    $q->where("estado",false);
                }
                if($tipoestadopedido==1){
                    $q->where("estado",true);
                }

                if($tipoestadopedido=="todos"){

                    // $q->where("estado",true);
                }
            })
            ->whereBetween("created_at",["$fecha1pedido 00:00:01","$fecha2pedido 23:59:59"])
            ->orderBy("created_at","desc")
            ->limit($limit)
            ->get()
            ->map(function($q) use (&$subtotal, &$desctotal, &$totaltotal,&$porctotal,&$itemstotal,&$totalventas,$filterMetodoPagoToggle){
                // global ;

                $fun = $this->getPedidoFun($q->id,$filterMetodoPagoToggle);
                $q->pedido = $fun;

                // $istrue = false; 
                if ($filterMetodoPagoToggle=="todos"||count($q->pagos->where("tipo",$filterMetodoPagoToggle)->where("monto","<>",0))) {
                    $totalventas++;
                    $itemstotal += count($fun->items);

                    $subtotal += $fun->clean_subtotal;
                    $desctotal += $fun->clean_total_des;
                    $totaltotal += $fun->clean_total;
                    $porctotal += $fun->clean_total_porciento;
                    return $q;
                }else{
                    
                }
            });  
        }else if($tipobusquedapedido=="cliente"){
            $fact = pedidos::whereIn("id_cliente",function($q) use ($busquedaPedido)
            {
                $q->from("clientes")->orWhere("nombre","LIKE","%$busquedaPedido%")->orWhere("identificacion","LIKE","%$busquedaPedido%")->select("id");

            })
            ->where(function($q) use ( $tipoestadopedido){

                if (!$tipoestadopedido) {
                    $q->where("estado",false);
                }
                if($tipoestadopedido==1){
                    $q->where("estado",true);
                }

                if($tipoestadopedido=="todos"){

                    // $q->where("estado",true);
                }
            })
            ->whereBetween("created_at",["$fecha1pedido 00:00:01","$fecha2pedido 23:59:59"])
            ->orderBy("created_at","desc")
            ->limit($limit)
            ->get()
            ->map(function($q) use (&$subtotal, &$desctotal, &$totaltotal,&$porctotal,&$itemstotal,&$totalventas,$filterMetodoPagoToggle){
                // global ;

                $fun = $this->getPedidoFun($q->id,$filterMetodoPagoToggle);
                $q->pedido = $fun;

                // $istrue = false; 
                if ($filterMetodoPagoToggle=="todos"||count($q->pagos->where("tipo",$filterMetodoPagoToggle)->where("monto","<>",0))) {
                    $totalventas++;
                    $itemstotal += count($fun->items);

                    $subtotal += $fun->clean_subtotal;
                    $desctotal += $fun->clean_total_des;
                    $totaltotal += $fun->clean_total;
                    $porctotal += $fun->clean_total_porciento;
                    return $q;
                }else{
                    
                }
            });
        }
        return [
            "fact"=>$fact, 
            "prod"=>$prod,
            "subtotal"=>number_format($subtotal,2,".",","), 
            "desctotal"=>$desctotal, 
            "totaltotal"=>number_format($totaltotal,2,".",","),
            "itemstotal"=>$itemstotal,
            "totalventas"=>$totalventas,
        ];
    }
    public function getPedidosUser()
    {
        if (session()->has("id_usuario")) {
            $vendedor = session("id_usuario");
            return pedidos::where("estado",0)->where("id_vendedor",$vendedor)->orderBy("id","desc")->get();
        }
    }
    public function pedidoAuth($id,$tipo="pedido")
    {
        if ($id===null) {
            $fecha_creada = $tipo;
            $estado = true;
        }else{

            if ($tipo=="pedido") {
                $pedido = pedidos::find($id);
            }else{
                $pedido = pedidos::find(items_pedidos::find($id)->id_pedido);
            }
            $fecha_creada = date("Y-m-d",strtotime($pedido->created_at));
           
            $estado = $pedido->estado;
            $last_cierre = cierres::orderBy("fecha","desc")->first();
        }

       //Si no se ha pagado
       //si la fecha de entrada no existe en los cierres
       //si la fecha del ultimo cierre es igual la fecha de entrada
    
       $today = $this->today();
       if (!$estado || !cierres::where("fecha",$fecha_creada)->get()->count() || $fecha_creada == $today) {
        return true;   
       }else{
        return false;   
       }
    }
    public function checkPedidoAuth($id,$tipo="pedido")
    {   
        if (!$this->pedidoAuth($id,$tipo)) {
            throw new \Exception("No se puede hacer movimientos en esta fecha. ¡Cierre Procesado!", 1);
        }

       
    }
    public function delpedido(Request $req)
    {


        try {
            $id = $req->id;
            $this->checkPedidoAuth($id);
            if ($id) {
               $items = items_pedidos::where("id_pedido",$id)->get();

                foreach ($items as $key => $value) {
                   (new InventarioController)->hacer_pedido($value->id,null,99,"del");
                }
                pedidos::find($id)->delete();
            }
            return Response::json(["msj"=>"Éxito al eliminar. Pedido #".$id,"estado"=>true]);
            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }
    }
    public function getPedidoFun($id_pedido,$filterMetodoPagoToggle="todos",$cop=1,$bs=1)
    {
        
        $pedido = pedidos::with(["vendedor","cliente","pagos"=>function($q) use ($filterMetodoPagoToggle) 
        {
            // if ($filterMetodoPagoToggle!="todos") {
            //     $q->where("tipo",$filterMetodoPagoToggle);
            // }
        },"items"=>function($q)
        {

            $q->with("producto");
            $q->orderBy("id","asc");

        }])->where("id",$id_pedido)->first();

        if ($pedido) {

            $total_des_ped = 0;
            $subtotal_ped = 0;
            $total_ped = 0;            

            $pedido->items->map(function($item) use (&$total_des_ped,&$subtotal_ped,&$total_ped)
            {

                if (!$item->producto) {
                    $subtotal = $item->monto*$item->cantidad;
                }else{
                    $subtotal = $item->producto["precio"]*$item->cantidad;

                }
                $total_des = ($item->descuento/100)*$subtotal;

                $total_des_ped += $total_des;
                $subtotal_ped += $subtotal;
                $total_ped += ($subtotal-$total_des);

                $item->total_des = number_format($total_des,2,".",",");
                $item->subtotal = number_format($subtotal,2,".",",");
                $item->total = number_format($subtotal-$total_des,2,".",",");



                return $item;
                
            });
            $pedido->total_des = number_format($total_des_ped,2,".",",");
            $pedido->subtotal = number_format($subtotal_ped,2,".",",");
            $pedido->total = number_format(round( $total_ped,3),2,".",",");
            $pedido->iva = round($total_ped,3)*.16;

            $pedido->clean_total_des = $total_des_ped;
            $pedido->clean_subtotal = $subtotal_ped;
            $pedido->clean_total = round($total_ped,3);

            
            $pedido->editable = $this->pedidoAuth($id_pedido);
            

            $timestamp = strtotime($pedido->created_at);
            $fecha_separada = date("Y-m-d", $timestamp);

            $pedido->vuelto_entregado = movimientos_caja::where("id_pedido",$pedido->id)->get();
             
            
            if ($subtotal_ped==0) {
                // code...
                $porcen = 0;
            }else{
                $porcen = ($total_des_ped*100)/$subtotal_ped;

            }

            $pedido->total_porciento = number_format($porcen,2,".",",");
            $pedido->clean_total_porciento = $porcen;


            $pedido->cop = number_format($total_ped*$cop,2,".",",");
            $pedido->bs = number_format($total_ped*$bs,2,".",",");


        }

        return $pedido;
    }
    public function getPedido(Request $req)
    {   
        $cop = $this->get_moneda()["cop"];
        $bs = $this->get_moneda()["bs"];

        if ($req->id=="ultimo") {
            $vendedor = session("id_usuario");

            $check = pedidos::where("estado",0)->where("id_vendedor",$vendedor)->orderBy("id","desc")->first();
            if (!$check) {
                $check = pedidos::where("estado",1)->where("id_vendedor",$vendedor)->orderBy("id","desc")->first();
            }
            
            if (!$check) {
                return [];
            }else{
                $id = $check->id; 
            }
        }else{
            $id = $req->id;
        }
        return $this->getPedidoFun($id,"todos",$cop,$bs);
    }
    
    public function notaentregapedido(Request $req)
    {
        $sucursal = sucursal::all()->first();

        return view("reportes.notaentrega",["sucursal"=>$sucursal,"pedido"=>$this->getPedido($req)]);
    }

    public function setpersonacarrito(Request $req)
    {
        try {
            $this->checkPedidoAuth($req->numero_factura);

            $pedido_select = pedidos::find($req->numero_factura);
            $pedido_select->id_cliente = $req->id_cliente;
            $pedido_select->save();
            return Response::json(["msj"=>"¡Éxito al agregar cliente!","estado"=>true]);

            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            
        }
    }

    public function entregadoPendi($fecha)
    {
        $entregado = movimientos_caja::where("created_at","LIKE",$fecha."%")->where("tipo",1);
        $entregado_sum = $entregado->sum("monto");

        $pendiente = movimientos_caja::where("created_at","LIKE",$fecha."%")->where("tipo",0);
        $pendiente_sum = $pendiente->sum("monto");

        return [
            "entregado"=>$entregado_sum,
            "pendiente"=>$pendiente_sum,
            "entre_pend_get"=> movimientos_caja::where("created_at","LIKE",$fecha."%")->get(),
        ];
    }
    public function ultimoCierre($fecha)
    {
        return cierres::where("fecha","<",$fecha)->orderBy("fecha","desc")->first();
    }

    public function getEntreGadoCajainicial($fecha)
    {
        return [
            "entregado" =>$this->entregadoPendi($fecha),
            "ultimo_cierre" =>$this->ultimoCierre($fecha)
        ];
    }
    public function cerrarFun($fecha,$total_caja_neto,$total_punto,$dejar=[])
    {   
        if (!$fecha) {
            return Response::json(["msj"=>"Error: Fecha inválida","estado"=>false]);

        }
        $entregado_fun = $this->entregadoPendi($fecha);
        $ultimo_cierre = $this->ultimoCierre($fecha);


        $cop = $this->get_moneda()["cop"];
        $bs = $this->get_moneda()["bs"];
            
        $caja_inicial = 0;
        if ($ultimo_cierre) {
            $caja_inicial = round($ultimo_cierre->dejar_dolar + ($ultimo_cierre->dejar_peso/$cop) + ($ultimo_cierre->dejar_bss/$bs),3);
        }
        $pedido = pedidos::where("created_at","LIKE",$fecha."%");

        $match_cierre = cierres::where("fecha",$fecha)->first();

        $arr_pagos = [
            "match_cierre" => $match_cierre,
            "total"=>0,
            "fecha"=>$fecha,
            "caja_inicial"=>$caja_inicial,

            "numventas"=>$pedido->get()->count(),

            "entregadomenospend"=>0,
            "entregado" => $entregado_fun["entregado"],
            "pendiente" => $entregado_fun["pendiente"],
            "entre_pend_get" => $entregado_fun["entre_pend_get"],

            "total_caja" => 0,
            "total_punto" => 0,

            "estado_efec" => 0,
            "msj_efec" => "",

            "estado_punto" => 0,
            "msj_punto" => "",

            1=>0,
            2=>0,
            3=>0,
            4=>0,
            5=>0,
            6=>0,
        ];
        pago_pedidos::whereIn("id_pedido",$pedido->select("id"))
        ->where("monto","<>",0)
        ->get()
        ->map(function($q) use (&$arr_pagos){
            if (array_key_exists($q->tipo,$arr_pagos)) {
                $arr_pagos[$q->tipo] += $q->monto;
            }else{
                $arr_pagos[$q->tipo] = $q->monto;
            }
            if ($q->tipo!=4&&$q->tipo!=6) {
                $arr_pagos["total"] += $q->monto;
            }
        });
        if (isset($arr_pagos[6])) {
            // Sumar vuelto a pendientes
            $arr_pagos["pendiente"] += $arr_pagos[6]; 
        }
        $entregadomenospend = $arr_pagos["entregado"]-$arr_pagos["pendiente"];
        $arr_pagos["entregadomenospend"] = $entregadomenospend; 


        if (isset($arr_pagos[2])) {
            $this->msj_cuadre($total_punto,$arr_pagos[2],"punto",$arr_pagos);
            $arr_pagos["total_punto"] = round($total_punto,3); 
        }
        if (isset($arr_pagos[3])) {
            $total_caja = ($total_caja_neto - $caja_inicial) + $entregadomenospend;
            $arr_pagos["total_caja"] = round($total_caja,3); 

            $this->msj_cuadre($total_caja,$arr_pagos[3],"efec",$arr_pagos);
        }


        $dejar_usd = 0;
        $dejar_cop = 0;
        $dejar_bs = 0;

        if ($dejar) {
            $dejar_usd = floatval($dejar["dejar_usd"]);
            $dejar_cop = floatval($dejar["dejar_cop"]);
            $dejar_bs = floatval($dejar["dejar_bs"]);
        }

        
        $efectivo_guardado = floatval($arr_pagos["total_caja"])+floatval($caja_inicial)-($entregadomenospend)-floatval($dejar_usd + ($dejar_cop/$cop) + ($dejar_bs/$bs));

        $arr_pagos["efectivo_guardado"] = round($efectivo_guardado,2);

        return $arr_pagos;
    }
    public function cerrar(Request $req)
    {
        return $this->cerrarFun($req->fechaCierre,$req->total_caja_neto,$req->total_punto,["dejar_bs"=>$req->dejar_bs, "dejar_usd"=>$req->dejar_usd, "dejar_cop"=>$req->dejar_cop]);
    }

    public function msj_cuadre($total_entregado,$monto_facturado,$clave,&$arr_pagos,$tolerancia=10)
    {
        if ($monto_facturado) {
            $diff = round($total_entregado-$monto_facturado,3);
            if (($diff>=-1) && ($diff<=$tolerancia)) {
                $arr_pagos["msj_".$clave] = "Cuadrado. Sobran ".$diff;
                $arr_pagos["estado_".$clave] = 1;
            }
            elseif($diff>=$tolerancia){
                $arr_pagos["msj_".$clave] = "Err. Sobran ".$diff;
                $arr_pagos["estado_".$clave] = 0;
            }

            elseif(($diff<=0)){
                $arr_pagos["msj_".$clave] = "Faltan ".$diff;
                $arr_pagos["estado_".$clave] = 0;
            }
        }
    }

    

    public function guardarCierre(Request $req)
    {
        try {
            
            $cop = $this->get_moneda()["cop"];
            $bs = $this->get_moneda()["bs"];


            cierres::updateOrCreate(
                ["fecha"=>$req->fechaCierre],
                [
                    "debito" => floatval($req->total_punto),
                    "efectivo" => floatval($req->efectivo),
                    "transferencia" => floatval($req->transferencia),
                    "dejar_dolar" => floatval($req->dejar_usd),
                    "dejar_peso" => floatval($req->dejar_cop),
                    "dejar_bss" => floatval($req->dejar_bs),

                    "efectivo_guardado" => floatval($req->guardar_usd),
                    "efectivo_guardado_cop" => floatval($req->guardar_cop),
                    "efectivo_guardado_bs" => floatval($req->guardar_bs),
                    "tasa" => $bs,
                    "nota" => $req->notaCierre,
                    "id_usuario" => session()->has("id_usuario"),
                ]

            );

            return Response::json(["msj"=>"¡Cierre guardado exitosamente!","estado"=>true]);

        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getCode()." ".$e->getMessage(),"estado"=>false]);
            
        }
    }
    public function verCierre(Request $req)
    {   
        $type = $req->type;
        $cierre = cierres::where("fecha",$req->fecha)->first();
        if (!$cierre) {
            return "No hay cierre guardado para esta fecha";
        }

        $total_inventario = inventario::sum("precio");
        $vueltos = pago_pedidos::where("tipo",6)->where("monto","<>",0);
        $vueltos_totales = $vueltos->sum("monto");

        $vueltos_des = $vueltos
        ->whereIn("id_pedido",pedidos::where("created_at","LIKE",$req->fecha."%")->select("id"))
        ->get()
        ->map(function($q){
            $q->cliente = pedidos::with("cliente")->find($q->id_pedido);
            return $q;
        });

        $inv = items_pedidos::with("producto")->whereIn("id_pedido",pedidos::where("created_at","LIKE",$req->fecha."%")->where("estado",1)->select("id"))
        ->get()
        ->map(function($q){
            if (isset($q->producto)) {
                $q->base_tot = $q->producto->precio_base*$q->cantidad;
                // code...
            }else{
                $q->base_tot = 0;

            }
            return $q;
        });

        $precio = $inv->sum("monto");
        $precio_base = $inv->sum("base_tot");


        
        $desc_total = items_pedidos::whereIn("id_pedido",pedidos::where("created_at","LIKE",$req->fecha."%")->where("estado",1)->select("id"))
        ->get()
        ->map(function($q){

            // $q->monto_sin = 0;
            // if ($q->descuento!=0) {
                $q->monto_sin = ($q->monto)-(($q->descuento/100)*$q->monto);
                // code...
            // }

            return $q;
        })->sum("monto_sin");

        $credi_total = pago_pedidos::whereIn("id_pedido",pedidos::where("created_at","LIKE",$req->fecha."%")->where("tipo",4)->select("id"))
        ->get()
        ->sum("monto");

        $desc_total -= $credi_total;
        $precio -= $credi_total;
        
        $ganancia = ($desc_total-$precio_base);

        if ($precio_base==0) {
            $porcentaje = 100; 
        }else{
            $porcentaje = round( (($ganancia*100) / $precio_base),2 ); 

        }

        // return $vueltos_des;
        $sucursal = sucursal::all()->first();
        $arr_send = [
            "cierre" => $cierre,
            "total_inventario" =>($total_inventario),
            "vueltos_totales" =>$vueltos_totales,
            "vueltos_des" =>$vueltos_des,

            "precio"=> $precio,
            "precio_base"=> $precio_base,
            "ganancia"=> round($ganancia,2),
            "porcentaje"=> $porcentaje,
            "desc_total"=> round($desc_total,2),
            "facturado" =>$this->cerrarFun($req->fecha,0,0),
            "sucursal"=>$sucursal
        ];



        
        

        if ($type=="ver") {
            return view("reportes.cierre",$arr_send);
        }else{
            //Enviar Central

            (new sendCentral)->setGastos();
            (new sendCentral)->setCentralData();
            (new sendCentral)->setVentas();

            //Enviar Cierre

            $from1 = $sucursal->correo;
            $from = "sinapsis ";
            $subject = $sucursal->sucursal." ".$req->fecha;
            $env_emails = str_replace("\n", "", env("SEND_MAIL"));
            $sends = [
                "alvaroospino79@gmail.com",
            ];
            try {
                Mail::to($sends)->send(new enviarCierre($arr_send,$from1,$from,$subject));    
                
                return Response::json(["msj"=>"Cierre enviado con Éxito","estado"=>true]);
            
            } catch (\Exception $e) {

                return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
                
            }

        }
    }

    

    
    
}
