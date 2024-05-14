<?php

namespace App\Http\Requests\ItemModifier;

use App\Models\ItemModifier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetAllItemModifiersRequest extends FormRequest
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
        $item_modifiers = ItemModifier::with('item')->orderBy('id','DESC')->paginate(config('app.pagination'));
        
        return ['success' => true, 'item_modifiers' => $item_modifiers];

    }
}
