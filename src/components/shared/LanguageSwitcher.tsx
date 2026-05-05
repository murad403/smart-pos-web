"use client";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLocalLanguage();

  return (
    <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-0.5 md:p-1 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.55)]">
      <button
        onClick={() => setLanguage("EN")}
        className={`min-w-11 rounded-xl px-3 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 ${language === "EN" ? "bg-[#2f6de3] text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
          }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ID")}
        className={`min-w-11 rounded-xl px-3 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 ${language === "ID" ? "bg-[#2f6de3] text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
          }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;