<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Recipe\CreateRecipeRequest;
use App\Http\Requests\Recipe\GetAllRecipesRequest;
use App\Http\Requests\Recipe\GetRecipeRequest;
use App\Http\Requests\Recipe\DeleteRecipeRequest;
use App\Http\Requests\Recipe\UpdateRecipeRequest;

class RecipeController extends Controller
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
        return view('recipes.index');
    }

    public function create(CreateRecipeRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function delete(DeleteRecipeRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }

    public function update(UpdateRecipeRequest $request)
    {
        $response = $request->process($request->all());
        return response()->json($response);
    }

    public function getAll(GetAllRecipesRequest $request)
    {
        $response = $request->process();
        return response()->json($response);
    }

    public function get(GetRecipeRequest $request)
    {
        $response = $request->process($request->id);
        return response()->json($response);
    }
}
