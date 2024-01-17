<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Аутентификация и сохранение куков в файл
        // $response = Http::post('http://192.168.14.17/zm/api/host/login.json', [
        //     'username' => 'YO_SAFAROV',
        //     'password' => 'ssss',
        // ]);

        // // Делаем другие запросы с сохраненными куками
        // // $response = Http::get('https://yourserver/other/resource');

        // // Получение тела ответа
        // $data = $response->json();

        // Вывод тела ответа (просто для демонстрации)
    }
}
