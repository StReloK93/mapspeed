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