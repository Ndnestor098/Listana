import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Bell,
    ChevronRight,
    LogOut,
    Palette,
    Shield,
    User,
} from 'lucide-react';

export default function Configuracion() {
    const configSections = [
        {
            title: 'Perfil',
            items: [
                { icon: User, label: 'Información Personal', description: 'Nombre, email, foto de perfil' },
                { icon: Bell, label: 'Notificaciones', description: 'Recordatorios y alertas' },
            ],
        },
        {
            title: 'Aplicación',
            items: [
                { icon: Palette, label: 'Tema', description: 'Modo claro, oscuro o automático' },
                { icon: Shield, label: 'Privacidad', description: 'Configuración de datos y privacidad' },
            ],
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
                <p className="text-gray-600">Personaliza tu experiencia en la aplicación</p>
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">Usuario</h3>
                    <p className="text-gray-600">usuario@email.com</p>
                    <p className="text-sm text-emerald-600 mt-1">Cuenta Premium</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Editar
                </button>
                </div>
            </div>

            {/* Configuration Sections */}
            {configSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                        <button
                        key={itemIndex}
                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                        >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                            <h3 className="font-medium text-gray-900">{item.label}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                    );
                    })}
                </div>
                </div>
            ))}

            {/* Logout Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full p-6 flex items-center justify-between hover:bg-red-50 transition-colors text-left group">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <LogOut className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                    <h3 className="font-medium text-red-600">Cerrar Sesión</h3>
                    <p className="text-sm text-gray-600">Salir de tu cuenta</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-red-400" />
                </button>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
