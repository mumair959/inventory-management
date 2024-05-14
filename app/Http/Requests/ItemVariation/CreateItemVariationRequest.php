<?php

namespace App\Http\Requests\ItemVariation;

use App\Models\ItemVariation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateItemVariationRequest extends FormRequest
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
            'title' => 'required|string|max:100|unique:item_variations,title'
        ];
    }

    public function process($req){
        try {
            $item_variation = new ItemVariation();

            $item_variation->title = $req['title'];
           
            $item_variation->save();

            $item_variations = ItemVariation::orderBy('id','DESC')->paginate(config('app.pagination'));

            return ['success' => true, 'item_variations' => $item_variations, 'msg' => 'Item Variation has been created successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
