"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, LogOut, RefreshCw } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const AdminNavbar = () => {
    const pathname = usePathname();
    const { t } = useLocalLanguage();

    const isMenuActive = pathname?.includes("/menu");

    const navLinks = [
        {
            href: "/admin/menu",
            isActive: isMenuActive,
            icon: <Menu size={15} />,
            label: t.menu,
            shortLabel: t.menu,
        },
        {
            href: "/staff/collection",
            isActive: isCollectionActive,
            icon: <PackageSearch size={15} />,
            label: t.collection,
            shortLabel: t.collection,
        },
        {
            href: "/staff/order-life-cycle",
            isActive: isOrderLifeActive,
            icon: <RefreshCw size={15} />,
            label: t.orderLifeCycle,
            shortLabel: "Lifecycle",
        },
    ];

    return (
        <>
            {/* Top Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">

                    {/* Logo */}
                    <Link
                        href="/admin/menu"
                        className="flex items-center gap-2 font-bold text-gray-900 shrink-0"
                    >
                        <div className="size-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                            <ShoppingCart size={17} className="text-white" />
                        </div>
                        <span className="hidden md:block text-sm md:text-base font-semibold">
                            SmartPOS Restaurant
                        </span>
                    </Link>

                    {/* Center Nav — hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-1">
                        {navLinks.map(({ href, isActive, icon, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {icon}
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 shrink-0">
                        <LanguageSwitcher />
                        <Link
                            href="/auth/sign-in"
                            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md border border-red-100 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-100 transition-all bg-[#FEF2F2] whitespace-nowrap"
                        >
                            <LogOut size={13} className="shrink-0" />
                            <span className="hidden sm:inline">{t.logout}</span>
                        </Link>
                    </div>

                </div>
            </nav>

            {/* Bottom Tab Bar — mobile only */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-1px_6px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-around px-2 py-2">
                    {navLinks.map(({ href, isActive, icon, shortLabel }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[11px] font-medium transition-all ${isActive
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-800"
                                }`}
                        >
                            <span
                                className={`p-1.5 rounded-lg transition-all ${isActive ? "bg-blue-50" : ""
                                    }`}
                            >
                                {icon}
                            </span>
                            <span>{shortLabel}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default AdminNavbar;