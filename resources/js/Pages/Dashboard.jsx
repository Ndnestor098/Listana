import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { List, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        {
            label: 'Listas Activas',
            value: '3',
            icon: List,
            color: 'text-emerald-500',
        },
        {
            label: 'Productos Pendientes',
            value: '12',
            icon: ShoppingCart,
            color: 'text-blue-500',
        },
        {
            label: 'Compras Completadas',
            value: '8',
            icon: Package,
            color: 'text-purple-500',
        },
        {
            label: 'Ahorro del Mes',
            value: '$150',
            icon: TrendingUp,
            color: 'text-green-500',
        },
    ];

    const recentLists = [
        {
            name: 'Supermercado Semanal',
            items: 15,
            completed: 8,
            date: '2024-01-15',
        },
        {
            name: 'Farmacia',
            items: 3,
            completed: 3,
            date: '2024-01-14',
        },
        {
            name: 'Verdulería',
            items: 8,
            completed: 5,
            date: '2024-01-13',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Resumen de tu actividad de compras
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600">
                        <Plus className="h-4 w-4" />
                        Nueva Lista
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            {stat.label}
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <Icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Lists */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Listas Recientes
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentLists.map((list, index) => (
                                <div
                                    key={index}
                                    className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {list.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {list.completed} de {list.items}
                                            productos completados
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                list.date,
                                            ).toLocaleDateString()}
                                        </p>
                                        <div className="mt-1 h-2 w-20 rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                                                style={{
                                                    width: `${(list.completed / list.items) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
