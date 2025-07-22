<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ProductUpdated implements ShouldBroadcastNow
{
    public $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    public function broadcastOn()
    {
        return new Channel('products');
    }

    public function broadcastAs()
    {
        return 'ProductUpdated';
    }
}
