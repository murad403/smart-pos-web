"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, RefreshCw, LogOut, ChefHat, PackageSearch } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const StaffNavbar = () => {
    const pathname = usePathname();
    const { t } = useLocalLanguage();

    const isMenuActive = pathname?.includes("/staff/production");
    const isCollectionActive = pathname?.includes("/staff/collection");
    const isOrderLifeActive = pathname?.includes("/staff/order-life-cycle");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">

                {/* Logo */}
                <Link
                    href="/staff/"
                    className="flex items-center gap-2 font-bold text-gray-900 shrink-0"
                >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingCart size={16} className="text-white" />
                    </div>
                    {/* Only show brand name on md+ */}
                    <span className="hidden md:block text-sm font-bold">SmartPOS Restaurant</span>
                </Link>

                {/* Center Nav */}
                <div className="flex items-center gap-1">
                    <Link
                        href="/staff/production"
                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isMenuActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <ChefHat size={15} />
                        <span>production</span>
                    </Link>
                    <Link
                        href="/staff/collection"
                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isCollectionActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <PackageSearch size={15} />
                        <span>collection</span>
                    </Link>
                    <Link
                        href="/staff/order-life-cycle"
                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isOrderLifeActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <RefreshCw size={15} />
                        {/* Full label on sm+, abbreviated on mobile */}
                        <span className="hidden sm:inline">{t.orderLifeCycle}</span>
                        <span className="sm:hidden">Lifecycle</span>
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 shrink-0">
                    <LanguageSwitcher />
                    <Link
                        href="/auth/sign-in"
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md border border-red-100 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-100 transition-all bg-[#FEF2F2] whitespace-nowrap"
                    >
                        <LogOut size={13} className="shrink-0" />
                        {/* Show text on sm+, icon-only on mobile */}
                        <span className="hidden sm:inline">{t.logout}</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default StaffNavbar;