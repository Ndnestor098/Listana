import { Link, usePage } from '@inertiajs/react';
import { Home, List, Settings, User } from 'lucide-react';

export default function SideBar() {
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
    const user = usePage().props.auth.user;

    return (
        <div className="hidden border-r border-gray-800 bg-gray-900 lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            {/* Logo/Header */}
            <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
                <img
                    className="mr-2 h-8 w-8"
                    src="/assets/images/logo.png"
                    alt="Logotipo de Listana"
                />
                <h1 className="text-xl font-bold text-white">Listana</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-6">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current(item.id);

                    return (
                        <Link
                            href={route(item.id)}
                            key={item.id}
                            className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-emerald-400'
                            }`}
                        >
                            <Icon
                                className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-gray-800 p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                            <User className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
