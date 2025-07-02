<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ShoppingList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
            'list_id' => 'required|exists:shopping_lists,id',
        ]);

        Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'quantity' => $request->quantity,
            'notes' => $request->notes,
            'shopping_list_id' => $request->list_id,
            'user_id' => Auth::id(),
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
        ]);

        $list = ShoppingList::find($request->list_id);

        $list->update([
            'total_products' => $list->products()->count(),
            'total_price' => $list->products()->sum('unit_price'),
        ]);

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
