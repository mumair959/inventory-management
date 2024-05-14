<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetCategoriesListRequest extends FormRequest
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
        $categories = Category::select('id','title');
        
        if (!empty(request()->id)) {
            $categories = $categories->where('id','<>',request()->id);
        }

        $categories = $categories->get()->toArray();
        
        return ['success' => true, 'categories' => $categories];
    }
}
