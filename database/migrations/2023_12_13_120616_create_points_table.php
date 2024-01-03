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
        Schema::create('points', function (Blueprint $table) {
            $table->id();
            $table->integer('car_id');
            $table->integer('category_id');
            $table->double('x',15,6);
            $table->double('y',15,6);
            $table->integer('speed');
            $table->dateTime('time');
            $table->integer('row')->nullable();
            $table->integer('column')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('points');
    }
};
