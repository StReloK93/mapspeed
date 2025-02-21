<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GreyderJob;
use DB;
class OrderPointController extends Controller
{
	public function greyderJobs(Request $request)
	{
		return GreyderJob::join('WIALON.dbo.ReportSmenaTeam as smena_team', function ($join) {
				$join->on('greyder_jobs.day', '=', 'smena_team.smenaDate')
					->on('greyder_jobs.smena', '=', 'smena_team.smena');
			})
			->where('type', $request->type)
			->whereBetween('day', [$request->startDate, $request->endDate])
			->select('greyder_jobs.*', 'smena_team.teamNum') // или укажите нужные столбцы
			->get();
	}
}
