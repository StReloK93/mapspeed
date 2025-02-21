<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderWay extends Model
{
    use HasFactory;

    protected $with = [
        'points'
    ];

    public function points()
    {
        return $this->hasMany(OrderPoint::class, 'order_id');
    }

    protected $fillable = [
        'name',
        'status'
    ];
}
