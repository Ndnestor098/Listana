<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingLists extends Model
{
    protected $fillable = [
        'uuid',
        'name',
        'status',
        'category',
        'user_id',
        'shared_user_ids',
    ];

    protected $casts = [
        'shared_user_ids' => 'array',
    ];

    /**
     * The products that belong to the ShoppingLists
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Products::class);
    }

}
