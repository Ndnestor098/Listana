<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ShoppingList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductFactory extends Factory
{

    /**
     * El modelo que representa esta factory.
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'uuid' => fake()->uuid(),
            'quantity' => fake()->numberBetween(1, 100),
            'status' => fake()->randomElement(['pending', 'bought', 'unavailable']),
            'unit_price' => fake()->randomFloat(2, 0, 100),
            'shopping_list_id' => ShoppingList::inRandomOrder()->first()->id,
            'user_id' => '1',
        ];
    }
}
