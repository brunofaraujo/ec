<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    public function apresentacao()
    {
        return $this->belongsTo('App\Apresentacao');
    }

    public function avaliador()
    {
        return $this->belongsTo('App\User', 'avaliador_id');
    }
}
