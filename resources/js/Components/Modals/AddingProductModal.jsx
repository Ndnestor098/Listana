import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function AgregarProductoModal({ isOpen, onClose }) {
    const { data, setData, post } = useForm({
        nombre: '',
        categoria: '',
        cantidad: 1,
        nota: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setData({
            ...data,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        });
    };

    if (!isOpen) return null;

    console.log('Datos del formulario:', data);

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
                            name="nombre"
                            value={data.nombre}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Ej: Leche entera 1L"
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
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            name="cantidad"
                            value={data.cantidad}
                            onChange={handleChange}
                            min="1"
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nota (opcional)
                        </label>
                        <textarea
                            name="nota"
                            value={data.nota}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Marca específica, tamaño, etc."
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
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
