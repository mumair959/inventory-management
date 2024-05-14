<?php

namespace App\Http\Requests\ItemVariation;

use App\Models\ItemVariation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeleteItemVariationRequest extends FormRequest
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
        $variation_attached = DB::table('item_variation_item')
        ->where('item_variation_id',$id)->count();

        if ($variation_attached > 0) {
            return ['error' => true, 'msg' => 'This item variation cannot be deleted'];
        }
        
        $item_variation = ItemVariation::find($id);
        $item_variation->delete();
        $item_variations = ItemVariation::orderBy('id','DESC')->paginate(config('app.pagination'));
        return ['success' => true, 'item_variations' => $item_variations, 'msg' => 'Item Variation has been deleted successfully'];
    }
}
