<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'cpf',
        'nome',
        'titulo',
        'profissao',
        'empresa',
        'genero',
        'nascimento',
        'rg_num',
        'rg_expeditor',
        'rg_estado',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'pais',
        'telefone',
        'telefone_alt',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
