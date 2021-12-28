<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovimientosCajasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos_cajas', function (Blueprint $table) {
            $table->increments('id');
            $table->string("descripcion");
            $table->boolean("tipo"); 
            // 1 Entregado
            // 0 Pendientes
            $table->integer("categoria");

            // 1 Vueltos
            // 2 Nómina
            // 3 Funcionamiento
            // 4 Pago a proveedores
            // 5 Otros
            // 6 Devolución
            $table->integer("id_pedido")->nullable();

            $table->float("monto",10,2);
            $table->timestamps();

            $table->unique(["id_pedido","categoria"]);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movimientos_cajas');
    }
}
