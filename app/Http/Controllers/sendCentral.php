<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\fallas;
use App\Models\sucursal;

use Http;

class sendCentral extends Controller
{
    public function setCentralData(Request $req)
    {
        $path = "http://127.0.0.1:8001";

        $sucursal = sucursal::all()->first();

        $response = Http::post($path.'/setFalla', [
            "sucursal_code"=>$sucursal->codigo,
            "fallas"=>fallas::all()
        ]);

        return $response->body();
    }
}
