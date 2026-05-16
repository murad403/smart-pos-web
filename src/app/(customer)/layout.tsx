"use client";
import CustomerNavbar from "@/components/shared/CustomerNavbar";
import { usePathname } from "next/navigation";
import React from "react";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const isVisible = pathName.includes("/customer-welcome") || pathName.includes("/customer/select-order-type");
  // console.log(isVisible);
  return (
    <section className="min-h-screen bg-[#FAF8F2]">
      {/* Customer Navbar */}
      {
        !isVisible && <CustomerNavbar />
      }

      <div className={`${isVisible ? "pt-0 pb-0" : "pt-18 pb-24 md:pb-0"}`}>
        {children}
      </div>
    </section>
  );
};

export default CustomerLayout;