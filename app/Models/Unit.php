<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The unit that belong to the parent.
     */
    public function parent()
    {
        return $this->belongsTo(Unit::class,'parent_id');
    }
}
