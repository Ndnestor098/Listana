import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function EditProfileModal({ isOpen, onClose }) {
    const user = usePage().props.auth.user;

    const { data, setData, post } = useForm({
        name: 'Usuario',
        email: 'usuario@email.com',
        password: '',
    });

    useEffect(() => {
        setData({
            name: user.name,
            email: user.email,
            password: '',
        });
    }, [user, setData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('config.update'), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Editar Perfil
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    {/* Imagen de perfil */}
                    {/* <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden">
                            {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                            <User className="h-12 w-12 text-white" />
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <Upload className="h-4 w-4 text-gray-600" />
                            <input
                            type="file"
                            name="imagen"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            />
                        </label>
                        </div>
                        <p className="text-sm text-gray-500">Haz clic en el ícono para cambiar la imagen</p>
                    </div> */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nueva Contraseña (opcional)
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Dejar vacío para mantener la actual"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
