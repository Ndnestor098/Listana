import AddingProductModal from '@/Components/Modals/AddingProductModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Check, Plus, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function List({ list }) {
    const [productos, setProductos] = useState(list.products);
    const [showAgregarModal, setShowAgregarModal] = useState(false);

    const toggleProducto = (id) => {
        setProductos(
            productos.map((p) =>
                p.id === id
                    ? {
                          ...p,
                          status: p.status === 'pending' ? 'bought' : 'pending',
                      }
                    : p,
            ),
        );
    };

    const completados = productos.filter((p) => p.status === 'bought').length;
    const total = productos.length;
    const totalPrecio = productos.reduce(
        (sum, p) => sum + p.quantity * p.unit_price,
        0,
    );
    const completadoPrecio = productos
        .filter((p) => p.status === 'bought')
        .reduce((sum, p) => sum + p.quantity * p.unit_price, 0);

    const handleFilter = (e) => {
        let value = e.target.value.toLowerCase();
        if (value.length > 2) {
            setProductos(
                list.products.filter((p) =>
                    p.name.toLowerCase().includes(value),
                ),
            );
        } else {
            setProductos(list.products);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={'List: ' + list.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {list.name}
                        </h1>
                        <p className="text-gray-600">
                            Lista {list.status} • {completados} de {total + ' '}
                            completados
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAgregarModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600"
                    >
                        <Plus className="h-4 w-4" />
                        Agregar
                    </button>
                </div>

                {/* Progress Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Progreso de Compra
                            </h3>
                            <p className="text-sm text-gray-600">
                                ${completadoPrecio.toFixed(2)} de $
                                {totalPrecio.toFixed(2)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-600">
                                {Math.round((completados / total) * 100)}%
                            </p>
                            <p className="text-sm text-gray-500">Completado</p>
                        </div>
                    </div>

                    <div className="h-3 w-full rounded-full bg-gray-200">
                        <div
                            className="h-3 rounded-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${(completados / total) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            onChange={handleFilter}
                            onKeyDown={handleFilter}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                {/* Products List */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Productos
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {productos.map((producto) => (
                            <div
                                key={producto.id}
                                className={`flex items-center gap-4 p-4 transition-colors hover:bg-gray-50 ${
                                    producto.status != 'pending'
                                        ? 'bg-emerald-50'
                                        : ''
                                }`}
                            >
                                <button
                                    onClick={() => toggleProducto(producto.id)}
                                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                        producto.status != 'pending'
                                            ? 'border-emerald-500 bg-emerald-500 text-white'
                                            : 'border-gray-300 hover:border-emerald-400'
                                    }`}
                                >
                                    {producto.status != 'pending' && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </button>

                                <div
                                    className="flex-1 cursor-pointer"
                                    onClick={() => toggleProducto(producto.id)}
                                >
                                    <h3
                                        className={`font-medium ${
                                            producto.status != 'pending'
                                                ? 'text-gray-500 line-through'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {producto.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {producto.category || 'Uncategorized'}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span
                                        className={`w-20 border-none bg-transparent py-0 text-sm font-semibold ${
                                            producto.status != 'pending'
                                                ? 'text-gray-500'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Count:
                                    </span>
                                    <input
                                        type="number"
                                        min="1"
                                        className={`w-20 cursor-pointer border-none bg-transparent py-0 font-semibold ${
                                            producto.status != 'pending'
                                                ? 'text-gray-500'
                                                : 'text-gray-900'
                                        }`}
                                        onChange={(e) => {
                                            setProductos(
                                                productos.map((p) =>
                                                    p.id === producto.id
                                                        ? {
                                                              ...p,
                                                              quantity:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : p,
                                                ),
                                            );
                                        }}
                                        defaultValue={producto.quantity}
                                        disabled={producto.status != 'pending'}
                                    />
                                </div>

                                <div className="text-right">
                                    <span
                                        className={`w-20 border-none bg-transparent py-0 text-sm font-semibold ${
                                            producto.status != 'pending'
                                                ? 'text-gray-500'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Price:
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className={`w-24 cursor-pointer border-none bg-transparent py-0 font-semibold ${
                                            producto.status != 'pending'
                                                ? 'text-gray-500'
                                                : 'text-gray-900'
                                        }`}
                                        disabled={producto.status != 'pending'}
                                        onChange={(e) => {
                                            const newPrice = parseFloat(
                                                e.target.value,
                                            );

                                            setProductos(
                                                productos.map((p) =>
                                                    p.id === producto.id
                                                        ? {
                                                              ...p,
                                                              unit_price:
                                                                  newPrice,
                                                          }
                                                        : p,
                                                ),
                                            );
                                        }}
                                        defaultValue={producto.unit_price.toFixed(
                                            2,
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Action Button */}
                <button className="fixed bottom-20 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 lg:bottom-6">
                    <ShoppingCart className="h-6 w-6" />
                </button>
            </div>

            <AddingProductModal
                id={list.id}
                isOpen={showAgregarModal}
                onClose={() => setShowAgregarModal(false)}
            />
        </AuthenticatedLayout>
    );
}
