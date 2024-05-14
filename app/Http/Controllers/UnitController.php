<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Unit\CreateUnitRequest;
use App\Http\Requests\Unit\GetAllUnitsRequest;
use App\Http\Requests\Unit\GetUnitRequest;
use App\Http\Requests\Unit\DeleteUnitRequest;
use App\Http\Requests\Unit\UpdateUnitRequest;
use App\Http\Requests\Unit\GetUnitsListRequest;

class UnitController extends Controller
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
        return view('units.index');
    }

    public function create(CreateUnitRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteUnitRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateUnitRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllUnitsRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetUnitRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function getList(GetUnitsListRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }
}
