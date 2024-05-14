<?php

namespace App\Http\Requests\Item;

use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UpdateItemRequest extends FormRequest
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
            'title' => 'required|string|max:100|unique:items,title,'.request()->id,
            'categories' => 'required|array',
            'units' => 'required|array',
            'item_variations' => 'required|array',
        ];
    }

    public function process($req){
        try {
            $item = Item::find($req['id']);

            if (empty($item)) {
                return ['error' => true, 'msg' => 'No record found'];
            }

            $item->title = $req['title'];
            $item->sellable = ($req['sellable'] == 'false') ? 0 : 1;
            $item->delivable = ($req['delivable'] == 'false') ? 0 : 1;
            $item->has_variations = ($req['has_variations'] == 'false') ? 0 : 1;
            
            DB::beginTransaction();
            
            $item->save();
            $item->units()->sync($req['units']);
            $item->categories()->sync($req['categories']);
            $item->itemVariations()->sync($req['item_variations']);

            DB::commit();

            $items = Item::orderBy('id','DESC')->paginate(config('app.pagination'));
            return ['success' => true, 'items' => $items, 'msg' => 'Item variation has been updated successfully'];

        } catch (\Exception $ex) {
            DB::rollBack();
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
