<?php

namespace App\Providers;

use App\Services\MyHttp;
use Illuminate\Support\ServiceProvider;

class FacadeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('my.http', fn () => new MyHttp());
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
