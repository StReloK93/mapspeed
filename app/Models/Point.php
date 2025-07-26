<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    use HasFactory;

    protected $table = "TSpeedAvg";

    public $timestamps = false;
    protected $fillable = [
        "ID",
        "Date",
        "TraksCount",
        "SpeedSum",
        "SpeedAvg",
        "ZonaX",
        "ZonaY",
        "Created",
    ];

    protected $casts = [
        'SpeedAvg' =>  'float',
        'ZonaX' =>  'integer',
        'ZonaY' =>  'integer',
        // 'objectid' => 'integer',
        // 'speed' => 'integer',
        // 'row' => 'integer',
        // 'column' => 'integer',
    ];
}
