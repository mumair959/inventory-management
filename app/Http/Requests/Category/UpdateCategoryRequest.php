<?php

namespace App\Http\Requests\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateCategoryRequest extends FormRequest
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
            'title' => 'required|string|max:100|unique:categories,title,'.request()->id,
            'parent_id' => 'sometimes|nullable|numeric|exists:categories,id'
        ];
    }

    public function process($req){
        try {
            $category = Category::find($req['id']);

            if (empty($category)) {
                return ['error' => true, 'msg' => 'No record found'];
            }

            $category->title = $req['title'];
            $category->parent_id = empty($req['parent_id']) ? $category->parent_id : $req['parent_id'];
            $category->save();

            $categories = Category::with('parent')->orderBy('id','DESC')->paginate(config('app.pagination'));
            return ['success' => true, 'categories' => $categories, 'msg' => 'Category has been updated successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
