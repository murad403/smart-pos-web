"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import banner from "@/assets/logo/banner.jpg";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const CustomerWelcome = () => {
  const { t } = useLocalLanguage();

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner}
        alt="Restaurant banner"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          {t.welcome}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-8">
          SmartPOS Restaurant
        </h2>
        <Link
          href="/customer/select-order-type"
          className="flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all shadow-lg text-sm sm:text-base"
        >
          <UtensilsCrossed size={18} />
          {t.startOrder}
        </Link>
      </div>
    </div>
  );
};

export default CustomerWelcome;