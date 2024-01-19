<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Facades\MyHttpFacade as Gurtam;
use App\Models\Point;
use DB;
use Carbon\Carbon;

class PointController extends Controller
{

    // ttracks
    public function index(Request $request)
    {

        return Point::select(
            DB::raw('DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0) AS hour'),
            DB::raw('ROUND(AVG(CASE WHEN Speed <> 0 THEN CAST(Speed AS DECIMAL(10, 2)) ELSE NULL END), 2) AS average_speed'),
        )
        ->whereBetween('T', [$request->startDay, $request->endDay])
        ->groupBy(DB::raw('DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0)'))
        ->orderBy('hour')
        ->get();


        // return DB::select('SELECT DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0) AS HourlyTimestamp,
        //     ROUND(AVG(CASE WHEN Speed <> 0 THEN CAST(Speed AS DECIMAL(10, 2)) ELSE NULL END), 2) AS AverageSpeed,
        //     COUNT(*) AS NumberOfRecords
        // FROM
        //     ttracks
        // WHERE
        //     T BETWEEN :startTime AND :endTime
        // GROUP BY
        //     DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0)
        // ORDER BY
        //     HourlyTimestamp
        // ', ['startTime' => $request->startDay, 'endTime' => $request->endDay]);

        // return Point::select(
        //     DB::raw('CAST(T AS DATE) AS day'),
        //     DB::raw("FORMAT(AVG(CAST(speed AS DECIMAL(10, 2))), 'N2') AS middle_speed")
        // )
        // ->where('speed', '<>', 0)
        // ->whereBetween('T', [$request->startDay, $request->endDay])
        // ->groupBy(DB::raw('CAST(T AS DATE)'))
        // ->orderBy(DB::raw('CAST(T AS DATE)'))
        // ->get();

    }
    public function show(Request $request)
    {

        if ($request->index == 0) {
            return DB::select("select * from [dbo].[ProblemZonesAllNKun](?,?,?,?)", [
                $request->oldDays,
                $request->hourPeriod,
                $request->speedRange,
                $request->selectedTime
            ]);
        }

        return DB::select("select * from [dbo].[ProblemZonesAllNKun](?,?,?,?) WHERE qt = ?", [
            $request->oldDays,
            $request->hourPeriod,
            $request->speedRange,
            $request->selectedTime,
            $request->index
        ]);
    }



    public function getReport()
    {
        return Gurtam::getWialonReportImages('2023-12-17 21:00:00', '2023-12-18 08:59:59');
    }
    public function generate($id)
    {
        set_time_limit(300);
        $listCars = Gurtam::getGroupItems($id);
        $array = [];
        foreach ($listCars as $car) {
            $messages = Gurtam::getMessages($car, '2023-12-17 21:00:00', '2023-12-18 08:59:59');
            $array[] = Gurtam::messageToArray($messages, $car, $id);
        }
        // foreach ($array as $value) {
        //     if (count($value) > 300) {
        //         $pieces = array_chunk($value, count($value) / 150);
        //         foreach ($pieces as $val) {
        //             Point::insert($val);
        //         }
        //     } else {
        //         Point::insert($value);
        //     }
        // }

    }

    public function createToken()
    {

        $group = Http::get("http://wl.ngmk.uz/wialon/ajax.html", [
            'svc' => 'token/update',
            'params' => json_encode([
                "callMode" => 'create',
                "userId" => "7547",
                "h" => "",
                "app" => 'mapSpeed',
                "at" => 0,
                "dur" => 0,
                "fl" => -1,
                "p" => [],
                "items" => "",
            ]),
        ]);

        dd(json_decode($group, true));
    }

    public function getTiles()
    {
        return Gurtam::getTiles();
    }

}





// f5289e1f1e82404625a8e440cc9cc3620EA1CA83C8F02E03B3EEF3F51ABC2D16E7FCC250
// 94e3f3e1ac97def632645f3655f7c9320F482674258FFE1B89D5296855D502E753290349

// $pieces = array_chunk($array[5], count($array[5]) / 4);
// 9748 55 Tn avto
// 9749 90 Tn Avto
// 9750 91 Tn Avto
// 9751 92 Tn Avto

// return Point::whereBetween('time', ['2023-12-18 09:00:00', '2023-12-18 11:59:59'])
// ->where('column',65)
// ->get();

// return Point::select('zonax as column', 'zonay as row','id', 'y', 'x')->whereBetween('t', ['2023-12-18 09:00:00', '2023-12-18 11:59:59'])->where([
//     ['zonax', 76],
//     ['zonay', 72],
// ])->get();