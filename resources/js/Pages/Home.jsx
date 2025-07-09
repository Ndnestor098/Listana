import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, List, Plus, Users } from 'lucide-react';

export default function Home() {
    const features = [
        {
            icon: List,
            title: 'Listas inteligentes',
            description: 'Añade productos, cantidades, precios y notas.',
        },
        {
            icon: Users,
            title: 'Compartir con otros',
            description: 'Colabora fácilmente con otros usuarios.',
        },
        {
            icon: BarChart3,
            title: 'Control de gastos',
            description: 'Monitorea tu gasto mensual y ahorro estimado.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Listana</title>
                <meta
                    name="description"
                    content="Listana es una aplicación moderna para crear, gestionar y compartir listas de compras con otros usuarios. Organiza tus productos, controla tus gastos y mejora tu experiencia al hacer compras."
                />
            </Head>

            <div className="mx-auto max-w-4xl px-4 py-12">
                {/* Header Principal */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                        👋 Bienvenido a Listana
                    </h1>
                    <p className="mb-2 text-xl text-gray-700">
                        Organiza tus compras, comparte listas y optimiza tus
                        gastos.
                    </p>
                </div>

                {/* Descripción breve */}
                <div className="mb-16 text-center">
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                        Listana es tu asistente personal para compras. Crea
                        listas, invita a familiares o amigos y mantén un
                        registro de tus gastos con estadísticas claras y
                        actualizadas.
                    </p>
                </div>

                {/* Características destacadas */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                        <Icon className="h-8 w-8 text-emerald-500" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="mb-16 text-center">
                    <Link
                        href={route('my-lists.index')}
                        className="inline-flex items-center gap-3 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 hover:shadow-xl"
                    >
                        <Plus className="h-6 w-6" />
                        Crear mi primera lista
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                {/* Sección adicional - Vista previa de funcionalidades */}
                <div className="mb-12 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            ¿Cómo funciona Listana?
                        </h2>
                        <p className="mx-auto max-w-xl text-gray-600">
                            En solo 3 pasos tendrás tu lista de compras
                            organizada y lista para compartir.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                                1
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                Crea tu lista
                            </h3>
                            <p className="text-sm text-gray-600">
                                Añade productos con cantidades, precios y notas
                                personalizadas.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                                2
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                Comparte
                            </h3>
                            <p className="text-sm text-gray-600">
                                Invita a familiares o amigos para colaborar en
                                tiempo real.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                                3
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                Controla gastos
                            </h3>
                            <p className="text-sm text-gray-600">
                                Revisa estadísticas y mantén tu presupuesto bajo
                                control.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pie de página */}
                <footer className="py-6 text-center">
                    <p className="text-xs text-gray-400">
                        © 2025 Listana. Todos los derechos reservados, menos
                        los iconos.
                    </p>
                </footer>
            </div>
        </div>
    );
}
