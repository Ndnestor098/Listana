<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ShoppingList;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => bcrypt('test'),
        ]);


        User::factory(50)->create();
        ShoppingList::factory(10)->create();
        Product::factory(50)->create();
    }
}
