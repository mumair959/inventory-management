<?php

namespace App\Http\Requests\Unit;

use App\Models\Unit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateUnitRequest extends FormRequest
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
            'title' => 'required|string|max:100|unique:units,title',
            'parent_id' => 'sometimes|nullable|numeric|exists:units,id',
            'parent_fraction' => 'sometimes|nullable|numeric'
        ];
    }

    public function process($req){
        try {
            $unit = new Unit();

            $unit->title = $req['title'];
            $unit->parent_id = empty($req['parent_id']) ? null : $req['parent_id'];
            $unit->parent_fraction = empty($req['parent_fraction']) ? 0 : $req['parent_fraction'];
           
            $unit->save();

            $units = Unit::with('parent')->orderBy('id','DESC')->paginate(config('app.pagination'));
            return ['success' => true, 'units' => $units, 'msg' => 'Unit has been created successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
