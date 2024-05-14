<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeleteCategoryRequest extends FormRequest
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
        $category_attached = DB::table('category_item')
        ->where('category_id',$id)->count();

        $category_attached2 = DB::table('units')
        ->where('parent_id',$id)->count();

        if ($category_attached > 0 || $category_attached2 > 0) {
            return ['error' => true, 'msg' => 'This category cannot be deleted'];
        }
        
        $category = Category::find($id);
        $category->delete();
        $categories = Category::with('parent')->orderBy('id','DESC')->paginate(config('app.pagination'));
        return ['success' => true, 'categories' => $categories, 'msg' => 'Category has been deleted successfully'];
    }
}
