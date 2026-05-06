"use client";

import { MenuItem } from "@/type/all.type"
import Image from "next/image"
import StarRating from "./StarRating";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const ImageRowCard = ({ item }: { item: MenuItem }) => {
    const { t } = useLocalLanguage();

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="relative w-full">
                {item.image && (
                    <Image src={item.image} alt={item.name} width={500} height={500} className="object-cover h-60 rounded-t-lg" />
                )}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {t.promo} 10% OFF
                </span>
                {item.labels?.includes("Must Try") && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {t.mustTry}
                    </span>
                )}
            </div>
            <div className="p-2.5">
                <p className="text-base md:text-lg text-red-500 font-semibold">{t.itemNumberLabel} {item.itemNumber}</p>
                <div className="flex items-center justify-between mt-0.5">
                    <p className="font-bold text-red-500 truncate max-w-50 text-base md:text-lg">{item.name}</p>
                    <p className="text-sm md:text-base font-semibold text-gray-800">Rp{item.price.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs md:text-sm text-gray-500">
                    <span>{t.inventory}: {item.inventory}</span>
                    <span>{t.stock}: {item.stock}</span>
                    <span>{item.status === "On the menu" ? t.onTheMenu : item.status}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs md:text-sm text-gray-500">
                        {t.promoPrice}: <span className="font-medium text-gray-700">Rp{(item.promoPrice ?? 0).toLocaleString("id-ID")}</span>
                    </p>
                    {item.rating !== undefined && <StarRating rating={item.rating} />}
                </div>
            </div>
        </div>
    )
}

export default ImageRowCard;