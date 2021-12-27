<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\fallas;
use App\Models\movimientos_caja;
use App\Models\sucursal;

use Http;
use Response;

ini_set('max_execution_time', 300);
class sendCentral extends Controller
{
    // public $path = "arabitonline.com";
    public $path = "http://127.0.0.1:8001";


    public function updateApp()
    {


        $version_actual = env("APP_VERSION");
        // return "V.".$version_actual;

        $version_new = 2;
        //$response = Http::get($this->path.'/setGastos');

        if ($version_actual<$version_new) {
            

            exec("cd c:/arabitofacturacion && git pull https://github.com/alvaritojose2712/arabitofacturacion.git", $output, $return);
            if (!$return) {
                exec("cd c:/arabitofacturacion && npm run production && move /Y ./public/css c:/xampp/htdocs/arabito && move /Y ./public/js c:/xampp/htdocs/arabito && move /Y ./public/fonts c:/xampp/htdocs/arabito && move /Y ./public/images c:/xampp/htdocs/arabito",$output,$return);
                if (!$return) {
                    exec("cd c:/arabitofacturacion && php artisan key:generate && && php artisan view:clear && php artisan route:clear && php artisan cache:clear",$output,$return);
                    if (!$return) {
                        echo "Exito al actualizar";
                    }
                }

            } else {
                echo "Error. No se pudo hacer Pull. ".$output;
            }
        }

    }
    public function index()
    {
        return view("central.index");
    }

    public function setGastos(Request $req)
    {
        $sucursal = sucursal::all()->first();
        $movimientos_caja = movimientos_caja::where("push",0)->get();

        if (!$movimientos_caja->count()) {
            return Response::json(["msj"=>"Nada que enviar","estado"=>false]);
        }


        $response = Http::post($this->path.'/setGastos', [
            "sucursal_code"=>$sucursal->codigo,
            "movimientos_caja"=>$movimientos_caja
        ]);

        //ids_ok => id de movimiento 

        if ($response->ok()) {
            $res = $response->json();
            if ($res["estado"]) {
                $changePushMov = movimientos_caja::whereIn("id",$res["ids_ok"])->update(["push"=>1]);

                if ($changePushMov) {return $res["msj"];}
            }
        }else{
            return $response->body();
        }
    }
    public function setCentralData(Request $req)
    {
        $sucursal = sucursal::all()->first();
        $fallas = fallas::where("push",0)->get();

        if (!$fallas->count()) {
            return Response::json(["msj"=>"Nada que enviar","estado"=>false]);
        }


        $response = Http::post($this->path.'/setFalla', [
            "sucursal_code"=>$sucursal->codigo,
            "fallas"=>$fallas
        ]);

        //ids_ok => id de productos 

        if ($response->ok()) {
            $res = $response->json();
            // code...
            if ($res["estado"]) {
                $changePushFallas = fallas::whereIn("id_producto",$res["ids_ok"])->update(["push"=>1]);

                if ($changePushFallas) {return $res["msj"];}
            }
        }

    }

    public function setVentas(Request $req)
    {
        $PedidosController = new PedidosController; 
        $sucursal = sucursal::all()->first();
        $fecha = $PedidosController->today();
        $bs = $PedidosController->get_moneda()["bs"];

        $cierre_fun = $PedidosController->cerrarFun($fecha,0,0);

              // 1 Transferencia
               // 2 Debito 
               // 3 Efectivo 
               // 4 Credito  
               // 5 Otros
               // 6 vuelto

        $ventas = [
            "debito"=> $cierre_fun[2],
            "efectivo"=>$cierre_fun[3],
            "transferencia"=> $cierre_fun[1],
            "tasa"=>$bs,
            "fecha"=>$cierre_fun["fecha"],
            "num_ventas"=>$cierre_fun["numventas"],
        ];


        $response = Http::post($this->path.'/setVentas', [
            "sucursal_code"=>$sucursal->codigo,
            "ventas"=>$ventas
        ]);

        //ids_ok => id de movimiento 

        if ($response->ok()) {
            $res = $response->json();
            if ($res["estado"]) {
               return $res["msj"];
            }
        }else{
            return $response->body();
        }
    }

}
