<?php

use Faker\Generator as Faker;

$factory->define(\App\Profile::class, function (Faker $faker) {
    return [
        'cpf' => $faker->unique()->numerify('###########'),
        'nome' => $faker->unique()->name,
        'genero' => mb_strtoupper($faker->randomLetter),
        'titulo' => $faker->title,
        'profissao' => $faker->jobTitle,
        'empresa' => $faker->city,
        'nascimento' => $faker->date(),
        'rg_num' => $faker->unique()->randomNumber(7),
        'rg_expeditor' => mb_strtoupper($faker->randomLetter.$faker->randomLetter.$faker->randomLetter),
        'rg_estado' => mb_strtoupper($faker->randomLetter.$faker->randomLetter),
        'cep' => $faker->randomNumber(8),
        'logradouro' => $faker->address,
        'numero' => $faker->randomNumber(4),
        'complemento' => $faker->colorName,
        'bairro' => $faker->monthName,
        'cidade' => $faker->city,
        'estado' => mb_strtoupper($faker->randomLetter.$faker->randomLetter),
        'pais' => $faker->country,
        'telefone' => $faker->unique()->numerify('###########'),
        'telefone_alt' => $faker->unique()->numerify('##########')
    ];
});