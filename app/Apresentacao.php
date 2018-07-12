<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Apresentacao extends Model
{
    public function inscricao()
    {
        return $this->belongsTo('App\Inscricao');
    }

    public function avaliacao()
    {
        return $this->hasOne('App\Avaliacao');
    }
}
