<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsPedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items_pedidos', function (Blueprint $table) {
            $table->increments('id');
            

            $table->integer("lote")->nullable()->default(null);
            $table->integer("id_producto")->unsigned()->nullable(true);
            $table->foreign('id_producto')->references('id')->on('inventarios');
            $table->integer("id_pedido")->unsigned();
            $table->foreign('id_pedido')->references('id')->on('pedidos')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            
            $table->string("abono")->nullable()->default(null);
            $table->decimal("cantidad",8,2);
            $table->decimal("descuento",6,2)->default(0);
            $table->decimal("monto",8,2);
            $table->boolean("entregado")->default(false)->nullable(true);
            $table->timestamps();

            $table->unique(["id_producto","id_pedido","lote"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items_pedidos');
    }
}
