<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    use HasFactory;

    protected $table = "ttracks";

    public $timestamps = false;
    protected $fillable = [
        "car_id",
        "x",
        "y",
        "speed",
        "time",
    ];

    protected $casts = [
        'x' => 'float',
        'y' => 'float',
        'speed' => 'integer',
        'row' => 'integer',
        'column' => 'integer',
    ];
}
