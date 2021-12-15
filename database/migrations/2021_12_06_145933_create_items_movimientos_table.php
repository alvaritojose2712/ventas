<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsMovimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items_movimientos', function (Blueprint $table) {
            $table->increments('id');

            $table->integer("id_producto");
            $table->decimal("cantidad",10,2);
            $table->boolean("tipo"); //1 Entrada | 0 Salida
            $table->enum("categoria",[1,2]); //1 Garantia | 2 Cambio

            $table->integer("id_movimiento")->unsigned();
            $table->foreign('id_movimiento')->references('id')->on('movimientos')
            ->onDelete('cascade')
            ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items_movimientos');
    }
}
