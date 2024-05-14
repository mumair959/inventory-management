<?php

namespace App\Http\Requests\Recipe;

use App\Models\Recipe;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return Auth::user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function process($id){
        $recipe = Recipe::where('id',$id)->first();

        if (empty($recipe)) {
            return ['error' => true, 'msg' => 'No record found'];
        }
        
        return ['success' => true, 'recipe' => $recipe];
    }
}
