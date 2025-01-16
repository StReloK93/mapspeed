<?php

namespace App\Services;

use App\Services\AuthWialon;
use DB;
use Carbon\Carbon;

class WialonService
{
    protected $wialon;
    function __construct()
    {
        $this->wialon = AuthWialon::getInstance();
    }


    public function writeToDB()
    {
        $transports = $this->getTransportPoints();
        return DB::table('transports')->insert($transports);
    }


    public function getTransportPoints()
    {

        $groupUnits = $this->getGroupUnitsWithName(4);
        $transports = [];

        foreach ($groupUnits as $key => $value) {
            $point = $this->wialon->get([
                'svc' => 'messages/load_last',
                'params' => json_encode([
                    'itemId' => $value['id'],
                    'lastTime' => now()->timestamp,
                    'lastCount' => 1,
                    'flags' => 1,
                    'flagsMask' => 65281,
                    'loadCount' => 1,
                ]),
            ]);

            $transports[$key]['name'] = $value['nm'];
            $transports[$key]['transport_id'] = $value['id'];
            $transports[$key]['y'] = $point['messages'][0]['pos']['y'];
            $transports[$key]['x'] = $point['messages'][0]['pos']['x'];
            $transports[$key]['time_message'] = Carbon::createFromTimestamp($point['messages'][0]['t'])->toDateTimeString();
            ;
            $transports[$key]['created_at'] = now()->format('Y-m-d H:m:s');

        }

        return $transports;
    }

    public function getGeozones()
    {
        $data = $this->wialon->get([
            'svc' => 'core/search_items',
            'params' => json_encode([
                'spec' => [
                    'itemsType' => 'avl_resource',
                    'propName' => 'sys_name',
                    'propValueMask' => '*',
                    'sortType' => 'sys_name',
                ],
                'force' => 1,
                'flags' => 1048577,
                'from' => 0,
                'to' => 0,
            ]),
        ]);
        $qaynarovId = $data['items'][1]['id'];
        $qaynarovZonesGroup = $data['items'][1]['zg'][1]['zns'];

        return $this->wialon->get([
            'svc' => 'resource/get_zone_data',
            'params' => json_encode([
                'itemId' => $qaynarovId,
                'flags' => 0,
            ])
        ]);
    }


    public function execReport($from, $to)
    {
        $this->wialon->get([
            'svc' => 'report/exec_report',
            'params' => json_encode([
                'reportResourceId' => 3638,
                'reportTemplateId' => 65,
                'reportObjectId' => 10587,
                'reportObjectSecId' => 0,
                'interval' => [
                    'from' => $from,
                    'to' => $to,
                    'flags' => 0,
                ],
            ]),
        ]);

        $finalArray = [];


        $rows = $this->resultRows(0);

        foreach ($rows as $key => $row) {
            $colums =  $this->resultSubRows(0, $row['n']);
            foreach ($colums as $key => $col) {
                $period = null;
                if(is_array($col['c'][4])) {
                    $period = $col['c'][4]['v'] - $col['c'][3]['v'];
                }
                if(array_key_exists($col['c'][1], $finalArray)){
                    $finalArray[$col['c'][1]]['time_in_excavator'] += $period;

                    if(in_array( $col['c'][2], $finalArray[$col['c'][1]]['counts']) == false){
                        array_push($finalArray[$col['c'][1]]['counts'], $col['c'][2]);
                    }
                }
                else{
                    $finalArray[$col['c'][1]]['time_in_excavator'] = $period;
                    $finalArray[$col['c'][1]]['counts'] = [$col['c'][2]];
                }
            }
        }

        $rows = $this->resultRows(1);

        foreach ($rows as $key => $row) {
            $colums =  $this->resultSubRows(1, $row['n']);
            foreach ($colums as $key => $col) {
                $carName = $col['c'][1];
                $period = null;
                if(is_array($col['c'][4])) {
                    $period = $col['c'][4]['v'] - $col['c'][3]['v'];
                }

                $issetCar = array_key_exists($carName, $finalArray);
                $issetInSmena = array_key_exists('in_smena', $finalArray[$carName]);
                if($issetCar && $issetInSmena){
                    $finalArray[$carName]['in_smena'] += $period;
                }
                else{
                    $finalArray[$carName]['in_smena'] = $period;
                }
            }
        }

        $rows = $this->resultRows(2);

        foreach ($rows as $key => $row) {
            $colums =  $this->resultSubRows(2, $row['n']);
            foreach ($colums as $key => $col) {
                $carName = $col['c'][1];
                $period = $col['t2'] - $col['t1'];

                $issetCar = array_key_exists($carName, $finalArray);
                $issetInSmena = array_key_exists('in_not_excavator_move', $finalArray[$carName]);
                if($issetCar && $issetInSmena){
                    $finalArray[$carName]['in_not_excavator_move'] += $period;
                }
                else{
                    $finalArray[$carName]['in_not_excavator_move'] = $period;
                }
            }
        }

        $rows = $this->resultRows(3);

        foreach ($rows as $key => $row) {
            $colums =  $this->resultSubRows(3, $row['n']);
            foreach ($colums as $key => $col) {
                $carName = $col['c'][1];
                $period = $col['t2'] - $col['t1'];

                $issetCar = array_key_exists($carName, $finalArray);
                $issetInSmena = array_key_exists('in_not_excavator_stop', $finalArray[$carName]);
                if($issetCar && $issetInSmena){
                    $finalArray[$carName]['in_not_excavator_stop'] += $period;
                }
                else{
                    $finalArray[$carName]['in_not_excavator_stop'] = $period;
                }
            }
        }


        return $finalArray;
    }


