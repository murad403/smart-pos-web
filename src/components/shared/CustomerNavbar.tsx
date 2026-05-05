"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, RefreshCw, LogOut } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const CustomerNavbar = () => {
  const pathname = usePathname();
  const { t } = useLocalLanguage();

  const isMenuActive = pathname?.includes("/menu");
  const isOrderLifeActive = pathname?.includes("/order-lifecycle");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/customer/customer-welcome" className="flex items-center gap-2 font-bold text-gray-900 text-base">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart size={16} className="text-white" />
          </div>
          <span className="hidden sm:block">SmartPOS Restaurant</span>
        </Link>

        {/* Center Nav */}
        <div className="flex items-center gap-1">
          <Link
            href="/customer/menu"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isMenuActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Menu size={15} />
            <span>{t.menu}</span>
          </Link>
          <Link
            href="/customer/order-life-cycle"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isOrderLifeActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <RefreshCw size={15} />
            <span className="hidden sm:inline">{t.orderLifeCycle}</span>
            <span className="sm:hidden">Lifecycle</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/auth/sign-in"
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-gray-200 text-sm md:text-base font-medium text-red-500 hover:bg-gray-50 transition-all bg-[#FEF2F2] "
          >
            <LogOut size={14} />
            <span>{t.logout}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;