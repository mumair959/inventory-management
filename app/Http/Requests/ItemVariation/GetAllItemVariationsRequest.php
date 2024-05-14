<?php

namespace App\Http\Requests\ItemVariation;

use App\Models\ItemVariation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetAllItemVariationsRequest extends FormRequest
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

    public function process(){
        $item_variations = ItemVariation::orderBy('id','DESC')->paginate(config('app.pagination'));
        
        return ['success' => true, 'item_variations' => $item_variations];

    }
}
