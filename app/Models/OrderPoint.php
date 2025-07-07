<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPoint extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'lng',
        'lat',
        'color',
        'index',
    ];

    protected $casts = [
        'lat' => 'float',
        'lng' => 'float',
        'index' => 'integer',
    ];

}
