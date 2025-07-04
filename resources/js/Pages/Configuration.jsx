import EditProfileModal from '@/Components/Modals/EditProfileModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, LogOut, Shield, User } from 'lucide-react';
import { useState } from 'react';

export default function Configuracion() {
    const { user } = usePage().props.auth;
    const [showEditarPerfilModal, setShowEditarPerfilModal] = useState(false);

    const configSections = [
        {
            title: 'Aplicación',
            items: [
                // {
                //     icon: Bell,
                //     label: 'Notificaciones',
                //     description: 'Recordatorios y alertas',
                // },
                {
                    icon: Shield,
                    label: 'Privacidad',
                    description: 'Configuración de datos y privacidad',
                },
            ],
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Configuración
                    </h1>
                    <p className="text-gray-600">
                        Personaliza tu experiencia en la aplicación
                    </p>
                </div>

                {/* User Profile Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </h3>
                            <p className="text-gray-600">{user.email}</p>
                            {/* <p className="mt-1 text-sm text-emerald-600">
                                Cuenta Premium
                            </p> */}
                        </div>
                        <button
                            onClick={() => setShowEditarPerfilModal(true)}
                            className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                        >
                            Editar
                        </button>
                    </div>
                </div>

                {/* Configuration Sections */}
                {configSections.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className="rounded-xl border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="border-b border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {section.title}
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {section.items.map((item, itemIndex) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={itemIndex}
                                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                                <Icon className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {item.label}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.description}
                                                </p>
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
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="group flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-red-50"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 transition-colors group-hover:bg-red-200">
                                <LogOut className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-red-600">
                                    Cerrar Sesión
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Salir de tu cuenta
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-red-400" />
                    </Link>
                </div>
            </div>

            <EditProfileModal
                isOpen={showEditarPerfilModal}
                onClose={() => setShowEditarPerfilModal(false)}
            />
        </AuthenticatedLayout>
    );
}
