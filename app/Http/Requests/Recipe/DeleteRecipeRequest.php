<?php

namespace App\Http\Requests\Recipe;

use App\Models\Recipe;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteRecipeRequest extends FormRequest
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
            //
        ];
    }

    public function process($id){
        $recipe = Recipe::find($id);
        $recipe->deleted_by = Auth::user()->id;
        $recipe->save();
        $recipe->delete();
        
        $recipes = Recipe::with(['item','user'])->orderBy('id','DESC')->paginate(config('app.pagination'));
        
        return ['success' => true, 'recipes' => $recipes, 'msg' => 'Item modifier has been deleted successfully'];
    }
}
