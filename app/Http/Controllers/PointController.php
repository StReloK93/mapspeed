<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Point;
use App\Models\Geozone;
use DB;

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


    public function getGeozones($data){
        return Geozone::whereDate('created_at', $data)->get()->groupBy('created_at');
    }
}