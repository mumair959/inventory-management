<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Item\CreateItemRequest;
use App\Http\Requests\Item\GetAllItemsRequest;
use App\Http\Requests\Item\GetItemRequest;
use App\Http\Requests\Item\DeleteItemRequest;
use App\Http\Requests\Item\UpdateItemRequest;
use App\Http\Requests\Item\GetItemsListRequest;

class ItemController extends Controller
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
        return view('items.index');
    }

    public function create(CreateItemRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteItemRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateItemRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllItemsRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetItemRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function getList(GetItemsListRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }
}
