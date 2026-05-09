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
  const displayPrice = `Rp${item.price.toLocaleString("id-ID")}`;
  const hasPromoPrice = typeof item.promoPrice === "number";

  return (
    <div
      onClick={() => onSelect?.(item)}
      className={`group relative overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] ${
        isSelected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f6f1e8]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {item.isPromo && item.promoPercent && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {t.promo} {item.promoPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 z-10">
          {item.isMustTry && (
            <span className="rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {t.mustTry}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
              Item # {item.itemNumber}
            </p>
            <h3 className="mt-1 truncate text-base font-bold text-red-500 sm:text-[15px]">
              {item.name}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-base font-semibold text-gray-900 sm:text-[15px]">
              {displayPrice}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-gray-500">
          <span>
            {t.inventory}: {item.inventory}
          </span>
          <span>
            {t.stock}: {item.stock}
          </span>
          <span>{item.status}</span>
        </div>

        {hasPromoPrice && (
          <div className="flex items-center justify-between gap-2 border-t border-dashed border-gray-100 pt-3 text-[12px] text-gray-500">
            <span className="font-medium text-gray-500">
              {t.promoPrice}: Rp{item.promoPrice!.toLocaleString("id-ID")}
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-700">
              {item.isPromo ? "Promo active" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;