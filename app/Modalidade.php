<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modalidade extends Model
{
    public function inscricoes()
    {
        return $this->hasMany('App\Inscricao');
    }
}
