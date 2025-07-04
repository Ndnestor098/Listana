import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Cookie,
    Copyright,
    Edit,
    Eye,
    FileText,
    Lock,
    Mail,
    Shield,
} from 'lucide-react';

export default function Privacy() {
    const sections = [
        {
            id: 1,
            title: 'Responsable del Tratamiento',
            icon: Shield,
            content: [
                'Esta aplicación es desarrollada y gestionada por Listana.',
                'Para cualquier consulta relacionada con la privacidad, puedes contactarnos a través del correo electrónico: trabajo.nestor.098@gmail.com.',
            ],
        },
        {
            id: 2,
            title: 'Datos que Recopilamos',
            icon: FileText,
            content: [
                'Recopilamos únicamente los datos necesarios para el funcionamiento de la aplicación:',
                '• Nombre y correo electrónico al registrarte.',
                '• Productos y listas creadas por el usuario.',
                '• Correos electrónicos compartidos al invitar a otros usuarios.',
                '• Información técnica como dirección IP, navegador y sistema operativo.',
            ],
        },
        {
            id: 3,
            title: 'Finalidad del Tratamiento',
            icon: Eye,
            content: [
                'Usamos los datos recopilados con los siguientes fines:',
                '• Permitir el uso completo de las funcionalidades de la aplicación.',
                '• Facilitar el intercambio de listas de productos entre usuarios autorizados.',
                '• Mejorar la experiencia general del usuario.',
                '• (Opcional) Enviar notificaciones relacionadas con el uso de la aplicación.',
            ],
        },
        {
            id: 4,
            title: 'Base Legal del Tratamiento',
            icon: Lock,
            content: [
                'El tratamiento de los datos se realiza con base en:',
                '• Consentimiento explícito al registrarte y usar la aplicación.',
                '• Interés legítimo para mejorar y mantener el correcto funcionamiento del sistema.',
            ],
        },
        {
            id: 5,
            title: 'Compartición de Datos',
            icon: Shield,
            content: [
                'No compartimos tu información personal con terceros, salvo que sea requerido por ley o autoridad competente.',
            ],
        },
        {
            id: 6,
            title: 'Almacenamiento y Seguridad',
            icon: Lock,
            content: [
                'Los datos son almacenados de forma segura en nuestros servidores.',
                'Implementamos medidas técnicas y organizativas para proteger tu información y prevenir accesos no autorizados o uso indebido.',
            ],
        },
        {
            id: 7,
            title: 'Derechos del Usuario',
            icon: Edit,
            content: [
                'Puedes ejercer tus derechos en cualquier momento:',
                '• Acceder a tus datos personales.',
                '• Rectificar datos incorrectos.',
                '• Eliminar tu cuenta y datos asociados.',
                '• Retirar tu consentimiento para el tratamiento de datos.',
                '',
                'Para ello, escríbenos a: trabajo.nestor.098@gmail.com',
            ],
        },
        {
            id: 8,
            title: 'Uso de Cookies',
            icon: Cookie,
            content: [
                'Utilizamos cookies para:',
                '• Recordar tus preferencias.',
                '• Analizar el uso de la aplicación.',
                '• Mejorar la experiencia del usuario.',
                '',
                'Puedes gestionar o desactivar las cookies directamente desde tu navegador.',
            ],
        },
        {
            id: 9,
            title: 'Modificaciones',
            icon: Edit,
            content: [
                'Nos reservamos el derecho a modificar esta política.',
                'Cualquier cambio importante será notificado dentro de la aplicación. Te recomendamos revisar esta política periódicamente.',
            ],
        },
        {
            id: 10,
            title: 'Derechos de Autor',
            icon: Copyright,
            content: [
                'Todo el contenido, diseño y funcionalidad de Listana están protegidos por derechos de autor.',
                'Queda prohibida su reproducción, modificación o distribución sin autorización expresa del desarrollador.',
            ],
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Política de Privacidad" />
            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Política de Privacidad
                            </h1>
                            <div className="mt-2 flex items-center gap-2 text-emerald-100">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">
                                    Fecha de última actualización: 4 de julio de
                                    2025
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed text-emerald-100">
                        En Listana, nos tomamos muy en serio tu privacidad. Esta
                        política explica cómo recopilamos, usamos y protegemos
                        tu información personal al utilizar nuestra aplicación.
                    </p>
                </div>

                {/* Contact Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                            <Mail className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                ¿Tienes dudas sobre tu privacidad?
                            </h3>
                            <p className="text-gray-600">
                                Contáctanos en:
                                <a
                                    href="mailto:trabajo.nestor.098@gmail.com"
                                    className="ml-1 font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    trabajo.nestor.098@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Privacy Sections */}
                <div className="space-y-6">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.id}
                                className="rounded-xl border border-gray-100 bg-white shadow-sm"
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                            <Icon className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {section.id}. {section.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-3">
                                        {section.content.map(
                                            (paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className={`leading-relaxed text-gray-700 ${
                                                        paragraph.startsWith(
                                                            '•',
                                                        )
                                                            ? 'ml-4'
                                                            : ''
                                                    } ${
                                                        paragraph === ''
                                                            ? 'h-2'
                                                            : ''
                                                    } ${
                                                        paragraph.includes('@')
                                                            ? 'font-medium'
                                                            : ''
                                                    }`}
                                                >
                                                    {paragraph}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <div className="text-center">
                        <div className="mb-2 flex items-center justify-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-600" />
                            <span className="font-semibold text-gray-900">
                                Listana
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Comprometidos con la protección de tu privacidad y
                            datos personales.
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            © 2025 Listana. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
