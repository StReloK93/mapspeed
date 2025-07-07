<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderWay;
use App\Models\OrderPoint;
class OrderWayController extends Controller
{
    

    public function index(){
        return OrderWay::orderBy('id', 'desc')->get();
    }

    public function show($id){
        return OrderWay::find($id);
    }


    public function store(Request $request){
        return OrderWay::create([
            'name' => $request->name,
            'status' => 0,
        ]);
    }

    public function update($id , Request $request){
        OrderPoint::where('order_id', $id)->delete();
        $points = $request->all();
        
        $formattedPoints = array_map(function ($item) use($id) {
            return [
                'order_id' => $id,
                'index' => $item['index'],
                'lat' => $item['lat'],
                'lng' => $item['lng'],
                'color' => $item['color'],
            ];
        }, $points);
        
        OrderPoint::insert($formattedPoints);

    }

    public function updateName($id , Request $request){
        $order = OrderWay::find($id);
        $order->name = $request->name;
        $order->save();

        return $order;
    }


    public function destroy($id){
        OrderPoint::where('order_id', $id)->delete();
        OrderWay::find($id)->delete();
        return true;
    }
}
