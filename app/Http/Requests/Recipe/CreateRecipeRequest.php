<?php

namespace App\Http\Requests\Recipe;

use App\Models\Recipe;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return object
     */
    public function authorize()
    {
        return Auth::user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:100|unique:recipes,title',
            'method' => 'required|string|max:2000',
            'item_id' => 'required|numeric|exists:items,id',
            'user_id' => 'required|numeric|exists:users,id'
        ];
    }

    public function process($req){
        try {
            $recipe = new Recipe();

            $recipe->title = $req['title'];
            $recipe->method = $req['method'];
            $recipe->item_id = $req['item_id'];
            $recipe->user_id = $req['user_id'];
            $recipe->created_by = Auth::user()->id;
           
            $recipe->save();

            $recipes = Recipe::with(['item','user'])->orderBy('id','DESC')->paginate(config('app.pagination'));

            return ['success' => true, 'recipes' => $recipes, 'msg' => 'Recipe has been created successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
