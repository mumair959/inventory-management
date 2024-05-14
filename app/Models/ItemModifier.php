<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemModifier extends Model
{
    use HasFactory;

    /**
     * The item modifiers that belong to item.
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
