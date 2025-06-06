<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="http://172.16.0.166:8025/wsdk/script/wialon.js"></script>
    <script src="{{ asset('/leaflet/leaflet.js?v=2') }}"></script>
    <link rel="stylesheet" href="{{ asset('/leaflet/leaflet.css?v=2') }}" />
    <link rel="stylesheet" href="/awesome/css/all.min.css" />

    <script>
        const ENV = {
            PIVOT_LAT: {{ env('PIVOT_LAT') == '' ? 'null' : env('PIVOT_LAT')}},
            PIVOT_LON: {{ env('PIVOT_LON') == '' ? 'null' : env('PIVOT_LON')}},
        }
    </script>
    <title>Карта Скоростных дорог</title>
</head>

<body>
    <section id="app"></section>
    @vite('resources/ts/app.ts')

</body>
<script>
    const SERVER_DATA = {
        wialon_token: "{{ $wialon_token }}",
        BASE_T55_ID: "{{ $BASE_T55_ID }}",
        BASE_T90_ID: "{{ $BASE_T90_ID }}",
        BASE_KOMATSU_ID: "{{ $BASE_KOMATSU_ID }}",
        BASE_CAT_ID: "{{ $BASE_CAT_ID }}",
        BASE_ALLCARS_ID: "{{ $BASE_ALLCARS_ID }}",
    }
</script>

</html>