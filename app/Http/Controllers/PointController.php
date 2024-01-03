<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Facades\MyHttpFacade as Gurtam;
use App\Models\Point;
use DB;
class PointController extends Controller
{

    public function index()
    {
        // return Point::whereBetween('time', ['2023-12-18 09:00:00', '2023-12-18 11:59:59'])
        // ->where('column',65)
        // ->get();

        // return Point::select('zonax as column', 'zonay as row','id', 'y', 'x')->whereBetween('t', ['2023-12-18 09:00:00', '2023-12-18 11:59:59'])->where([
        //     ['zonax', 76],
        //     ['zonay', 72],
        // ])->get();

        return DB::select('select * from dbo.ProblemZonesAll()');
    }

    public function getReport(){
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


    public function getTiles(){
        return Gurtam::getTiles();
    }

}

// $pieces = array_chunk($array[5], count($array[5]) / 4);
// 9748 55 Tn avto
// 9749 90 Tn Avto
// 9750 91 Tn Avto
// 9751 92 Tn Avto

