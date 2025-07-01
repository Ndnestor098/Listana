import { AlertTriangle } from 'lucide-react';

interface ConfirmacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancel?: string;
  tipo?: 'danger' | 'warning' | 'info';
}

export default function ConfirmacionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  titulo, 
  mensaje, 
  textoConfirmar = 'Confirmar',
  textoCancel = 'Cancelar',
  tipo = 'warning'
}: ConfirmacionModalProps) {
  if (!isOpen) return null;

  const colorClasses = {
    danger: 'text-red-600 bg-red-100',
    warning: 'text-orange-600 bg-orange-100',
    info: 'text-blue-600 bg-blue-100'
  };

  const buttonClasses = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-orange-600 hover:bg-orange-700',
    info: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[tipo]}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
              <p className="text-gray-600 mt-1">{mensaje}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {textoCancel}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${buttonClasses[tipo]}`}
            >
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}