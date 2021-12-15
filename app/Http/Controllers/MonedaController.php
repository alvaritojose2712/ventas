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
        $check = moneda::where("tipo",$req->tipo)->orderBy("id","desc")->first();
        if ($check) {
            $moneda = moneda::find($check->id);
        }else{
            $moneda = new moneda;

        }
            $moneda->tipo = $req->tipo;
            $moneda->valor = $req->valor;
            $moneda->save();
    }
    
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\moneda  $moneda
     * @return \Illuminate\Http\Response
     */
    public function show(moneda $moneda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\moneda  $moneda
     * @return \Illuminate\Http\Response
     */
    public function edit(moneda $moneda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\moneda  $moneda
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, moneda $moneda)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\moneda  $moneda
     * @return \Illuminate\Http\Response
     */
    public function destroy(moneda $moneda)
    {
        //
    }
}
