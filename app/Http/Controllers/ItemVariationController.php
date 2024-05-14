<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ItemVariation\CreateItemVariationRequest;
use App\Http\Requests\ItemVariation\GetAllItemVariationsRequest;
use App\Http\Requests\ItemVariation\GetItemVariationRequest;
use App\Http\Requests\ItemVariation\DeleteItemVariationRequest;
use App\Http\Requests\ItemVariation\UpdateItemVariationRequest;
use App\Http\Requests\ItemVariation\GetItemVariationsListRequest;

class ItemVariationController extends Controller
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
        return view('item_variations.index');
    }

    public function create(CreateItemVariationRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteItemVariationRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateItemVariationRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllItemVariationsRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetItemVariationRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function getList(GetItemVariationsListRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }
}
