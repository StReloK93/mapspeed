<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="http://wl.ngmk.uz/wsdk/script/wialon.js"></script>
    <script src="{{ asset('/map/leaflet.js?v=2') }}"></script>
    <link rel="stylesheet" href="{{ asset('/map/leaflet.css?v=2') }}" />
    <link rel="stylesheet" href="/awesome/css/all.min.css" />
    
    <title>Карта Скоростных дорог</title>
</head>
<body>
    <section id="app"></section>
    @vite('resources/ts/app.ts')
</body>
</html>
