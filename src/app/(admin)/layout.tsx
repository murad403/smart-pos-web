"use client";
import AdminNavbar from "@/components/shared/AdminNavbar";
import { usePathname } from "next/navigation";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const isVisible = pathName.includes("/admin-welcome");
    return (
        <section className="min-h-screen bg-[#FAF8F2]">
            {
                !isVisible && <AdminNavbar />
            }

            <div className={`${isVisible ? "pt-0 pb-0" : "pt-18 pb-24 md:pb-0"}`}>
                {children}
            </div>
        </section>
    );
};

export default AdminLayout;