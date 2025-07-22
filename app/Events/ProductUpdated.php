<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Facades\Log;

class ProductUpdated implements ShouldBroadcastNow
{
    public $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    public function broadcastOn()
    {
        return new Channel('products'); // 🔴 Canal público llamado 'products'
    }

    public function broadcastWith()
    {
        Log::info('Broadcasting ProductUpdated event:', $this->product->toArray());
        return [
            // tus datos que se envían al evento
            'product' => $this->product,
        ];
    }

}