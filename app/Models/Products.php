<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = [
        'uuid',
        'name',
        'quantity',
        'status',
        'shopping_list_id',
    ];

    /**
     * Get the shopping list that the product belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shoppingList()
    {
        return $this->belongsTo(ShoppingLists::class);
    }
}
