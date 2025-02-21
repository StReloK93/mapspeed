<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreyderJob extends Model
{
    use HasFactory;

    protected $casts = [
        'counts' => 'json',
        'in_not_excavator_stop' => 'integer',
        'in_not_excavator_move' => 'integer',
        'time_in_excavator' => 'integer',
    ];



    public function getTimeInExcavatorAttribute($value)
    {
        return (int)$value ?? 0;
    }

    public function setTimeInExcavatorAttribute($value)
    {
        $this->attributes['some_field'] = $value ?? 0;
    }

}
