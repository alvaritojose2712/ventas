<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lotes extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "id_producto",
        "cantidad",
        "lote",
        "creacion",
        "vence",
    ];
}
