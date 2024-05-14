<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\GetAllCategoriesRequest;
use App\Http\Requests\Category\GetCategoryRequest;
use App\Http\Requests\Category\DeleteCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Category\GetCategoriesListRequest;

class CategoryController extends Controller
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
        return view('categories.index');
    }

    public function create(CreateCategoryRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteCategoryRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateCategoryRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllCategoriesRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetCategoryRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function getList(GetCategoriesListRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }
}
