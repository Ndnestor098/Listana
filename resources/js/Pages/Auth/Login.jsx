import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        post(route('login'), {
            onSuccess: () => {
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Head title="Login" />
            <div className="w-full max-w-md">
                {/* Logo y Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                        <ShoppingCart className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        Bienvenido a Listana
                    </h1>
                    <p className="text-gray-600">
                        Inicia sesión para gestionar tus listas de compras
                    </p>
                </div>

                {/* Formulario de Login */}
                <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Recordar sesión y Olvidé contraseña */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Recordar sesión
                                </span>
                            </label>
                            {/* <button
                                type="button"
                                className="text-sm text-emerald-600 transition-colors hover:text-emerald-700"
                            >
                                ¿Olvidaste tu contraseña?
                            </button> */}
                        </div>

                        {/* Botón de Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center rounded-lg bg-emerald-500 py-3 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:bg-emerald-300"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">o</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Registro */}
                    <div className="text-center">
                        <p className="mb-4 text-gray-600">
                            ¿No tienes una cuenta?
                        </p>
                        <Link
                            href={route('register')}
                            className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Crear cuenta nueva
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        © 2025 Listana. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}
