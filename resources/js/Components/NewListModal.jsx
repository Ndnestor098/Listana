import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function NewListModal({ isOpen, onClose }) {
    const { data, setData, post, } = useForm({
        name: '',
        category: '',
        shared_user_ids: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // post(route('my-lists.store'), {
        //     onSuccess: () => {
        //         onClose();
        //     },
        // });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Nueva Lista
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nombre de la Lista
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Ej: Supermercado Semanal"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            name="categoria"
                            value={data.categoria}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="Supermercado">Supermercado</option>
                            <option value="Farmacia">Farmacia</option>
                            <option value="Verdulería">Verdulería</option>
                            <option value="Carnicería">Carnicería</option>
                            <option value="Panadería">Panadería</option>
                            <option value="Ferretería">Ferretería</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Electrónicos">Electrónicos</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Compartir con (opcional)
                        </label>
                        <input
                            type="email"
                            name="compartirCon"
                            value={data.compartirCon}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="email@ejemplo.com"
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
                            Crear Lista
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
