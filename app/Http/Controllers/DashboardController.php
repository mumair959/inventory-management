<?php

namespace App\Http\Controllers;

use App\Http\Requests\Dashboard\GetDashboardDataRequest;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('dashboard.index');
    }

    public function getDashboardData(GetDashboardDataRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }
}
