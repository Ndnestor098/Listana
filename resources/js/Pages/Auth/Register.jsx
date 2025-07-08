import { Head, Link, useForm } from '@inertiajs/react';
import {
    Check,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShoppingCart,
    User,
} from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        setIsLoading(true);

        post(route('register'), {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            },
        });
    };

    const passwordStrength = () => {
        const password = data.password;
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return strength;
    };

    const getStrengthColor = () => {
        const strength = passwordStrength();
        if (strength <= 1) return 'bg-red-500';
        if (strength <= 2) return 'bg-yellow-500';
        if (strength <= 3) return 'bg-blue-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = () => {
        const strength = passwordStrength();
        if (strength <= 1) return 'Débil';
        if (strength <= 2) return 'Regular';
        if (strength <= 3) return 'Buena';
        return 'Fuerte';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <Head title="Registro" />
            <div className="w-full max-w-md">
                {/* Logo y Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                        <ShoppingCart className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        Únete a Listana
                    </h1>
                    <p className="text-gray-600">
                        Crea tu cuenta y comienza a organizar tus compras
                    </p>
                </div>

                {/* Formulario de Registro */}
                <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

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
                                <p className="mt-2 text-sm text-red-500">
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
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}

                            {/* Indicador de fortaleza de contraseña */}
                            {data.password && (
                                <div className="mt-2">
                                    <div className="mb-1 flex items-center gap-2">
                                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                                style={{
                                                    width: `${(passwordStrength() / 4) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600">
                                            {getStrengthText()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Usa al menos 8 caracteres con
                                        mayúsculas, números y símbolos
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirmar Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}

                            {/* Validación de coincidencia */}
                            {data.password_confirmation && (
                                <div className="mt-2 flex items-center gap-2">
                                    {data.password ===
                                    data.password_confirmation ? (
                                        <>
                                            <Check className="h-4 w-4 text-emerald-500" />
                                            <span className="text-xs text-emerald-600">
                                                Las contraseñas coinciden
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                                            <span className="text-xs text-red-600">
                                                Las contraseñas no coinciden
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Términos y condiciones */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e) =>
                                    setAcceptTerms(e.target.checked)
                                }
                                className="mt-1 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm leading-relaxed text-gray-600"
                            >
                                Acepto los{' '}
                                <Link
                                    href={route('privacy')}
                                    className="text-emerald-600 underline hover:text-emerald-700"
                                >
                                    términos y condiciones
                                </Link>{' '}
                                y la{' '}
                                <Link
                                    href={route('privacy')}
                                    className="text-emerald-600 underline hover:text-emerald-700"
                                >
                                    política de privacidad
                                </Link>
                            </label>
                        </div>

                        {/* Botón de Registro */}
                        <button
                            type="submit"
                            disabled={isLoading || !acceptTerms}
                            className="flex w-full items-center justify-center rounded-lg bg-emerald-500 py-3 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:bg-emerald-300"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">o</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Login */}
                    <div className="text-center">
                        <p className="mb-4 text-gray-600">
                            ¿Ya tienes una cuenta?
                        </p>
                        <Link
                            href={route('login')}
                            className="w-full rounded-lg border border-gray-300 px-2 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        © 2025 Listana. Todos los derechos reservados, menos
                        los iconos.
                    </p>
                </div>
            </div>
        </div>
    );
}
