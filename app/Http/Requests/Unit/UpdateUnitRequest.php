<?php

namespace App\Http\Requests\Unit;

use App\Models\Unit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateUnitRequest extends FormRequest
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
            'parent_id' => 'sometimes|nullable|numeric|exists:categories,id',
            'parent_fraction' => 'sometimes|nullable|numeric'
        ];
    }

    public function process($req){
        try {
            $unit = Unit::find($req['id']);

            if (empty($unit)) {
                return ['error' => true, 'msg' => 'No record found'];
            }

            $unit->title = $req['title'];
            $unit->parent_id = empty($req['parent_id']) ? $unit->parent_id : $req['parent_id'];
            $unit->parent_fraction = empty($req['parent_fraction']) ? $unit->parent_fraction : $req['parent_fraction'];
            $unit->save();

            $units = Unit::with('parent')->orderBy('id','DESC')->paginate(config('app.pagination'));

            return ['success' => true, 'units' => $units, 'msg' => 'Unit has been updated successfully'];

        } catch (\Exception $ex) {
            return ['error' => true, 'msg' => $ex->getMessage()];
        }
    }
}
