<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The recipe that belong to item.
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The recipe that belong to user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
