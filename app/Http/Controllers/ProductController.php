<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ShoppingList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{

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

        $list = ShoppingList::find($request->list_id)->refresh();

        $list->total_products = $list->products()->count();
        $list->final_price = $list->products()->sum('unit_price');  
        $list->save();

        return response()->noContent();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
            'list_id' => 'required|exists:shopping_lists,id',
        ]);

        $product->update([
            'name' => $request->name,
            'category' => $request->category,
            'quantity' => $request->quantity,
            'notes' => $request->notes,
        ]);

        $list = ShoppingList::find($request->list_id)->refresh();

        $list->total_products = $list->products()->count();
        $list->final_price = $list->products()->sum('unit_price');
        $list->save();

        return response()->noContent();
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'nullable|integer|min:1',
            'unit_price' => 'nullable|numeric|min:0',
            'status' => 'nullable|in:pending,bought',
        ]);

        if ($request->has('unit_price')) {
            $product->update([
                'unit_price' => $request->unit_price,
            ]);
        }
        
        if ($request->has('quantity')) {
            $product->update([
                'quantity' => $request->quantity,
            ]);
        }

        if ($request->has('status')) {
            $product->update([
                'status' => $request->status,
            ]);

            $product->shoppingList()->update([
                'completed_products' => $product->shoppingList->products()->where('status', 'bought')->count(),
            ]);
        }

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
