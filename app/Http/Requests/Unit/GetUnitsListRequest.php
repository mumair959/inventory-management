<?php

namespace App\Http\Requests\Unit;

use App\Models\Unit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetUnitsListRequest extends FormRequest
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
        $units = Unit::select('id','title');
        
        if (!empty(request()->id)) {
            $units = $units->where('id','<>',request()->id);
        }

        $units = $units->get()->toArray();
        
        return ['success' => true, 'units' => $units];
    }
}
