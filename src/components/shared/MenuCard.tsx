"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import useLocalLanguage from "@/hooks/useLocalLanguage";

export interface MenuItem {
  id: string;
  itemNumber: string;
  name: string;
  price: number;
  promoPrice?: number;
  inventory: number;
  stock: number;
  image: StaticImageData | string;
  isPromo?: boolean;
  promoPercent?: number;
  isMustTry?: boolean;
  status: string;
}

interface MenuCardProps {
  item: MenuItem;
  isSelected?: boolean;
  onSelect?: (item: MenuItem) => void;
}

const MenuCard = ({ item, isSelected, onSelect }: MenuCardProps) => {
  const { t } = useLocalLanguage();

  return (
    <div
      onClick={() => onSelect?.(item)}
      className={`relative bg-white rounded-xl overflow-hidden shadow-sm border-2 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
        isSelected ? "border-blue-500" : "border-transparent"
      }`}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {item.isPromo && item.promoPercent && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {t.promo} {item.promoPercent}% OFF
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2 z-10">
        {item.isMustTry && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {t.mustTry}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full h-36 sm:h-40 bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-[11px] text-red-500 font-semibold">Item # {item.itemNumber}</p>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <p className="text-red-500 font-bold text-sm leading-tight truncate">{item.name}</p>
          <p className="text-gray-900 font-semibold text-sm whitespace-nowrap">
            Rp{item.price.toLocaleString("id-ID")}
          </p>
        </div>
        <p className="text-[11px] text-gray-500 mt-1">
          {t.inventory}: {item.inventory} &nbsp; {t.stock}: {item.stock}
        </p>
        <p className="text-[11px] text-gray-500">{item.status}</p>
        {item.promoPrice && (
          <p className="text-[11px] text-gray-500 mt-0.5">
            {t.promoPrice}: Rp{item.promoPrice.toLocaleString("id-ID")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuCard;