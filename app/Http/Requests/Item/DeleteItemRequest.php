<?php

namespace App\Http\Requests\Item;

use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteItemRequest extends FormRequest
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
        $item = Item::find($id);

        $item->recipes()->delete();
        $item->itemModifiers()->delete();
        $item->categories()->detach();
        $item->units()->detach();
        $item->itemVariations()->detach();

        $item->delete();
        
        $items = Item::orderBy('id','DESC')->paginate(config('app.pagination'));
        return ['success' => true, 'items' => $items, 'msg' => 'Item modifier has been deleted successfully'];
    }
}
