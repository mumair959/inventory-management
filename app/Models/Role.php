<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The permissions that belong to the roles.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * The users that belong to the roles.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
