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
        Schema::create('item_modifiers', function (Blueprint $table) {
            $table->id();
            $table->string('title',255);
            $table->double('price',12,3);
            $table->foreignId('item_id')->constrained();
            $table->boolean('can_multiple');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_modifiers');
    }
};
