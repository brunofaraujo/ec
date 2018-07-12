<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscricao extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function pagamento()
    {
        return $this->hasMany('App\Pagamento');
    }

    public function apresentacoes()
    {
        return $this->hasMany('App\Apresentacao');
    }

    public function oficina()
    {
        return $this->belongsTo('App\Oficina');
    }
}
