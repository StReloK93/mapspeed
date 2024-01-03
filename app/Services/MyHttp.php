<?php

namespace App\Services;

use Session;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class MyHttp
{

    public function __construct()
    {
        // $data = Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
        //     'svc' => 'token/login',
        //     'params' => json_encode([
        //         "token" => 'f5289e1f1e82404625a8e440cc9cc362BA59F356797C7A58C077963A55E2E0259F6B271F',
        //     ]),
        // ]);
        
        // dd(Session::get("eid"));
        // Session::put('eid', $data['eid']);
    }

    public function getGroupItems($groupId)
    {
        $group = Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
            'svc' => 'core/search_item',
            'params' => json_encode([
                "id" => $groupId,
                "flags" => 4294967295,
            ]),
            'sid' => Session::get('eid'),
        ]);
        if (isset($group["error"])) return [];
        else return $group['item']['u'];
    }


    public function getWialonReportImages($startDate, $endDate)
    {
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $startDate, 'Asia/Tashkent')->timestamp;
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $endDate, 'Asia/Tashkent')->timestamp;
        $eid = Session::get('eid');

        // Выполняем первый запрос
        Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
            'svc' => 'report/exec_report',
            'params' => json_encode([
                "reportResourceId" => 7547,
                "reportTemplateId" => 3,
                "reportObjectId" => 7381,
                "reportObjectSecId" => 0,
                "interval" => [
                    "flags" => 16777216,
                    "from" => $start,
                    "to" => $end,
                ],
            ]),
            'sid' => $eid,
        ]);

        Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
            'svc' => 'report/select_result_rows',
            'params' => json_encode([
                "tableIndex" => 0,
                "config" => [
                    "type" => "range",
                    "data" => [
                        "from" => 0,
                        "to" => 14,
                        "level" => 1,
                    ],
                ],
            ]),
            'sid' => $eid,
        ]);

    }


    public function messageToArray($data, $carId, $category_id)
    {
        $array = [];
        foreach ($data['messages'] as $point) {
            if (isset($point['pos']['x']) && $point['pos']['s'] > 0) {
                // $coords = $this->findSquareForPoint([$point['pos']['y'], $point['pos']['x']]);
                $array[] = [
                    'car_id' => $carId,
                    'category_id' => $category_id,
                    'x' => $point['pos']['x'],
                    'y' => $point['pos']['y'],
                    'speed' => $point['pos']['s'],
                    'time' => gmdate("Y-m-d\TH:i:s", $point['t'] + date("Z")),
                    // 'row' => $coords[0],
                    // 'column' => $coords[1],
                ];
            }
        }

        return $array;
    }

    public function getMessages($itemId, $startDate, $endDate)
    {
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $startDate, 'Asia/Tashkent')->timestamp;
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $endDate, 'Asia/Tashkent')->timestamp;
        $eid = Session::get('eid');

        return Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
            'svc' => 'messages/load_interval',
            'params' => json_encode([
                "itemId" => $itemId,
                "timeFrom" => $start,
                "timeTo" => $end,
                "flags" => 1,
                "flagsMask" => 65281,
                "loadCount" => 1000000,
            ]),
            'sid' => $eid,
        ]);
    }









}


// 9748 55 Tn avto
// 9749 90 Tn Avto
// 9750 91 Tn Avto
// 9751 92 Tn Avto


// public function getTiles()
// {
//     $lat1 = 42.32;
//     $lon1 = 63.82;

//     $lat2 = 42.205;
//     $lon2 = 63.96;

//     $size_of_square_meters = 100;

//     $lat_per_meter = 1 / (111 * 1000);
//     $lon_per_meter = 1 / (111 * 1000 * cos(deg2rad(($lat1))));

//     $squares_coordinates = [];

//     $current_lat = $lat1;
//     while ($current_lat > $lat2) {
//         $current_lon = $lon1;
//         while ($current_lon < $lon2) {
//             $start_lat = $current_lat;
//             $start_lon = $current_lon;

//             $end_lat = $current_lat - $lat_per_meter * $size_of_square_meters;
//             $end_lon = $current_lon + $lon_per_meter * $size_of_square_meters;

//             $squares_coordinates[] = [
//                 'start' => ['lat' => $start_lat, 'lon' => $start_lon],
//                 'end' => ['lat' => $end_lat, 'lon' => $end_lon]
//             ];

//             $current_lon += $lon_per_meter * $size_of_square_meters;
//         }

//         $current_lat -= $lat_per_meter * $size_of_square_meters;
//     }

//     return $squares_coordinates;
// }

// public function findSquareForPoint($point)
// {
//     $size_of_square_meters = 100;
//     $lat = $point[0];
//     $lon = $point[1];

//     $topLeftLat = 42.32;
//     $topLeftLon = 63.82;

//     $bottomRightLat = 42.205;
//     $bottomRightLon = 63.96;

//     // Проверяем, находится ли точка внутри прямоугольника
//     if (($lat <= $topLeftLat && $lat >= $bottomRightLat) && ($lon >= $topLeftLon && $lon <= $bottomRightLon)) {
//         // Рассчитываем расстояние от начальной координаты прямоугольника до точки
//         $distance_lat = abs($topLeftLat - $lat) * 111000; // Каждый градус широты примерно равен 111 км
//         $distance_lon = abs($topLeftLon - $lon) * (111000 * cos(deg2rad(($topLeftLat)))); // Расстояние по долготе зависит от широты
//         // Рассчитываем индексы квадрата
//         $latIndex = floor($distance_lat / $size_of_square_meters);
//         $lonIndex = floor($distance_lon / $size_of_square_meters);
//         // Выводим значения для отладки
//         return [$latIndex, $lonIndex];
//     } else {
//         // Точка находится за пределами прямоугольника
//         return [null, null];
//     }
// }


