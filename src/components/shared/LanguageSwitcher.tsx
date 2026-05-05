"use client";
import React from "react";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLocalLanguage();

  return (
    <div className="flex items-center gap-1 text-sm font-semibold">
      <button
        onClick={() => setLanguage("EN")}
        className={`px-1 py-0.5 transition-colors ${
          language === "EN" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => setLanguage("ID")}
        className={`px-1 py-0.5 transition-colors ${
          language === "ID" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;