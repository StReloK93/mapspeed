<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Services\WialonService;
use Carbon\Carbon;
use App\Models\GreyderJob;
class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $wialon = new WialonService();

        $schedule->call(function () use ($wialon) {

            $minute = (int) Carbon::now()->format('i');
            $array = [0, 20, 40];

            if (in_array($minute, $array)) {
                $wialon->writeGeozonesToDB();
            }

        })->everyMinute();



        $schedule->call(function () use ($wialon) {
            $day = now()->format('Y-m-d');
            $from = Carbon::parse("$day 08:30")->timestamp;
            $to = Carbon::parse("$day 09:40")->timestamp;
            $reports = $wialon->execReport($from, $to);

            foreach ($reports as $key => $report) {
                GreyderJob::insert([
                    'name' => $key,
                    'in_smena' => $report['in_smena'],
                    'time_in_excavator' => $report['time_in_excavator'],
                    'in_not_excavator_move' => $report['in_not_excavator_move'],
                    'in_not_excavator_stop' => $report['in_not_excavator_stop'],
                    'counts' => json_encode($report['counts'], JSON_UNESCAPED_UNICODE),
                    'period' => '08:30 - 09:40',
                    'day' => Carbon::now()->format('Y-m-d'),
                    'smena' => 1,
                    'type' => 0,
                ]);
            }

        })->dailyAt('09:41');



        $schedule->call(function () use ($wialon) {
            $day = now()->format('Y-m-d');
            $from = Carbon::parse("$day 20:30")->timestamp;
            $to = Carbon::parse("$day 21:40")->timestamp;
            $reports = $wialon->execReport($from, $to);

            foreach ($reports as $key => $report) {
                GreyderJob::insert([
                    'name' => $key,
                    'in_smena' => $report['in_smena'],
                    'time_in_excavator' => $report['time_in_excavator'],
                    'in_not_excavator_move' => $report['in_not_excavator_move'],
                    'in_not_excavator_stop' => $report['in_not_excavator_stop'],
                    'counts' => json_encode($report['counts'], JSON_UNESCAPED_UNICODE),
                    'period' => '20:30 - 21:40',
                    'day' => Carbon::now()->format('Y-m-d'),
                    'smena' => 2,
                    'type' => 0,
                ]);
            }
        })->dailyAt('21:41');

        $schedule->call(function () use ($wialon) {
            $day = now()->format('Y-m-d');
            $from = Carbon::parse("$day 08:30")->timestamp;
            $to = Carbon::parse("$day 20:30")->timestamp;
            $reports = $wialon->execReport($from, $to);

            foreach ($reports as $key => $report) {
                GreyderJob::insert([
                    'name' => $key,
                    'in_smena' => $report['in_smena'],
                    'time_in_excavator' => $report['time_in_excavator'],
                    'in_not_excavator_move' => $report['in_not_excavator_move'],
                    'in_not_excavator_stop' => $report['in_not_excavator_stop'],
                    'counts' => json_encode($report['counts'], JSON_UNESCAPED_UNICODE),
                    'period' => '08:30 - 20:30',
                    'day' => Carbon::now()->format('Y-m-d'),
                    'smena' => 1,
                    'type' => 1,
                ]);
            }
        })->dailyAt('20:31');

        $schedule->call(function () use ($wialon) {
            $day = now()->format('Y-m-d');
            $subday = Carbon::now()->subDay(1)->format('Y-m-d');
            $from = Carbon::parse("$subday 20:30")->timestamp;
            $to = Carbon::parse("$day 08:30")->timestamp;
            $reports = $wialon->execReport($from, $to);

            foreach ($reports as $key => $report) {
                GreyderJob::insert([
                    'name' => $key,
                    'in_smena' => $report['in_smena'],
                    'time_in_excavator' => $report['time_in_excavator'],
                    'in_not_excavator_move' => $report['in_not_excavator_move'],
                    'in_not_excavator_stop' => $report['in_not_excavator_stop'],
                    'counts' => json_encode($report['counts'], JSON_UNESCAPED_UNICODE),
                    'period' => '20:30 - 08:30',
                    'day' => $subday,
                    'smena' => 2,
                    'type' => 1,
                ]);
            }
        })->dailyAt('08:31');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
