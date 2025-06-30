import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    MoreVertical,
    Plus,
    Search,
    ShoppingCart,
} from 'lucide-react';
import { useState } from 'react';

export default function MyLists({ lists }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLists, setFilteredLists] = useState(lists);

    const handleFilter = () => {
        if (searchTerm.length > 2) {
            setFilteredLists(
                lists.filter((list) =>
                    list.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
        } else {
            setFilteredLists(lists);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My List" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Mis Listas
                        </h1>
                        <p className="text-gray-600">
                            Gestiona todas tus listas de compras
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600">
                        <Plus className="h-4 w-4" />
                        Nueva Lista
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleFilter}
                            value={searchTerm}
                            placeholder="Buscar listas..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    {/* <button
                        onClick={handleFilter}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                    >
                        <Search className="h-4 w-4" />
                        Buscar
                    </button> */}
                </div>

                {/* Lists Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLists.map((list) => (
                        <div
                            key={list.id}
                            className="rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {list.name}
                                            </h3>
                                            {list.activa && (
                                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                                                    Activa
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {list.category || 'Uncategorized'}
                                        </p>
                                    </div>
                                    <button className="rounded-full p-1 hover:bg-gray-100">
                                        <MoreVertical className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            Progreso
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {list.completed_products}/
                                            {list.total_products}
                                        </span>
                                    </div>

                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                                            style={{
                                                width: `${(list.completed_products / list.total_products) * 100}%`,
                                            }}
                                        ></div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                list.created_at,
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ShoppingCart className="h-4 w-4" />
                                            {list.total_products} items
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <Link
                                        href={route('my-lists.show', list.uuid)}
                                        className="block w-full rounded-lg bg-emerald-50 px-4 py-2 text-center font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                                    >
                                        Abrir Lista
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
