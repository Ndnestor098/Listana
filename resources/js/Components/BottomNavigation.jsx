import { Link } from '@inertiajs/react';
import { Home, List, Settings } from 'lucide-react';

export default function BottomNavigation() {
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            path: route('dashboard'),
        },
        {
            id: 'my-lists.index',
            label: 'Mis Listas',
            icon: List,
            path: route('my-lists.index'),
        },
        {
            id: 'config.index',
            label: 'Configuracion',
            icon: Settings,
            path: '/config',
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-800 bg-gray-900 px-2 py-2 lg:hidden">
            <div className="flex justify-around">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current(item.id);

                    return (
                        <Link
                            key={item.id}
                            href={route(item.id)}
                            className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 transition-all duration-200 ${
                                isActive
                                    ? 'text-emerald-400'
                                    : 'text-gray-400 hover:text-emerald-300'
                            }`}
                        >
                            <Icon
                                className={`mb-1 h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}
                            />
                            <span
                                className={`text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
