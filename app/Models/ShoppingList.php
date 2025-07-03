<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingList extends Model
{
    use HasFactory;

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
        return $this->hasMany(Product::class);
    }

    public function sharedUsers()
    {
        return $this->belongsToMany(User::class);
    }

}
