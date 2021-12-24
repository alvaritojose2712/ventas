<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCierresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cierres', function (Blueprint $table) {
            $table->increments('id');
            
            $table->float("debito"); 
            $table->float("efectivo"); 
            $table->float("transferencia"); 

            $table->float("dejar_dolar"); 
            $table->float("dejar_peso"); 
            $table->float("dejar_bss");


            $table->float("efectivo_guardado");

            $table->float("tasa"); 
            
            $table->text("nota")->nullable();

            $table->date("fecha")->unique();

            $table->integer("id_usuario");
            $table->boolean("push")->default(0);
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
        Schema::dropIfExists('cierres');
    }
}
