import React from "react";
import { Settings } from "lucide-react";
import RestaurantInfo from "./RestaurantInfo";
import QRCodeGenerator from "./QRCodeGenerator";
import MenuLayout from "./MenuLayout";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Page title */}
        <div className="flex items-center gap-2 mb-6">
          <Settings size={22} className="text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Restaurant Info card */}
        <RestaurantInfo />

        {/* QR Code Generator card */}
        <QRCodeGenerator />

        {/* Menu section */}
        <MenuLayout />

      </div>
    </div>
  );
};

export default SettingsPage;