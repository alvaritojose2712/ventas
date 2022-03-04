<?php

namespace App\Http\Controllers;

use App\Models\sucursal;


use Illuminate\Http\Request;
use Mike42\Escpos;
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintBuffers\ImagePrintBuffer;
use Mike42\Escpos\CapabilityProfiles\DefaultCapabilityProfile;
use Mike42\Escpos\CapabilityProfiles\SimpleCapabilityProfile;
use Response;

class tickera extends Controller
{
    public function imprimir(Request $req)
    {

        function addSpaces($string = '', $valid_string_length = 0) {
            if (strlen($string) < $valid_string_length) {
                $spaces = $valid_string_length - strlen($string);
                for ($index1 = 1; $index1 <= $spaces; $index1++) {
                    $string = $string . ' ';
                }
            }

            return $string;
        }

        $pedido = (new PedidosController)->getPedido($req);
        $sucursal = sucursal::all()->first();
        $get_moneda = (new PedidosController)->get_moneda();
        
        $show_dolares = "no";
        if ($show_dolares=="si") {
          $dolar = 1;
        }else{

          $dolar = $get_moneda["bs"];
        }

        $fecha_emision = date("Y-m-d H:i:s");

        try {
            
            $connector = new WindowsPrintConnector($sucursal->tickera);
            

            /* Print a "Hello world" receipt" */
            $printer = new Printer($connector);

            $printer->setEmphasis(true);

            // $printer->text("\n");
            

            $nombres = "";
            $identificacion = "";
            if (isset($req->nombres)) {
                $nombres = $req->nombres;
            }
            if (isset($req->identificacion)) {
                $identificacion = $req->identificacion;
            }

            if ($nombres=="precio" && $identificacion=="precio") {
                if($pedido->items){

                    foreach ($pedido->items as $val) {

                        $items[] = [
                            'descripcion' => $val->producto->descripcion,
                            'codigo_barras' => $val->producto->codigo_barras,
                            'pu' => $val->producto->precio,
                            'cantidad' => $val->cantidad,
                            'totalprecio' => $val->total,
                           
                        ];
                    }
                }
                $printer->setJustification(Printer::JUSTIFY_CENTER);
               
                foreach ($items as $item) {

                    //Current item ROW 1

                    $printer->setEmphasis(true);
                    $printer->text($sucursal->nombre_registro);

                    $printer->setEmphasis(false);
                    $printer->text("\n");
                    $printer->text($item['codigo_barras']);
                   $printer->text("\n");
                   $printer->text($item['descripcion']);
                   $printer->text("\n");

                    $printer->setEmphasis(true);

                   $printer->text($item['pu']);
                   $printer->setEmphasis(false);
                   
                   $printer->text("\n");

                    $printer->feed();
                }
            }else{

                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer -> setTextSize(1,1);

                $tux = EscposImage::load(resource_path() . "/images/logo.jpg", false);
                $printer -> bitImage($tux, Printer::IMG_DOUBLE_WIDTH | Printer::IMG_DOUBLE_HEIGHT);

                $printer -> text("\n");
                $printer -> text($sucursal->nombre_registro);
                $printer -> text("\n");
                $printer -> text($sucursal->rif);
                $printer -> text("\n");
                $printer -> text($sucursal->telefono1." | ".$sucursal->telefono2);
                $printer -> text("\n");
                $printer->setEmphasis(false);


                $printer->setJustification(Printer::JUSTIFY_CENTER);

                $printer -> setTextSize(1,1);

                
                

                $printer->text("NOTA DE ENTREGA #".$pedido->id);
                $printer -> text("\n");

                $printer->setEmphasis(false);

                $printer -> text("\n");
                if ($nombres!="") {
                    $printer->setJustification(Printer::JUSTIFY_LEFT);
                    $printer -> text("Nombre y Apellido: ".$nombres);
                    $printer -> text("\n");
                    $printer -> text("ID: ".$identificacion);
                    $printer -> text("\n");
                    $printer->setJustification(Printer::JUSTIFY_LEFT);

                    // $printer -> text("Teléfono: ".$tel);
                    // $printer -> text("\n");
                    // $printer->setJustification(Printer::JUSTIFY_LEFT);

                    // $printer -> text("Dirección: ".$dir);
                    // $printer -> text("\n");
                    // $printer->setJustification(Printer::JUSTIFY_LEFT);


                }



                
                $printer->feed();
                $printer->setPrintLeftMargin(0);
                $printer->setJustification(Printer::JUSTIFY_LEFT);
                $printer->setEmphasis(true);
                $printer->setEmphasis(false);
                $items = [];
                $monto_total = 0;

                if($pedido->items){

                    foreach ($pedido->items as $val) {

                        $items[] = [
                            'descripcion' => $val->producto->descripcion,
                            'pu' => $val->producto->precio,
                            'cantidad' => $val->cantidad,
                            'totalprecio' => $val->total,
                           
                        ];
                    }
                }
               
                foreach ($items as $item) {

                    //Current item ROW 1
                   $printer->text($item['descripcion']);
                   $printer->text("\n");

                   $printer->text(addSpaces("P/U. ",6).$item['pu']);
                   $printer->text("\n");

                   $printer->text(addSpaces("Ct. ",6).$item['cantidad']);
                   $printer->text("\n");

                   $printer->text(addSpaces("Tot. ",6).$item['totalprecio']);
                   $printer->text("\n");



                    $printer->feed();
                }
                $printer->setEmphasis(true);



                $printer->text("Desc: ".$pedido->total_des);
                $printer->text("\n");
                $printer->text("Sub-Total: ". $pedido->subtotal );
                $printer->text("\n");
                $printer->text("Monto IVA 16%: ".$pedido->iva);
                $printer->text("\n");
                $printer->text("Total: ".$pedido->total);
                $printer->text("\n");

                $printer->setEmphasis(true);

                $printer->text("\n");
                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->text($pedido->created_at);
                $printer->text("\n");

                $printer->text("Gracias por su compra! :D");
                $printer->text("\n");

                $printer->text("Despues de 24 horas");
                $printer->text("\n");

                $printer->text("No se aceptan devoluciones");
                $printer->text("\n");

                $printer->text("Ni se devuelve el dinero");
                $printer->text("\n");
                $printer->text("\n");
                
              


            }


            

            $printer->cut();
            $printer->pulse();
            $printer->close();

          return Response::json(["msj"=>"Imprimiendo...","estado",true]);

        } catch (Exception $e) {
          return Response::json(["msj"=>"Error: ".$e->getMessage(),"estado",false]);
            
        }
    }
}
