<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApresentacaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apresentacaos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('inscricao_id')->nullable();
            $table->string('modalidade')->nullable();
            $table->string('titulo')->nullable();
            $table->text('resumo')->nullable();
            $table->string('autores')->nullable();
            $table->string('orientadores')->nullable();
            $table->string('anexo')->nullable();
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
        Schema::dropIfExists('apresentacaos');
    }
}
