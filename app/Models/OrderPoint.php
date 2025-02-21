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
        'x',
        'y',
        'color',
    ];

    protected $casts = [
        'x' => 'integer',
        'y' => 'integer',
    ];

}
