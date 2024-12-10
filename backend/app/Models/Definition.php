<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Definition extends Model
{
    //
    protected $fillable = ['word_id','meaning','part_of_speech','example_sentence'];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
