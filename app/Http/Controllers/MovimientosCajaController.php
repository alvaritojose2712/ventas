<?php

namespace App\Http\Controllers;

use App\Models\movimientos_caja;
use Illuminate\Http\Request;

class MovimientosCajaController extends Controller
{
    public function getMovimientosCaja(Request $req)
    {
        $today = $req->fecha;
        $mov = movimientos_caja::where("created_at","LIKE",$today."%")->orderBy("created_at","desc")->get();
        return $mov;
    }
    public function setMovimientoCaja(Request $req)
    {

        $date = new \DateTime($req->fecha);
        $fecha = $date->getTimestamp();

        $mov = new movimientos_caja();

        $mov->descripcion = $req->descripcion;
        $mov->tipo = $req->tipo;
        $mov->categoria = $req->categoria;
        $mov->created_at = $fecha;
        $mov->monto = floatval($req->monto);
        $mov->save();
    }

   public function delMovCaja(Request $req)
   {
        if ($mov = movimientos_caja::find($req->id)) {
            $mov->delete();
            // code...
        }

   }

}
