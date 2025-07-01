import { useState } from 'react';
import { X, Filter } from 'lucide-react';

interface FiltrosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filtros: { categoria: string }) => void;
  categorias: string[];
  filtroActual?: string;
}

export default function FiltrosModal({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  categorias, 
  filtroActual = '' 
}: FiltrosModalProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(filtroActual);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters({ categoria: categoriaSeleccionada });
    onClose();
  };

  const handleClear = () => {
    setCategoriaSeleccionada('');
    onApplyFilters({ categoria: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Filtrar por Categoría
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="categoria"
                  value=""
                  checked={categoriaSeleccionada === ''}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-gray-700">Todas las categorías</span>
              </label>
              
              {categorias.map((categoria) => (
                <label 
                  key={categoria}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    name="categoria"
                    value={categoria}
                    checked={categoriaSeleccionada === categoria}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-gray-700 capitalize">{categoria}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}