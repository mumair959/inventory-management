<?php

namespace App\Http\Requests\Item;

use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetItemsListRequest extends FormRequest
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
        $items = Item::select('id','title');
        
        if (!empty(request()->id)) {
            $items = $items->where('id','<>',request()->id);
        }

        $items = $items->get()->toArray();
        
        return ['success' => true, 'items' => $items];
    }
}
