<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ShoppingList;

class ShoppingListFactory extends Factory
{
    /**
     * El modelo que representa esta factory.
     */
    protected $model = ShoppingList::class;

    public function definition(): array
    {
        $totalProducts = $this->faker->numberBetween(1, 20);
        $completedProducts = $this->faker->numberBetween(0, $totalProducts);
        return [
            'name' => $this->faker->words(2, true),
            'uuid' => $this->faker->uuid(),
            'status' => $this->faker->randomElement(['active', 'completed', 'archived']),
            'category' => $this->faker->word(),
            'user_id' => 1,
            'final_price' => $this->faker->randomFloat(2, 0, 1000),
            'initial_price' => $this->faker->randomFloat(2, 0, 1000),
            'completed_products' => $completedProducts,
            'total_products' => $totalProducts,
        ];
    }
}
