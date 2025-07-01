import { User, Bell, Shield, Palette, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import EditarPerfilModal from './modals/EditarPerfilModal';
import ConfirmacionModal from './modals/ConfirmacionModal';

export default function Configuracion() {
  const [showEditarPerfilModal, setShowEditarPerfilModal] = useState(false);
  const [showConfirmacionModal, setShowConfirmacionModal] = useState(false);

  const configSections = [
    {
      title: 'Perfil',
      items: [
        { 
          icon: User, 
          label: 'Información Personal', 
          description: 'Nombre, email, foto de perfil',
          action: () => setShowEditarPerfilModal(true)
        },
        { 
          icon: Bell, 
          label: 'Notificaciones', 
          description: 'Recordatorios y alertas',
          action: () => console.log('Abrir notificaciones')
        },
      ]
    },
    {
      title: 'Aplicación',
      items: [
        { 
          icon: Palette, 
          label: 'Tema', 
          description: 'Modo claro, oscuro o automático',
          action: () => console.log('Abrir tema')
        },
        { 
          icon: Shield, 
          label: 'Privacidad', 
          description: 'Configuración de datos y privacidad',
          action: () => console.log('Abrir privacidad')
        },
      ]
    }
  ];

  const handleEditarPerfil = (data: { imagen: File | null; nombre: string; email: string; password: string }) => {
    console.log('Perfil actualizado:', data);
    // Aquí implementarías la lógica para actualizar el perfil
  };

  const handleCerrarSesion = () => {
    console.log('Cerrando sesión...');
    // Aquí implementarías la lógica para cerrar sesión
    setShowConfirmacionModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Personaliza tu experiencia en la aplicación</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Usuario</h3>
            <p className="text-gray-600">usuario@email.com</p>
            <p className="text-sm text-emerald-600 mt-1">Cuenta Premium</p>
          </div>
          <button 
            onClick={() => setShowEditarPerfilModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Configuration Sections */}
      {configSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <button 
          onClick={() => setShowConfirmacionModal(true)}
          className="w-full p-6 flex items-center justify-between hover:bg-red-50 transition-colors text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-red-600">Cerrar Sesión</h3>
              <p className="text-sm text-gray-600">Salir de tu cuenta</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-red-400" />
        </button>
      </div>

      {/* Modals */}
      <EditarPerfilModal
        isOpen={showEditarPerfilModal}
        onClose={() => setShowEditarPerfilModal(false)}
        onSubmit={handleEditarPerfil}
      />

      <ConfirmacionModal
        isOpen={showConfirmacionModal}
        onClose={() => setShowConfirmacionModal(false)}
        onConfirm={handleCerrarSesion}
        titulo="Cerrar Sesión"
        mensaje="¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tu cuenta."
        textoConfirmar="Cerrar Sesión"
        textoCancel="Cancelar"
        tipo="danger"
      />
    </div>
  );
}