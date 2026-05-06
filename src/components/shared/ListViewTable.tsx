import { MenuItem } from "@/type/all.type";



const ListViewTable = ({ items }: { items: MenuItem[] }) => {
    return (
        <table className="w-full text-sm md:text-base">
            <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                    <th className="text-left pb-2 font-medium">ID</th>
                    <th className="text-left pb-2 font-medium">Item Name</th>
                    <th className="text-right pb-2 font-medium">Stock</th>
                    <th className="text-right pb-2 font-medium">Price</th>
                    <th className="text-right pb-2 font-medium">Promo Price</th>
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