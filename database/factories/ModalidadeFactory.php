<?php

use Faker\Generator as Faker;
use App\Modalidade;

$factory->define(Modalidade::class, function (Faker $faker) {
    return [
        'nome' => $faker->unique()->jobTitle,
        'descricao' => $faker->realText(),
        'valor' => $faker->randomFloat(2,100,400),
    ];
});
