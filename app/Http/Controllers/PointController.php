<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Point;
use App\Models\Geozone;
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

    }
    public function show(Request $request)
    {

            //         $request->oldDays,
            // $request->hourPeriod,
            // $request->speedRange,
            // $request->selectedTime
        return DB::select("select * from [dbo].[ProblemZonesAllNKun](?,?,?,?)", [
            $request->oldDays, // oldingi nechi kun
            $request->hourPeriod, // oldingi kun
            $request->speedRange, // tezlik farqi
            $request->selectedTime
        ]);

    }


    public function getGeozones($data){
        return Geozone::whereDate('created_at', $data)->get()->groupBy('created_at');
    }


    public function getWaySpeed(Request $request){
        // $request->points
        $coordinates = $request->points;

        return Point::select(
            DB::raw('DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0) AS hour'),
            DB::raw('ROUND(AVG(CASE WHEN Speed <> 0 THEN CAST(Speed AS DECIMAL(10, 2)) ELSE NULL END), 2) AS average_speed'),
        )
        ->where(function ($query) use ($coordinates) {
            foreach ($coordinates as $coordinate) {
                $query->orWhere(function ($q) use ($coordinate) {
                    $q->where('ZonaX', $coordinate['ZonaX'])
                      ->where('ZonaY', $coordinate['ZonaY']);
                });
            }
        })
        ->whereBetween('T', [$request->startDay, $request->endDay])
        ->groupBy(DB::raw('DATEADD(HOUR, DATEDIFF(HOUR, 0, T), 0)'))
        ->orderBy('hour')
        ->get();
    }
}