    public function resultRows($tableIndex)
    {
        return $this->wialon->get([
            'svc' => 'report/get_result_rows',
            'params' => json_encode([
                'tableIndex' => $tableIndex,
                'indexFrom' => 0,
                'indexTo' => 10000,
            ]),
        ]);
    }


    public function resultSubRows($tableIndex, $rowIndex)
    {
        return $this->wialon->get([
            'svc' => 'report/get_result_subrows',
            'params' => json_encode([
                'tableIndex' => $tableIndex,
                'rowIndex' => $rowIndex,
            ]),
        ]);
    }

    public function getReportByTime(){
        
        $from = Carbon::parse('15-01-2025 08:30')->timestamp;
        $to = Carbon::parse('15-01-2025 09:40')->timestamp;
        return $this->execReport($from, $to);
    }

    public function getUnits()
    {
        return $this->wialon->get([
            'svc' => 'core/search_items',
            'params' => json_encode([
                'spec' => [
                    'itemsType' => 'avl_unit',
                    'propName' => 'sys_name',
                    'propValueMask' => "*",
                    'sortType' => "sys_name",
                    'propType' => "sys_name",
                ],
                'flags' => 1,
                'force' => 0,
                'from' => 0,
                'to' => 0,
            ]),
        ]);
    }

    public function getGroups()
    {
        return $this->wialon->get([
            'svc' => 'core/search_items',
            'params' => json_encode([
                'spec' => [
                    'itemsType' => 'avl_unit_group',
                    'propName' => 'sys_name',
                    'propValueMask' => "*",
                    'sortType' => "sys_name",
                    'propType' => "sys_name",
                ],
                'flags' => 1,
                'force' => 0,
                'from' => 0,
                'to' => 0,
            ]),
        ]);
    }


    public function getGroupUnitsWithName($groupIndex)
    {
        $units = $this->getUnits();
        $groups = $this->getGroups();


        $transport_ids = $groups['items'][$groupIndex]['u'];
        return array_filter($units['items'], function ($unit) use ($transport_ids) {
            return in_array($unit['id'], $transport_ids);
        });
    }

    public function onlyExcavatorGeozones()
    {
        $geozones = $this->getGeozones();
        $excavators = array_filter($geozones, function ($item) {
            return str_contains($item['n'], 'EX') || str_contains($item['n'], 'ЭКГ');
        });

        return array_values($excavators);
    }


    public function writeGeozonesToDB()
    {
        $excavatorZones = $this->onlyExcavatorGeozones();

        $arrayToDB = [];
        $currentTime = now();
        foreach ($excavatorZones as $value) {
            $arrayToDB[] = [
                'name' => $value['n'],
                'points' => json_encode($value['p']),
                'created_at' => $currentTime,
            ];
        }

        DB::table('geozones')->insert($arrayToDB);
    }
}