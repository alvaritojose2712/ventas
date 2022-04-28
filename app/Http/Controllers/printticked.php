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



class printticked extends Controller
{
    public function index(Request $req)
    {
        $ids = $req->ids;

         function addSpaces($string = '', $valid_string_length = 0) {
            if (strlen($string) < $valid_string_length) {
                $spaces = $valid_string_length - strlen($string);
                for ($index1 = 1; $index1 <= $spaces; $index1++) {
                    $string = $string . ' ';
                }
            }

            return $string;
        }
        
        $get_moneda = (new PedidosController)->get_moneda();
        $moneda_req = $req->moneda;
        //$
        //bs
        //cop
        if ($moneda_req=="$") {
          $dolar = 1;
        }else if($moneda_req=="bs"){
          $dolar = $get_moneda["bs"];
        }else if($moneda_req=="cop"){
          $dolar = $get_moneda["cop"];
        }else{
          $dolar = $get_moneda["bs"];
        }

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

                    $printer->setEmphasis(false);
                    $printer->text("\n");
                    $printer->text($val->codigo_barras);
                    $printer->text("\n");
                    $printer->barcode($val->codigo_barras,Printer::BARCODE_CODE39);
                    $printer->text("\n");
                    $printer->text($val->descripcion);
                    $printer->text("\n");
                    $printer->text("\n");

                    $printer->setEmphasis(true);

                    $printer->text("REF. ");
                    $printer -> setTextSize(7,7);
                    $printer->text(number_format($val->pu,2));
                    $printer->setEmphasis(false);
                    $printer -> setTextSize(2,2);

                    $printer->text("\n");

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
