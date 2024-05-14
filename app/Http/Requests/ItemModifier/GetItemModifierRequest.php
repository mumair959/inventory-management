<?php

namespace App\Http\Requests\ItemModifier;

use App\Models\ItemModifier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetItemModifierRequest extends FormRequest
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
        $item_modifier = ItemModifier::where('id',$id)->first();

        if (empty($item_modifier)) {
            return ['error' => true, 'msg' => 'No record found'];
        }
        
        return ['success' => true, 'item_modifier' => $item_modifier];
    }
}
