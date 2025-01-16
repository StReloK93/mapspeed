<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('greyder_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('in_smena')->nullable();
            $table->integer('time_in_excavator')->nullable();
            $table->integer('in_not_excavator_move')->nullable();
            $table->integer('in_not_excavator_stop')->nullable();
            $table->json('counts')->nullable();
            $table->string('period');
            $table->date('day');
            $table->integer('smena');
            $table->integer('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('greyder_jobs');
    }
};
