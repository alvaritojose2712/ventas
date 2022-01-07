<?php

namespace App\Http\Controllers;

use App\Models\movimientos;
use App\Models\inventario;
use App\Models\garantia;
use App\Models\items_movimiento;
use Illuminate\Http\Request;
use Response;


class MovimientosController extends Controller
{
    
    public function delMov(Request $req)
    {
        try {

            $mov = items_movimiento::find($req->id);
            $fecha_Str = strtotime($mov->created_at);
            $fec = date("Y-m-d",$fecha_Str);

            (new PedidosController)->checkPedidoAuth(null,$fec);
            
            if ($mov) {
                $num_res = items_movimiento::where("id_movimiento",$mov->id_movimiento)->count();
                $id_movimiento = $mov->id_movimiento;

                $id_producto = $mov->id_producto; 
                $cantidad = $mov->cantidad; 
                $tipoMovMovimientos = $mov->tipo; 
                $tipoCatMovimientos = $mov->categoria;


                if ($mov->delete()) {
                    if ($num_res==1) {
                        movimientos::find($id_movimiento)->delete();
                    }
                    $restar_cantidad = inventario::find($id_producto);

                    if ($tipoMovMovimientos==0) {
                        //Salida de Producto
                        $restar_cantidad->cantidad = $restar_cantidad->cantidad + $cantidad;
                    }elseif ($tipoMovMovimientos==1) {
                        //Entrada de Producto
                        if ($tipoCatMovimientos==2) {
                            //Por Cambio
                            $restar_cantidad->cantidad = $restar_cantidad->cantidad - $cantidad;
                        }elseif ($tipoCatMovimientos==1) {
                            //Por Garantia

                            $exit_num = 0;

                            $exi = garantia::where("id_producto",$id_producto)->first();

                            if ($exi) {
                                $exit_num = $exi->cantidad;
                            }
                            garantia::updateOrCreate(
                                ["id_producto" => $id_producto],
                                ["cantidad" => $exit_num-$cantidad]
                            );
                        }
                    }
                    $restar_cantidad->save();
                    return Response::json(["msj"=>"¡Éxito!","estado"=>true]);
                }
            }
            return Response::json(["msj"=>"Upss...","estado"=>true]);
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }

    }
    public function getMovimientos(Request $req)
    {
        $today = $req->fechaMovimientos;
        return movimientos::with(["items"=>function($q)
        {
            $q->with("producto");
        }])->where("created_at","LIKE",$today."%")->orderBy("created_at","desc")->get();
    }
    public function setDevolucion(Request $req)
    {
        try {
            
            (new PedidosController)->checkPedidoAuth(null,$req->fechaMovimientos);


            $id_producto = $req->id;
            $idMovSelect = $req->idMovSelect;
            $cantidad = $req->cantidad;
            $tipoMovMovimientos = $req->tipoMovMovimientos;
            $tipoCatMovimientos = $req->tipoCatMovimientos;


            $date = new \DateTime($req->fechaMovimientos);
            $fechaMovimientos = $date->getTimestamp();
            


          
           
            $restar_cantidad = inventario::find($id_producto);

            if ($tipoMovMovimientos==0) {
                //Salida de Producto

                if ($restar_cantidad->cantidad<$cantidad) {
                    return Response::json(["msj"=>"Error: No hay las cantidades solicitadas.","estado"=>false]);

                }else{
                    $restar_cantidad->cantidad = $restar_cantidad->cantidad - $cantidad;
                }


            }elseif ($tipoMovMovimientos==1) {
                //Entrada de Producto
                if ($tipoCatMovimientos==2) {
                    //Por Cambio
                    $restar_cantidad->cantidad = $restar_cantidad->cantidad + $cantidad;
                }elseif ($tipoCatMovimientos==1) {
                    //Por Garantia

                    $exit_num = 0;

                    $exi = garantia::where("id_producto",$id_producto)->first();

                    if ($exi) {
                        $exit_num = $exi->cantidad;
                    }
                    garantia::updateOrCreate(
                        [
                            "id_producto" => $id_producto
                        ],
                        [
                            
                            "cantidad" => $exit_num+$cantidad,
                        ]

                    );
                }
            }

            if($restar_cantidad->save()){
                $new_item_mov = new items_movimiento;
                $new_item_mov->id_producto = $id_producto;
                $new_item_mov->cantidad = $cantidad;
                $new_item_mov->tipo = $tipoMovMovimientos;
                $new_item_mov->categoria = $tipoCatMovimientos;


                $new_item_mov->created_at = $fechaMovimientos;
                

                if ($idMovSelect=="nuevo") {
                    $new_mov = new movimientos;
                    $new_mov->created_at = $fechaMovimientos;
                    $new_mov->save();

                    if ($new_mov) {
                        $new_item_mov->id_movimiento = $new_mov->id;
                    }
                }else{
                    $new_item_mov->id_movimiento = $idMovSelect;

                }
                $new_item_mov->save();
            }
            
            return Response::json(["msj"=>"¡Éxito!","estado"=>true]);
        } catch (\Exception $e) {
            return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado"=>false]);
        }


    }

    
}
