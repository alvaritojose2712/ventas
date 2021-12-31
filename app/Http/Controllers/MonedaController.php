<?php

namespace App\Http\Controllers;

use App\Models\moneda;
use Illuminate\Http\Request;
use Response;
class MonedaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMoneda(Request $req)
    {
        $dolar = moneda::where("tipo",1)->orderBy("id","desc")->first();
        $peso = moneda::where("tipo",2)->orderBy("id","desc")->first();
        return Response::json(["dolar"=>$dolar,"peso"=>$peso]);
    }
    public function setMoneda(Request $req)
    {
        moneda::updateOrCreate(["tipo"=>$req->tipo], [
            "tipo"=>$req->tipo,
            "valor"=>$req->valor
        ]);
    }
    
    
}
