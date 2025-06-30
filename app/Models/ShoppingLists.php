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

}
