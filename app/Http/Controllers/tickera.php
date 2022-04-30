<?php

namespace App\Http\Controllers;

use App\Models\sucursal;
use App\Models\inventario;


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
    public function addSpaces($string = '', $valid_string_length = 0) {
        if (strlen($string) < $valid_string_length) {
            $spaces = $valid_string_length - strlen($string);
            for ($index1 = 1; $index1 <= $spaces; $index1++) {
                $string = $string . ' ';
            }
        }

        return $string;
    }
    public function imprimir(Request $req)
    {

        
        
        $get_moneda = (new PedidosController)->get_moneda();
        $moneda_req = $req->moneda;
        //$
        //bs
        //cop
        $ref = false;
        if ($moneda_req=="$") {
          $dolar = 1;
        }else if($moneda_req=="bs"){
          $dolar = $get_moneda["bs"];
          $ref = true;
        }else if($moneda_req=="cop"){
          $dolar = $get_moneda["cop"];
        }else{
          $dolar = $get_moneda["bs"];
          $ref = true;
        }

        $pedido = (new PedidosController)->getPedido($req,floatval($dolar));
        $sucursal = sucursal::all()->first();
        $fecha_emision = date("Y-m-d H:i:s");

        try {
            
            $connector = new WindowsPrintConnector($sucursal->tickera);
            //smb://computer/printer
            $printer = new Printer($connector);
            $printer->setEmphasis(true);

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

                $tux = EscposImage::load(resource_path() . "/images/small.jpg", false);
                $printer -> bitImage($tux);

                $printer -> text("\n");
                $printer -> text($sucursal->nombre_registro." ".$sucursal->rif);
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
                    $printer -> text($this->addSpaces("Nombres: ".$nombres,22));
                    $printer -> text($this->addSpaces("ID: ".$identificacion,22));
                    $printer -> text("\n");
                    //$printer->setJustification(Printer::JUSTIFY_LEFT);

                    // $printer -> text("Teléfono: ".$tel);
                    // $printer -> text("\n");
                    // $printer->setJustification(Printer::JUSTIFY_LEFT);

                    // $printer -> text("Dirección: ".$dir);
                    // $printer -> text("\n");
                    // $printer->setJustification(Printer::JUSTIFY_LEFT);


                }

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

                   $printer->text($this->addSpaces("Ct. ".$item['cantidad'],15)." | ");
                   //$printer->text("\n");
                   
                   $printer->text($this->addSpaces("P/U. ".$item['pu'],15)." | ");
                   //$printer->text("\n");

                   $printer->text($this->addSpaces("Tot. ".$item['totalprecio'],15));
                   $printer->text("\n");

                }
                $printer->setEmphasis(true);



                $printer->text("Desc: ".$pedido->total_des);
                $printer->text("\n");
                $printer->text("Sub-Total: ". $pedido->subtotal );
                $printer->text("\n");
                $printer->text("Monto IVA 16%: ".$pedido->iva);
                $printer->text("\n");
                $ref_msj = "";
                if ($ref) {
                    $ref_msj = " | REF. ". round(floatval($pedido->clean_total/$get_moneda["bs"]),2);
                }
                $printer->text("Total: ".$pedido->total.$ref_msj);
                $printer->text("\n");

                $printer->setEmphasis(true);

                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->text("Emitida: ".$pedido->created_at);
                $printer->text("\n");
                if ($pedido->fecha_vence) {
                    
                    $printer->text("Vence: ".$pedido->fecha_vence);
                    $printer->text("\n");
                    // code...
                }

                $printer->text("¡Muchas gracias por su compra! :D");
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

    public function precio(Request $req)
    {
        $ids = $req->ids;
        $type = $req->type;

         
        
        $get_moneda = (new PedidosController)->get_moneda();
        $moneda_req = $req->moneda;
        //$
        //bs
        //cop
        $dolar = $get_moneda["bs"];

        $sucursal = sucursal::all()->first();
        $inv = inventario::whereIn("id",$ids)->get();
        

        try {

            // $printer -> setTextSize(1,1);
            // $tux = EscposImage::load(resource_path() . "/images/small.jpg", false);
            // $printer -> bitImage($tux);
            // $printer->setEmphasis(false);
            //$printer->setJustification(Printer::JUSTIFY_CENTER);
            
            $connector = new WindowsPrintConnector($sucursal->tickera);
            //smb://DESKTOP-MRKSKRE/pos-80
            $printer = new Printer($connector);

                $printer->setJustification(Printer::JUSTIFY_CENTER);
                foreach ($inv as $val) {

                   $printer->setEmphasis(true);
                    $printer->text($sucursal->nombre_registro);
                    $printer->text("\n");
                    $printer->text($sucursal->rif);

                    $printer->text("\n");
                    $printer->text("\n");

                    //$printer->setBarcodeHeight(80);
                    //$printer->setBarcodeTextPosition(Printer::BARCODE_TEXT_BELOW);
                    $printer->setEmphasis(true);
                    $printer->text($val->codigo_barras);
                    $printer->setEmphasis(false);
                    $printer->text("\n");
                    $printer->text($val->descripcion);
                    $printer->text("\n");

                    $printer->setEmphasis(true);

                    switch ($type) {
                        // case '1':
                        //     $printer->text("REF. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     $printer->text("\n");

                        //     $printer->text("Bs. ".number_format($val->precio*$dolar,2));


                        //     break;

                        // case '2':
                        //     $printer->text("Bs. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio*$dolar,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     $printer->text("\n");

                        //     $printer->text("REF. ".number_format($val->precio,2));
                        //     break;


                        case '3':
                            $printer->text("\n");
                            $printer->text("REF. ");
                            $printer -> setTextSize(5,5);
                            $printer->text(number_format($val->precio,2));
                            $printer->setEmphasis(false);
                            $printer -> setTextSize(2,2);
                            break;

                        // case '4':
                        //     $printer->text("Bs. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio*$dolar,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     break;


                        // case '5':

                        //     $printer -> setTextSize(3,3);
                        //     $printer->text("1x".str_replace(".00", "", $val->bulto));
                        //     $printer->text("\n");

                        //     $printer->text("REF. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio1*$val->bulto,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     $printer->text("\n");

                        //     $printer->text("Bs. ".number_format($val->precio1*$val->bulto*$dolar,2));


                        //     break;

                        // case '6':
                        //     $printer -> setTextSize(3,3);
                        //     $printer->text("1x".str_replace(".00", "", $val->bulto));
                        //     $printer->text("\n");

                        //     $printer->text("Bs. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio1*$val->bulto*$dolar,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     $printer->text("\n");

                        //     $printer->text("REF. ".number_format($val->precio1*$val->bulto,2));
                        //     $printer->text(number_format($val->precio1*$val->bulto,2));
                        //     break;


                        case '7':
                            $printer -> setTextSize(2,2);
                            $printer->text("1x".str_replace(".00", "", $val->bulto));
                            $printer->text("\n");
                            $printer->text("\n");

                            $printer -> setTextSize(1,1);
                            $printer->text("REF. ");
                            $printer -> setTextSize(5,5);
                            $printer->text(number_format($val->precio1*$val->bulto,2));
                            $printer->setEmphasis(false);
                            break;

                        // case '8':
                        //     $printer -> setTextSize(3,3);
                        //     $printer->text("1x".str_replace(".00", "", $val->bulto));
                        //     $printer->text("\n");

                        //     $printer->text("Bs. ");
                        //     $printer -> setTextSize(5,5);
                        //     $printer->text(number_format($val->precio1*$val->bulto*$dolar,2));
                        //     $printer->setEmphasis(false);
                        //     $printer -> setTextSize(2,2);
                        //     break;
                    }

                    $printer->feed();
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