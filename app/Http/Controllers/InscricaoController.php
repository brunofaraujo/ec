<?php

namespace App\Http\Controllers;

use App\Modalidade;

class InscricaoController extends Controller
{
    public function getModalidades()
    {
        return response()->json(Modalidade::all());
    }

}
