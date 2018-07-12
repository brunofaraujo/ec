<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pagamento extends Model
{
    public function inscricao()
    {
        return $this->belongsTo('App\Inscricao');
    }
}
