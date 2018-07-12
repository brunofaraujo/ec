<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    public function inscricoes()
    {
        return $this->hasMany('App\Inscricao');
    }
}
