<?php

namespace App\Http\Requests\Unit;

use App\Models\Unit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeleteUnitRequest extends FormRequest
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
        $unit_attached = DB::table('item_unit')
        ->where('unit_id',$id)->count();

        $unit_attached2 = DB::table('recipe_ingredients')
        ->where('unit_id',$id)->count();

        $unit_attached3 = DB::table('units')
        ->where('parent_id',$id)->count();

        if ($unit_attached > 0 || $unit_attached2 > 0 || $unit_attached3 > 0) {
            return ['error' => true, 'msg' => 'This unit cannot be deleted'];
        }
        
        $unit = Unit::find($id);
        $unit->delete();
        
        $units = Unit::with('parent')->orderBy('id','DESC')->paginate(config('app.pagination'));
        return ['success' => true, 'units' => $units, 'msg' => 'Unit has been deleted successfully'];
    }
}
