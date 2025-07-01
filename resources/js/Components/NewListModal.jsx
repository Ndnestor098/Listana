import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NewListModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const { data, setData, post } = useForm({
        name: '',
        category: '',
        emailInput: '',
    });

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('my-lists.store'), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    // Estado para manejar los emails seleccionados y el texto del input
    const [emailsSeleccionados, setEmailsSeleccionados] = useState([]);

    // Estado para manejar la visibilidad de las sugerencias de autocompletado
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Estado para manejar el texto del input de email
    const [emailText, setEmailText] = useState('');
    const [emailsFiltrados, setEmailsFiltrados] = useState([]);

    useEffect(() => {
        if (emailText.length === 0) return;

        axios
            .get(route('search-email'), {
                params: { q: emailText },
            })
            .then((res) => {
                setEmailsFiltrados(res.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, [emailText]);

    // Función para agregar un email a la lista de seleccionados
    const agregarEmail = (email) => {
        if (!emailsSeleccionados.includes(email)) {
            setEmailsSeleccionados([...emailsSeleccionados, email]);
            setData({ ...data, emailInput: [...data.emailInput, email] });
            setShowSuggestions(false);
            setEmailText('');
        }
    };

    // Función para remover un email de la lista de seleccionados
    const removerEmail = (emailToRemove) => {
        setEmailsSeleccionados(
            emailsSeleccionados.filter((email) => email !== emailToRemove),
        );
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
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
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
                            value={data.category}
                            onChange={(e) =>
                                setData({ ...data, category: e.target.value })
                            }
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

                    <div className="relative">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Compartir con (opcional)
                        </label>
                        <input
                            type="email"
                            name="emailInput"
                            value={emailText}
                            onChange={(e) => {
                                setEmailText(e.target.value);
                                setShowSuggestions(emailText.length > 0);
                            }}
                            onFocus={() =>
                                setShowSuggestions(emailText.length > 0)
                            }
                            onBlur={() =>
                                setTimeout(() => setShowSuggestions(false), 200)
                            }
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Escribe un email..."
                        />

                        {/* Sugerencias de autocompletado */}
                        {showSuggestions && emailsFiltrados.length > 0 && (
                            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-40 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                {emailsFiltrados.slice(0, 5).map((email) => (
                                    <button
                                        key={email}
                                        type="button"
                                        onClick={() => agregarEmail(email)}
                                        className="w-full border-b border-gray-100 px-3 py-2 text-left transition-colors last:border-b-0 hover:bg-emerald-50 hover:text-emerald-700"
                                    >
                                        {email}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Burbujas de emails seleccionados */}
                    {emailsSeleccionados.length > 0 && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Emails seleccionados:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {emailsSeleccionados.map((email) => (
                                    <div
                                        key={email}
                                        className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                                    >
                                        <span>{email}</span>
                                        <button
                                            type="button"
                                            onClick={() => removerEmail(email)}
                                            className="rounded-full p-1 transition-colors hover:bg-emerald-200"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
