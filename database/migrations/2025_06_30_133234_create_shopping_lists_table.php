<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shopping_lists', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name')->unique();
            $table->enum('status', ['active', 'completed', 'archived', 'inactive'])->default('active');
            $table->string('category')->nullable();
            $table->decimal('initial_price', 10, 2)->default(0.00);
            $table->decimal('final_price', 10, 2)->default(0.00);
            $table->integer('completed_products')->default(0);
            $table->integer('total_products')->default(0);

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->json('shared_user_ids')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_lists');
    }
};
