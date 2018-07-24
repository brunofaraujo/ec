<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cpf')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('nome')->nullable();
            $table->string('titulo')->nullable();
            $table->string('profissao')->nullable();
            $table->string('empresa')->nullable();
            $table->string('genero')->nullable();
            $table->date('nascimento')->nullable();
            $table->string('rg_num')->nullable();
            $table->string('rg_expeditor')->nullable();
            $table->string('rg_estado', 2)->nullable();
            // $table->string('nome_pai')->nullable();
            // $table->string('nome_mae')->nullable();
            $table->string('cep', 8)->nullable();
            $table->string('logradouro')->nullable();
            $table->string('numero')->nullable();
            $table->string('complemento')->nullable();
            $table->string('bairro')->nullable();
            $table->string('cidade')->nullable();
            $table->string('estado', 2)->nullable();
            $table->string('pais')->nullable();
            $table->string('telefone')->nullable();
            $table->string('telefone_alt')->nullable();
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
        Schema::dropIfExists('profiles');
    }
}
