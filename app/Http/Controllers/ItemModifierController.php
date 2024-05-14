<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ItemModifier\CreateItemModifierRequest;
use App\Http\Requests\ItemModifier\GetAllItemModifiersRequest;
use App\Http\Requests\ItemModifier\GetItemModifierRequest;
use App\Http\Requests\ItemModifier\DeleteItemModifierRequest;
use App\Http\Requests\ItemModifier\UpdateItemModifierRequest;

class ItemModifierController extends Controller
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
        return view('item_modifiers.index');
    }

    public function create(CreateItemModifierRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteItemModifierRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateItemModifierRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllItemModifiersRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetItemModifierRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }
}
