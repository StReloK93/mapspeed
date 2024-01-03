<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class MyHttpFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'my.http';
    }
}