<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Profile;
use App\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Throwable
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        $roleArray = [
            [
                'role' => 'admin',
                'descricao' => 'SysAdmin - level above God'
            ],
            [
                'role' => 'participante',
                'descricao' => 'Regular user / inscrito'
            ],
            [
                'role' => 'avaliador',
                'descricao' => 'Avaliador de apresentações'
            ],
        ];

        foreach ($roleArray as $role) {
            $r = new Role();
            $r->role = $role['role'];
            $r->descricao = $role['descricao'];
            $r->save();
        }

        $admin = new User();
        $admin->email = 'pilinta@gmail.com';
        $admin->password = bcrypt('pilinta');
        $admin->remember_token = str_random(10);
        $admin->role()->associate(Role::findOrFail(1));
        $admin->save();
        $admin->profile()->save(factory(Profile::class)->make());

        factory(User::class, 50)->create()->each(function ($u) {
            $u->profile()->save(factory(Profile::class)->make());
        });
    }
}
