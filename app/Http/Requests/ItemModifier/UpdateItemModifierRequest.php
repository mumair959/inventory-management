<?php

namespace App\Http\Requests\ItemModifier;

use App\Models\ItemModifier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateItemModifierRequest extends FormRequest
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
            'id' => 'required|numeric',
            'title' => 'required|string|max:100|unique:item_modifiers,title,'.request()->id,
            'item_id' => 'required|numeric|exists:items,id',
            'price' => 'required|numeric|min:1',
            'can_multiple' => 'required'
        ];
    }

    public function process($req){
        try {
            $item_modifier = ItemModifier::find($req['id']);

            if (empty($item_modifier)) {
                return ['error' => true, 'msg' => 'No record found'];
            }

            $item_modifier->title = $req['title'];
            $item_modifier->price = $req['price'];
            $item_modifier->item_id = $req['item_id'];
            $item_modifier->can_multiple = ($req['can_multiple'] == 'false') ? 0 : 1;
            $item_modifier->save();

            $item_modifiers = ItemModifier::with('item')->orderBy('id','DESC')->paginate(config('app.pagination'));

            return ['success' => true, 'item_modifiers' => $item_modifiers, 'msg' => 'Item variation has been updated successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
