<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="http://wl.ngmk.uz/wsdk/script/wialon.js"></script>
    <script src="{{ asset('/leaflet/leaflet.js?v=2') }}"></script>
    <link rel="stylesheet" href="{{ asset('/leaflet/leaflet.css?v=2') }}" />
    <link rel="stylesheet" href="/awesome/css/all.min.css" />


    <title>Карта Скоростных дорог</title>
    @vite('resources/ts/app.ts')
</head>

<body>
    <section id="app"></section>
</body>
<script>
    const ENV = {
        PIVOT_LAT: {{ env('PIVOT_LAT') == '' ? 'null' : env('PIVOT_LAT')}},
        PIVOT_LON: {{ env('PIVOT_LON') == '' ? 'null' : env('PIVOT_LON')}},
        SHARQIY: {{  env('SHARQIY') == '' ? 'null' : env('SHARQIY') }},
        ACCAUNT_ID: {{  env('ACCAUNT_ID') == '' ? 'null' : env('ACCAUNT_ID') }},
        BASE_ALLCARS_ID: {{  env('BASE_ALLCARS_ID') == '' ? 'null' : env('BASE_ALLCARS_ID') }},
        WIALON_TOKEN: '{{  env('WIALON_TOKEN') == '' ? 'null' : env('WIALON_TOKEN') }}',
        WATER_TRUCK_GROUPID: {{  env('WATER_TRUCK_GROUPID') == '' ? 'null' : env('WATER_TRUCK_GROUPID') }},
        WATER_TRUCKS_REPORT: {{  env('WATER_TRUCKS_REPORT') == '' ? 'null' : env('WATER_TRUCKS_REPORT') }},
        BASE_SMENA_DAY: "{{  env('BASE_SMENA_DAY') == '' ? 'null' : env('BASE_SMENA_DAY') }}",
        BASE_SMENA_NIGHT: "{{  env('BASE_SMENA_NIGHT') == '' ? 'null' : env('BASE_SMENA_NIGHT') }}",
        RESOURCE_INDEX: "{{  env('RESOURCE_INDEX') == '' ? 'null' : env('RESOURCE_INDEX') }}",
    }
</script>

</html>