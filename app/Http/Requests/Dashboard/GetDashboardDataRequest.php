<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Category;
use App\Models\Item;
use App\Models\Recipe;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class GetDashboardDataRequest extends FormRequest
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
        $items = Item::count();
        $recipes = Recipe::count();
        $categories = Category::count();
        $users = User::count();
        
        return ['success' => true, 'items' => $items, 'users' => $users, 'categories' => $categories, 'recipes' => $recipes];

    }
}
