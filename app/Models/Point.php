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
        "ID",
        "ObjectID",
        "X",
        "Y",
        "Z",
        "Speed",
        "Created",
        "ZonaX",
        "ZonaY",
    ];

    protected $casts = [
        'x' => 'float',
        'y' => 'float',
        'speed' => 'integer',
        'row' => 'integer',
        'column' => 'integer',
    ];
}
