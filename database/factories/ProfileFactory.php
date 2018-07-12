<?php

use Faker\Generator as Faker;

$factory->define(\App\Profile::class, function (Faker $faker) {
    return [
        'cpf' => $faker->unique()->numerify('###.###.###-##'),
        'nome' => $faker->unique()->name,
        'genero' => $faker->randomLetter,
        'nascimento' => $faker->date(),
        'rg_num' => $faker->unique()->randomNumber(7),
        'rg_expeditor' => $faker->randomLetter.$faker->randomLetter.$faker->randomLetter,
        'rg_estado' => $faker->randomLetter.$faker->randomLetter,
        'cep' => $faker->randomNumber(8),
        'logradouro' => $faker->address,
        'numero' => $faker->randomNumber(4),
        'complemento' => $faker->colorName,
        'bairro' => $faker->monthName,
        'cidade' => $faker->city,
        'estado' => $faker->randomLetter.$faker->randomLetter,
        'pais' => $faker->country,
        'telefone' => $faker->phoneNumber,
        'telefone_alt' => $faker->phoneNumber
    ];
});