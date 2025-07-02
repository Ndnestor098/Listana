export default function PurchaseProgressBar({ productos, completados, total }) {
    const totalPrecio = productos.reduce(
        (sum, p) => sum + p.quantity * p.unit_price,
        0,
    );
    const completadoPrecio = productos
        .filter((p) => p.status === 'bought')
        .reduce((sum, p) => sum + p.quantity * p.unit_price, 0);

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">
                        Progreso de Compra
                    </h3>
                    <p className="text-sm text-gray-600">
                        ${completadoPrecio.toFixed(2)} de $
                        {totalPrecio.toFixed(2)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                        {Math.round((completados / total) * 100)}%
                    </p>
                    <p className="text-sm text-gray-500">Completado</p>
                </div>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                    className="h-3 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(completados / total) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}
