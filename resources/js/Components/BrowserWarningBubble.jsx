import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function BrowserWarningBubble() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {/* Floating Bubble Button */}
            <button
                onClick={toggleVisibility}
                className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all duration-200 hover:bg-amber-600 hover:shadow-xl lg:bottom-6 lg:right-6"
                aria-label="Advertencia sobre extensiones del navegador"
            >
                <AlertTriangle className="h-6 w-6" />
            </button>

            {/* Warning Message Modal */}
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={toggleVisibility}
                            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Warning Icon */}
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                            <AlertTriangle className="h-8 w-8 text-amber-500" />
                        </div>

                        {/* Warning Message */}
                        <div className="text-center">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                Advertencia del Navegador
                            </h3>
                            <p
                                className="leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: '⚠️ Si desaparece las listas, es que una extensión del navegador puede estar interfiriendo con la funcionalidad de la página. Si ves comportamiento extraño, intenta <strong>recargar la página</strong> o usar el sitio en modo incógnito.',
                                }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-600"
                            >
                                Recargar Página
                            </button>
                            <button
                                onClick={toggleVisibility}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
