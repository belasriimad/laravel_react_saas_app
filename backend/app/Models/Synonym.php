<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Synonym extends Model
{
    protected $fillable = ['word_id','similars'];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
