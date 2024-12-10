<?php

namespace App\Http\Controllers\Admin;

use App\Models\Plan;
use App\Models\Word;
use App\Models\Synonym;
use App\Models\Definition;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    /**
     * Admin dashboard
     */
    public function index()
    {
        $definitions = Definition::all();
        $words = Word::all();
        $synonyms = Synonym::all();
        $plans = Plan::all();
        $subscriptions = Subscription::all();
        return view('admin.dashboard')->with([
            'definitions' => $definitions,
            'words' => $words,
            'synonyms' => $synonyms,
            'plans' => $plans,
            'subscriptions' => $subscriptions
        ]);
    }

    /**
     * Display the login form
     */
    public function login()
    {
        if(!auth()->guard('admin')->check()) {
            return view('admin.login');
        }

        return redirect()->route('admin.index');
    }

     /**
     * Login the admin
     */
    public function auth(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|min:6|max:255'
        ]);

        if(auth()->guard('admin')->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $request->session()->regenerate();
            return redirect()->route('admin.index');
        }else {
            throw ValidationException::withMessages(['email' => 'These credentials do not match any of our records']);
        }
    }

    /**
     * Logout the admin
     */
    public function logout()
    {
        auth()->guard('admin')->logout();
        return redirect()->route('admin.login');
    }
}
