<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wialon extends Model
{
    use HasFactory;

    protected $fillable = [
        'eid',
        'token',
    ];
}
