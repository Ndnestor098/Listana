import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function AgregarProductoModal({ isOpen, onClose, id }) {
    const { data, setData, errors } = useForm({
        name: '',
        category: '',
        quantity: 1,
        notes: '',
        list_id: id,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(route('products.store'), data);

            window.location.reload(); // Recargar la página para ver el nuevo producto

            // Si quieres redirigir con Inertia
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Agregar Producto
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
                            Nombre del Producto
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Ej: Leche entera 1L"
                            required
                        />
                        {errors.name && (
                            <span className="block text-center text-xs text-red-500">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Categoría (opcional)
                        </label>
                        <select
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="Lácteos">Lácteos</option>
                            <option value="Panadería">Panadería</option>
                            <option value="Frutas">Frutas</option>
                            <option value="Verduras">Verduras</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Granos">Granos</option>
                            <option value="Limpieza">Limpieza</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Congelados">Congelados</option>
                            <option value="Higiene">Higiene</option>
                            <option value="Otros">Otros</option>
                        </select>
                        {errors.category && (
                            <span className="block text-center text-xs text-red-500">
                                {errors.category}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={data.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                        {errors.quantity && (
                            <span className="block text-center text-xs text-red-500">
                                {errors.category}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nota (opcional)
                        </label>
                        <textarea
                            name="notes"
                            value={data.notes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Marca específica, tamaño, etc."
                        />
                        {errors.notes && (
                            <span className="block text-center text-xs text-red-500">
                                {errors.notes}
                            </span>
                        )}
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
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
