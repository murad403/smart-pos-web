"use client";

import { MenuItem } from "@/type/all.type";
import useLocalLanguage from "@/hooks/useLocalLanguage";



const ListViewTable = ({ items }: { items: MenuItem[] }) => {
    const { t } = useLocalLanguage();

    return (
        <table className="w-full text-sm md:text-base">
            <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                    <th className="text-left pb-2 font-medium">ID</th>
                    <th className="text-left pb-2 font-medium">{t.itemName}</th>
                    <th className="text-right pb-2 font-medium">{t.stock}</th>
                    <th className="text-right pb-2 font-medium">{t.price}</th>
                    <th className="text-right pb-2 font-medium">{t.promoPrice}</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 text-xs text-gray-500">{item.itemNumber}</td>
                        <td className="py-2 text-xs text-gray-800 font-medium">{item.name}</td>
                        <td className="py-2 text-xs text-gray-600 text-right">{item.stock}</td>
                        <td className="py-2 text-xs text-gray-800 font-medium text-right">
                            Rp{item.price.toLocaleString("id-ID")}
                        </td>
                        <td className="py-2 text-xs text-gray-500 text-right">
                            {item.promoPrice ? `Rp${item.promoPrice.toLocaleString("id-ID")}` : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListViewTable;