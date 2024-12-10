<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = ['name','slug'];
    
    public function definitions()
    {
        return $this->hasMany(Definition::class);
    }

    public function synonyms()
    {
        return $this->hasMany(Synonym::class);
    }

    public function getRouteKeyName()
    {
        return "slug";
    }
}
