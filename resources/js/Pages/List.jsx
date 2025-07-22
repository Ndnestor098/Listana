import AddingProductModal from '@/Components/Modals/AddingProductModal';
import FilterTextModal from '@/Components/Modals/FilterTextModal';
import PurchaseProgressBar from '@/Components/Modals/PurchaseProgressBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Check, Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function List({ list }) {
    const [products, setProducts] = useState(list.products);
    const [showAgregarModal, setShowAgregarModal] = useState(false);
    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        x: 0,
        y: 0,
        productId: null,
    });
    const [editProduct, setEditProduct] = useState();
    const contextMenuRef = useRef(null);
    const timerRef = useRef(null);

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

    const handleChangeStatus = async (id, value, retries = 5) => {
        try {
            await axios.post(route('products.partial-update', id), {
                status: value,
            });
        } catch (error) {
            if (error.code === 'ERR_NETWORK' && retries > 0) {
                console.warn(
                    `Network error, reintentando... (${4 - retries}/3)`,
                );

                setTimeout(() => {
                    handleChangeStatus(id, value, retries - 1);
                }, 5000);
            } else {
                console.error('Error al cambiar el estado:', error);
            }
        }
    };

    const handleDelete = async (id, retries = 5) => {
        try {
            await axios.post(route('products.destroy', { product: id }));
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            if (error.code === 'ERR_NETWORK' && retries > 0) {
                console.warn(
                    `Network error, reintentando... (${4 - retries}/3)`,
                );

                setTimeout(() => {
                    handleDelete(id, value, retries - 1);
                }, 5000);
            } else {
                console.error('Error al eliminar el producto:', error);
                console.error(error);
            }
        }
    };

    const handleEdit = (id) => {
        setEditProduct(products.find((p) => p.id === id));
        setShowAgregarModal(true);
    };

    const handleRightClick = (eOrCoords, productId) => {
        if (eOrCoords.preventDefault) {
            eOrCoords.preventDefault();
        }

        setContextMenu({
            isOpen: true,
            x: eOrCoords.clientX,
            y: eOrCoords.clientY,
            productId: productId,
        });
    };

    const handleTouchStart = (e, productId) => {
        // Clona los valores que necesitas antes de que el event se limpie
        const touchEvent = {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY,
        };

        timerRef.current = setTimeout(() => {
            handleRightClick(touchEvent, productId);
        }, 600);
    };

    const handleTouchEnd = () => {
        // Cancela el timer si quita el dedo antes del tiempo
        clearTimeout(timerRef.current);
    };

    const handleTouchMove = () => {
        // Cancela si se mueve el dedo (no es long press)
        clearTimeout(timerRef.current);
    };

    useEffect(() => {
        if (!window.Echo) {
            console.warn('Echo no está inicializado');
            return;
        }

        const channel = window.Echo.channel('products');

        channel.error((error) => {
            console.error('Error de canal:', error);
        });

        // Escuchar evento con namespace
        channel.listen('.ProductUpdated', (e) => {
            if (e.product.deleted) {
                setProducts((prevProducts) =>
                    prevProducts.filter((p) => p.id !== e.product.id),
                );
                return;
            }
            setProducts((prevProducts) => {
                const updatedProduct = e.product;
                const exists = prevProducts.some(
                    (p) => p.id === updatedProduct.id,
                );

                if (exists) {
                    // Reemplaza el producto existente
                    return prevProducts.map((product) =>
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product,
                    );
                } else {
                    // Agrega el nuevo producto al inicio de la lista (o al final, según tu lógica)
                    return [updatedProduct, ...prevProducts];
                }
            });
        });

        return () => {
            window.Echo.leaveChannel('products');
        };
    }, []);

    const completed = products.filter((p) => p.status === 'bought').length;
    const total = products.length;

    return (
        <AuthenticatedLayout>
            <Head
                title={`${list.name} - Lista de Compras | Listana`}
                description={`Consulta o edita tu lista "${list.name}". Revisa productos añadidos, colabora con otros usuarios y lleva el control de tus compras en Listana.`}
            />

            <div
                onClick={() => {
                    setContextMenu({ ...contextMenu, isOpen: false });
                }}
                className="space-y-6"
            >
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
                        {products.map((product) => {
                            const formattedPrice =
                                typeof product.unit_price === 'number'
                                    ? product.unit_price.toFixed(2)
                                    : parseFloat(
                                          product.unit_price || 0,
                                      ).toFixed(2);

                            return (
                                <div
                                    key={product.id}
                                    className={`flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between ${
                                        product.status != 'pending'
                                            ? 'bg-emerald-50'
                                            : ''
                                    }`}
                                    onContextMenu={(e) =>
                                        handleRightClick(e, product.id)
                                    }
                                    onTouchStart={(e) =>
                                        handleTouchStart(e, product.id)
                                    }
                                    onTouchEnd={handleTouchEnd}
                                    onTouchMove={handleTouchMove}
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                toggleProducts(product.id)
                                            }
                                            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                                product.status != 'pending'
                                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                                    : 'border-gray-300 hover:border-emerald-400'
                                            }`}
                                        >
                                            {product.status != 'pending' && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>

                                        <div
                                            className="flex-1 cursor-pointer"
                                            onClick={() =>
                                                toggleProducts(product.id)
                                            }
                                        >
                                            <h3
                                                className={`font-medium ${
                                                    product.status != 'pending'
                                                        ? 'text-gray-500 line-through'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {product.category ||
                                                    'Sin Categoria'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-4">
                                        <div className="relative flex items-center text-right">
                                            <span
                                                className={`w-20 border-none bg-transparent py-0 text-sm font-semibold ${
                                                    product.status != 'pending'
                                                        ? 'text-gray-500'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                Count:
                                            </span>
                                            <span
                                                className={`ml-2 w-24 border-none bg-transparent py-0 text-start font-semibold ${
                                                    product.status != 'pending'
                                                        ? 'text-gray-500'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {product.quantity}
                                            </span>
                                        </div>

                                        <div className="relative flex items-center text-right">
                                            <span
                                                className={`w-20 border-none bg-transparent py-0 text-sm font-semibold ${
                                                    product.status != 'pending'
                                                        ? 'text-gray-500'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                Price:
                                            </span>
                                            <span
                                                className={`ml-2 w-24 border-none bg-transparent py-0 text-start font-semibold ${
                                                    product.status != 'pending'
                                                        ? 'text-gray-500'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {formattedPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

                {/* Menú contextual */}
                {contextMenu.isOpen && (
                    <div
                        ref={contextMenuRef}
                        className="fixed z-50 min-w-[120px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                        style={{
                            left: contextMenu.x,
                            top: contextMenu.y,
                        }}
                    >
                        <button
                            onClick={() => handleEdit(contextMenu.productId)}
                            className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50"
                        >
                            <Edit2 size={16} />
                            <span>Editar</span>
                        </button>
                        <button
                            onClick={() => handleDelete(contextMenu.productId)}
                            className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                            <span>Eliminar</span>
                        </button>
                    </div>
                )}
            </div>

            <AddingProductModal
                id={list.id}
                editProduct={editProduct}
                isOpen={showAgregarModal}
                onClose={() => {
                    setShowAgregarModal(false);
                    setEditProduct(null);
                }}
            />
        </AuthenticatedLayout>
    );
}
