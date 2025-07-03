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
        $lists = ShoppingList::with(['products', 'sharedUsers'])
            ->where('user_id', Auth::id())
            ->orderBy('status', 'asc')
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

        // Crear la lista sin shared_user_ids
        $list = ShoppingList::create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'name' => $request->name,
            'category' => $request->category,
            'user_id' => Auth::id(),
        ]);

        // Asociar usuarios compartidos (relación muchos-a-muchos)
        if (!empty($request->emailInput)) {
            $list->sharedUsers()->sync($request->emailInput);
        }

        return redirect()->route('my-lists.show', [
            'uuid' => $list->uuid,
        ]);
    }
    
    public function status(ShoppingList $shoppingList)
    {
        $shoppingList->update(['status' => $shoppingList->status === 'active' ? 'inactive' : 'active']);

        $lists = ShoppingList::with(['products', 'sharedUsers'])
            ->where('user_id', Auth::id())
            ->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Shopping list status updated successfully.',
            'lists' => $lists,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShoppingList $shoppingList)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shopping_lists,name,' . $shoppingList->id . ',id,user_id,' . Auth::id(),
            'category' => 'required|string|max:255',
            'emailInput' => 'array|nullable',
            'emailInput.*' => 'integer|exists:users,id',
        ]);

        // Crear la lista sin shared_user_ids
        $shoppingList->update([
            'name' => $request->name,
            'category' => $request->category,
        ]);

        // Asociar usuarios compartidos (relación muchos-a-muchos)
        if (!empty($request->emailInput)) {
            $shoppingList->sharedUsers()->sync($request->emailInput);
        }

        return redirect()->route('my-lists.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShoppingList $shoppingList)
    {
        $shoppingList->delete();

        $lists = ShoppingList::with(['products', 'sharedUsers'])
            ->where('user_id', Auth::id())
            ->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Shopping list deleted successfully.',
            'lists' => $lists,
        ]);
    }
}
