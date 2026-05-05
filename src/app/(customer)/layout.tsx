"use client";
import CustomerNavbar from "@/components/shared/CustomerNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {/* Customer Navbar */}
      <CustomerNavbar />

      <div className="pt-14">
        {children}
      </div>
    </section>
  );
};

export default layout;