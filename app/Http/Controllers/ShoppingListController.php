<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShoppingListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = ShoppingList::with('products')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MyLists', compact('lists'));
    }

    /**
     * Display the specified resource.
     */
    public function show($uuid)
    {
        $list = ShoppingList::with('products')
            ->where('uuid', $uuid)
            ->firstOrFail();

        return Inertia::render('List', [
            'list' => $list,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shopping_lists,name,NULL,id,user_id,' . Auth::id(),
            'category' => 'required|string|max:255',
            'emailInput' => 'array|nullable',
            'emailInput.*' => 'integer|exists:users,id',
        ]);

        $list = ShoppingList::create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'name' => $request->name,
            'category' => $request->category,
            'user_id' => Auth::id(),
            'shared_user_ids' => $request->emailInput ?? [],
        ]);

        return redirect()->route('my-lists.show', [
            'uuid' => $list->uuid,
        ])->with('success', 'Lista creada exitosamente');
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShoppingList $shoppingList)
    {
        //
    }
}
