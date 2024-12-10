<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WordResource;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Find words by term
     */
    public function findWordByTerm($searchTerm)
    {
        return WordResource::collection(
            Word::where('name','LIKE','%'.$searchTerm.'%')
                ->with(['synonyms','definitions'])->get()
        );
    }

    /**
     * Find a word that starts with a given character
     */
    public function findWordStartWith($character)
    {
        return WordResource::collection(
            Word::where('name','LIKE',$character.'%')
                ->with(['synonyms','definitions'])->get()
        );
    }

    /**
     * Get a random word
     */
    public function getRandomWord()
    {
        return WordResource::make(
            Word::inRandomOrder()
                ->with(['synonyms','definitions'])->first()
        );
    }
}
