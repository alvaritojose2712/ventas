<?php

namespace App\Http\Controllers;

use App\Models\pedidos;
use App\Models\items_pedidos;
use App\Models\pago_pedidos;
use App\Models\clientes;
use App\Models\movimientos_caja;
use App\Models\sucursal;


use Illuminate\Http\Request;

use App\Http\Controllers\PedidosController;
use Response;

class PagoPedidosController extends Controller
{   
    public function setconfigcredito(Request $req)
    {
        try {

            $fechainiciocredito = $req->fechainiciocredito;
            $fechavencecredito = $req->fechavencecredito;
            $formatopagocredito = $req->formatopagocredito;
            $id_pedido = $req->id_pedido;

            $ped = pedidos::find($id_pedido);
            if ($ped->id_cliente==1) {
                return Response::json(["msj"=>"Error: En caso de crédito, debe registrar los datos del cliente","estado"=>false]);
            }

            $ped->fecha_inicio = $fechainiciocredito;
            $ped->fecha_vence = $fechavencecredito;
            $ped->formato_pago = $formatopagocredito;

            $ped->save();
            
            return Response::json(["msj"=>"Configuración de crédito registrada con éxito","estado"=>true]);

            
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);

            
        }

    }
    public function entregarVuelto(Request $req)
    {
        try {
            $id_pedido = $req->id_pedido;
            $monto = floatval($req->monto);

            $mov = new movimientos_caja;

            if ($monto) {

                $total_acumulado = movimientos_caja::where("id_pedido",$id_pedido)
                ->sum("monto");

                $pendiente = pago_pedidos::where("tipo",6)->where("id_pedido",$id_pedido)
                ->sum("monto");

                if (($total_acumulado+$monto)<=$pendiente) {
                    $mov->id_pedido = $id_pedido;
                    $mov->categoria = 1;
                    $mov->descripcion = "VUELTO Ped.".$id_pedido;
                    $mov->tipo = 1;
                    $mov->monto = $monto;

                    if ($mov->save()) {
                        return Response::json(["msj"=>"Éxito a entregar","estado"=>true]);
                    }
                }else{
                    $pen = $pendiente-$total_acumulado;

                    throw new \Exception("¡Solo quedan ".$pen." por entregar!", 1);
                }

            }else{
                throw new \Exception("¡Monto en cero!", 1);
                
            }

            
        } catch (\Exception $e) {
            
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }

        
    }
    public function setPagoPedido(Request $req)
    {   
        $ped = (new PedidosController)->getPedido($req);

        $total_real = $ped->clean_total;
        $total_ins = floatval($req->debito)+floatval($req->efectivo)+floatval($req->transferencia)+floatval($req->credito);

        //Excepciones
        if ($req->credito!=0&&$ped->id_cliente==1) {
            return Response::json(["msj"=>"Error: En caso de crédito, debe registrar los datos del cliente","estado"=>false]);
        }
        if ($req->vuelto!=0&&$ped->id_cliente==1) {
            // code...
            return Response::json(["msj"=>"Error: En caso de vuelto, debe registrar los datos del cliente","estado"=>false]);
        }

        if (round($total_real,1)==round($total_ins,1)) {
               // 1 Transferencia
               // 2 Debito 
               // 3 Efectivo 
               // 4 Credito  
               // 5 Otros
               // 6 vuelto
            try {
                (new PedidosController)->checkPedidoAuth($req->id);

                $cuenta = 1;
                $checkIfAbono = items_pedidos::where("id_producto",NULL)->where("id_pedido",$req->id)->get()->count();
                if ($checkIfAbono && !$req->credito) {
                    //Es Abono
                    $cuenta = 0;
                }else{
                    //No es abono
                }
                pago_pedidos::updateOrCreate(["id_pedido"=>$req->id,"tipo"=>1],["cuenta"=>$cuenta,"monto"=>floatval($req->transferencia)]);
                pago_pedidos::updateOrCreate(["id_pedido"=>$req->id,"tipo"=>2],["cuenta"=>$cuenta,"monto"=>floatval($req->debito)]);
                pago_pedidos::updateOrCreate(["id_pedido"=>$req->id,"tipo"=>3],["cuenta"=>$cuenta,"monto"=>floatval($req->efectivo)]);
                pago_pedidos::updateOrCreate(["id_pedido"=>$req->id,"tipo"=>4],["cuenta"=>$cuenta,"monto"=>floatval($req->credito)]);
                //5 es Otros
                pago_pedidos::updateOrCreate(["id_pedido"=>$req->id,"tipo"=>6],["cuenta"=>$cuenta,"monto"=>floatval($req->vuelto)]);

                $pedido = pedidos::find($req->id);

                if ($pedido->estado==0) {
                    $pedido->estado = 1;
                    $pedido->save();
                }

                return Response::json(["msj"=>"Éxito","estado"=>true]);
            } catch (\Exception $e) {
                
                return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
            }

        }else{
            return Response::json(["msj"=>"Error. Montos no coinciden. Real: ".round($total_real,1)." | Ins: ".round($total_ins,1),"estado"=>false]);
            
        }
    }

    public function getDeudaFun($onlyVueltos,$id_cliente)
    {
        $pedidos = pedidos::with(["pagos"=>function($q) use ($onlyVueltos){
            if ($onlyVueltos) {
                $q->where("tipo",6)->where("monto","<>",0);
            }
            $q->orderBy("tipo","desc");
        }])
        ->where(function($q) use ($onlyVueltos){
            if ($onlyVueltos) {
                $q->whereIn("id",pago_pedidos::where("tipo",6)->where("monto","<>",0)->select("id_pedido"));
            }else{
                $q->whereIn("id",pago_pedidos::orWhere(function($q){
                    $q->orWhere("tipo",4); //Credito
                    $q->orWhere("cuenta",0); //Abono
                })->where("monto","<>",0)->select("id_pedido"));

            }
        })
        ->where("id_cliente",$id_cliente)
        ->orderBy("created_at","desc")
        ->get()
        ->map(function($q){
            
            $q->saldoDebe = $q->pagos->where("tipo",4)->sum("monto");
            $q->saldoAbono = $q->pagos->where("cuenta",0)->sum("monto");


            $q->entregado = movimientos_caja::where("id_pedido",$q->id)->get();

                   

            return $q;
        });
        $pedido_total[0] = $pedidos->sum("saldoAbono");
        $pedido_total[1] = $pedidos->sum("saldoDebe");

        // $diferencia = 0;

        // if ($pedido_total[1] && $pedido_total[0]) {
        // $diferencia = ;
        // }
        $d = $pedido_total[0] - $pedido_total[1];

        $check = true;

        if ($d<0) {
            $check = false;
        }
        $pedido_total["diferencia"] = number_format($d,2);
        $pedido_total["diferencia_clean"] = $d;
        $pedido_total["check"] = $check;
        return [
            "pedido" => $pedidos,
            "pedido_total" => $pedido_total,
        ]; 
    }
    public function getDeudor(Request $req)
    {
        $onlyVueltos = $req->onlyVueltos;
        $id_cliente = $req->id;

        return $this->getDeudaFun($onlyVueltos,$id_cliente);
        

    }

    public function checkDeuda(Request $req)
    {
        $id_cliente = $req->id_cliente;
        return $this->getDeudaFun(false,$id_cliente);

    }
    public function verCreditos(Request $req)
    {
        $sucursal = sucursal::all()->first();
        $today = (new PedidosController)->today();


        $qDeudores = $req->qDeudores;
        $orderbycolumdeudores = $req->orderbycolumdeudores;
        $orderbyorderdeudores = $req->orderbyorderdeudores;

        $data = $this->getDeudoresFun($qDeudores,$orderbycolumdeudores,$orderbyorderdeudores,$today,200);
        
        return view("reportes.creditos",["data" => $data,"sucursal" => $sucursal,"today"=>$today]);
    }
    public function getDeudores(Request $req)
    {   
        $today = (new PedidosController)->today();
        $busqueda = $req->qDeudores;
        $view = $req->view;

        $orderbycolumdeudores = $req->orderbycolumdeudores;
        $orderbyorderdeudores = $req->orderbyorderdeudores;
        $limitdeudores = $req->limitdeudores;


        if ($view==="vueltos") {
            return clientes::with(["pedidos"=>function($q){
                $q->with(["pagos"]);
                $q->orderBy("created_at","desc");
            }])
            ->where("id","<>",1)->where(function($q) use ($busqueda){
                $q->orWhere("identificacion","LIKE","%".$busqueda."%")
                ->orWhere("nombre","LIKE","%".$busqueda."%");
            })

            ->limit($limitdeudores)
            ->get()
            ->map(function($q) use ($view,$today) {

                $q->totalVuelto = 0; 
                $q->saldo = 0;
                if ($view==="vueltos") {
                    // code...
                    $q->totalVuelto = $q->pedidos->map(function($q){

                        $check_vuelto_entregado = movimientos_caja::where("id_pedido",$q->id)->sum("monto");
                        $sum_entregado = 0;
                        if ($check_vuelto_entregado) {
                            
                            $sum_entregado = $check_vuelto_entregado;
                        }

                        return $q->pagos->where("tipo",6)->sum("monto")-$sum_entregado;
                    })->sum();
                }
                return $q;
            });
        }else{
            return $this->getDeudoresFun($busqueda,$orderbycolumdeudores,$orderbyorderdeudores,$today,$limitdeudores);
        }


    }
    public function getDeudoresFun($busqueda,$orderbycolumdeudores,$orderbyorderdeudores,$today,$limitdeudores)
    {   
        return clientes::with(["pedidos"=>function($q){
                // $q->with(["pagos"]);
                $q->orderBy("created_at","desc");
            }])
            ->selectRaw("*,@credito := (SELECT COALESCE(sum(monto),0) FROM pago_pedidos WHERE id_pedido IN (SELECT id FROM pedidos WHERE id_cliente=clientes.id) AND tipo=4) as credito, @abono := (SELECT COALESCE(sum(monto),0) FROM pago_pedidos WHERE id_pedido IN (SELECT id FROM pedidos WHERE id_cliente=clientes.id) AND cuenta=0) as abono, (@abono-@credito) as saldo, @vence := (SELECT fecha_vence FROM pedidos WHERE id_cliente=clientes.id AND fecha_vence > $today ORDER BY pedidos.fecha_vence ASC LIMIT 1) as vence , (COALESCE(DATEDIFF(@vence,'$today 00:00:00'),0)) as dias")
            // ->where("saldo","<",0)
            ->where("id","<>",1)->where(function($q) use ($busqueda){
                $q->orWhere("identificacion","LIKE","%".$busqueda."%")
                ->orWhere("nombre","LIKE","%".$busqueda."%");
            })
            // ->having("saldo","<",0)
            ->orderBy($orderbycolumdeudores,$orderbyorderdeudores)
            ->limit($limitdeudores)
            ->get();
    }

    public function setPagoCredito(Request $req)
    {
        if (session()->has("id_usuario")) {
            $id_cliente = $req->id_cliente;
            $pedido = new pedidos;

            $pedido->estado = 1;
            $pedido->id_cliente = $id_cliente;
            $pedido->id_vendedor = session("id_usuario");

            if ($pedido->save()) {
                $cliente = clientes::find($id_cliente);

                $producto_pago_desc = "PAGO ".$cliente->nombre;
                

                $items_pedidos = new items_pedidos;
                $items_pedidos->id_producto = null;
                $items_pedidos->abono = $producto_pago_desc;
                $items_pedidos->id_pedido = $pedido->id;
                $items_pedidos->cantidad = 1;
                $items_pedidos->descuento = 0;
                $items_pedidos->monto = $req->monto_pago_deudor;
                $items_pedidos->save();
                
                $pago_pedidos = new pago_pedidos;
                $pago_pedidos->tipo = $req->tipo_pago_deudor;
                $pago_pedidos->monto = $req->monto_pago_deudor;
                $pago_pedidos->id_pedido = $pedido->id;
                $pago_pedidos->cuenta = 0;
                $pago_pedidos->save();

                return Response::json(["msj"=>"Pago registrado con éxito","estado"=>true]);
                

            }
        }
    }
}
