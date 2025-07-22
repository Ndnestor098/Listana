import { useEffect, useState } from 'react';

export default function FloatingPrice({ totalPrices }) {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Si es pantalla grande (>=1024px) no hace nada
            if (window.innerWidth >= 1024) {
                setIsTop(false); // o true, según si quieres ocultarlo o mostrarlo siempre en lg
                return;
            }

            if (window.scrollY < 80) {
                setIsTop(true);
            } else {
                setIsTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll); // para detectar cambios de tamaño de ventana

        // Ejecutar una vez al montar para setear estado inicial
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed left-4 top-0 flex h-14 w-12 items-center justify-center rounded-lg bg-white shadow-lg transition-all duration-200 lg:bottom-5 lg:left-auto lg:right-6 lg:top-auto lg:h-14 lg:w-36 ${
                isTop ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="text-center">
                <p className="text-sm text-gray-700 lg:text-base">Precio</p>
                <p className="text-sm font-bold text-emerald-600 lg:text-2xl">
                    ${totalPrices.toFixed(2)}
                </p>
            </div>
        </div>
    );
}
