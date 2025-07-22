import { Search, Trash } from 'lucide-react';
import { useState } from 'react';

export default function FilterTextModal({ setProducts, list }) {
    const [data, setData] = useState('');

    const handleFilter = (e) => {
        let value = e.target.value.toLowerCase();
        setData(value);
        if (value.length > 2) {
            setProducts(
                list.products.filter((p) =>
                    p.name.toLowerCase().includes(value),
                ),
            );
        } else {
            setProducts(list.products);
        }
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    onChange={handleFilter}
                    onKeyDown={handleFilter}
                    value={data}
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                />
                <Trash
                    onClick={() => {
                        setProducts(list.products);
                        setData('');
                    }}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-red-400"
                />
            </div>
        </div>
    );
}
