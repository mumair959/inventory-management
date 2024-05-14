<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The categories that belong to many items.
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * The units that belong to many items.
     */
    public function units()
    {
        return $this->belongsToMany(Unit::class);
    }

    /**
     * The item variations that belong to many items.
     */
    public function itemVariations()
    {
        return $this->belongsToMany(ItemVariation::class);
    }

    /**
     * The item modifiers that belong to items.
     */
    public function itemModifiers()
    {
        return $this->hasMany(ItemModifier::class);
    }

    /**
     * The recipes that belong to items.
     */
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }
}
