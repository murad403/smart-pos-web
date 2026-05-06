"use client";

import { MenuItem } from "@/type/all.type";
import Image from "next/image";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const ImageListCard = ({ item }: { item: MenuItem }) => {
    const { t } = useLocalLanguage();

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex">
            {/* Image */}
            <div className="relative max-w-30 shrink-0">
                {item.image && (
                    <Image src={item.image} alt={item.name} width={500} height={500} className="object-cover" />
                )}
                <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                    {t.promo} 10% OFF
                </span>
                {item.labels?.includes("Must Try") && (
                    <span className="absolute top-1.5 right-1.5 bg-green-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                        {t.mustTry}
                    </span>
                )}
            </div>
            {/* Info */}
            <div className="p-2.5 flex flex-col justify-between flex-1">
                <div className="flex items-center justify-between mt-0.5">
                    <p className="text-base md:text-lg font-bold text-red-500 truncate max-w-50">{item.name}</p>
                    <p className="text-base md:text-lg font-semibold text-gray-800">Rp{item.price.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs md:text-sm text-gray-500">
                    <span>{t.inventory}: {item.inventory}</span>
                    <span>{t.stock}: {item.stock}</span>
                    <span>{item.status === "On the menu" ? t.onTheMenu : item.status}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    {t.promoPrice}: <span className="font-medium text-gray-700">Rp{(item.promoPrice ?? 0).toLocaleString("id-ID")}</span>
                </p>
            </div>
        </div>
    )
}
export default ImageListCard;