import AddingProductModal from '@/Components/Modals/AddingProductModal';
import FilterTextModal from '@/Components/Modals/FilterTextModal';
import PurchaseProgressBar from '@/Components/Modals/PurchaseProgressBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

export default function List({ list }) {
    const [products, setProducts] = useState(list.products);
    const [showAgregarModal, setShowAgregarModal] = useState(false);

    const toggleProducts = (id) => {
        const updated = products.map((p) => {
            if (p.id === id) {
                const newStatus = p.status === 'pending' ? 'bought' : 'pending';

                handleChangeStatus(id, newStatus);

                return { ...p, status: newStatus };
            }
            return p;
        });

        setProducts(updated);
    };

    const handleChangeCount = async (id, value) => {
        await axios.post(route('products.update', id), {
            quantity: value,
        });
    };

    const handleChangePrice = async (id, value) => {
        await axios.post(route('products.update', id), {
            unit_price: value,
        });
    };

    const handleChangeStatus = async (id, value) => {
        await axios.post(route('products.update', id), {
            status: value,
        });
    };

    const completed = products.filter((p) => p.status === 'bought').length;
    const total = products.length;

    return (
        <AuthenticatedLayout>
            <Head
                title={`${list.name} - Lista de Compras | Listana`}
                description={`Consulta o edita tu lista "${list.name}". Revisa productos añadidos, colabora con otros usuarios y lleva el control de tus compras en Listana.`}
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {list.name}
                        </h1>
                        <p className="text-gray-600">
                            Lista {list.status} • {completed} de {total + ' '}
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
                <PurchaseProgressBar
                    products={products}
                    completed={completed}
                    total={total}
                />

                {/* Search and Filters */}
                <FilterTextModal setProducts={setProducts} list={list} />

                {/* Products List */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            productos
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {products.map((producto) => (
                            <div
                                key={producto.id}
                                className={`flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between ${
                                    producto.status != 'pending'
                                        ? 'bg-emerald-50'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            toggleProducts(producto.id)
                                        }
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
                                        onClick={() =>
                                            toggleProducts(producto.id)
                                        }
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
                                            {producto.category ||
                                                'Sin Categoria'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
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
                                                if (e.target.value < 1) {
                                                    e.target.value = 1;
                                                    return;
                                                }

                                                setProducts(
                                                    products.map((p) =>
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

                                                handleChangeCount(
                                                    producto.id,
                                                    e.target.value,
                                                );
                                            }}
                                            defaultValue={producto.quantity}
                                            disabled={
                                                producto.status != 'pending'
                                            }
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
                                            disabled={
                                                producto.status != 'pending'
                                            }
                                            onChange={(e) => {
                                                const newPrice = parseFloat(
                                                    e.target.value,
                                                );

                                                setProducts(
                                                    products.map((p) =>
                                                        p.id === producto.id
                                                            ? {
                                                                  ...p,
                                                                  unit_price:
                                                                      newPrice,
                                                              }
                                                            : p,
                                                    ),
                                                );

                                                handleChangePrice(
                                                    producto.id,
                                                    newPrice,
                                                );
                                            }}
                                            defaultValue={
                                                typeof producto.unit_price ===
                                                'number'
                                                    ? producto.unit_price.toFixed(
                                                          2,
                                                      )
                                                    : parseFloat(
                                                          producto.unit_price ||
                                                              0,
                                                      ).toFixed(2)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Action Button */}
                {window.innerWidth >= 1024 && (
                    <div className="fixed bottom-20 right-6 flex h-14 w-36 items-center justify-center rounded-lg bg-white shadow-lg transition-all duration-200 lg:bottom-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-emerald-600">
                                {Math.round((completed / total) * 100)}%
                            </p>
                            <p className="text-sm text-gray-700">Completado</p>
                        </div>
                    </div>
                )}
            </div>

            <AddingProductModal
                id={list.id}
                isOpen={showAgregarModal}
                onClose={() => setShowAgregarModal(false)}
            />
        </AuthenticatedLayout>
    );
}
