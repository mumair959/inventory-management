<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    /**
     * The permissions that belong to the roles.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
