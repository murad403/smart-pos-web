"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { defaultLocale, getLocaleMessages, locales, type Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

const storageKey = "smart-pos-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "id";
}

export function useAppLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useAppLocale must be used within MainWrapper");
  }

  return context;
}

const MainWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(storageKey);
      if (isLocale(storedLocale)) {
        setLocale(storedLocale);
      }
    } catch {
      // ignore
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [hydrated, locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={getLocaleMessages(locale)}>
        <div className="relative min-h-screen">
          <div className="absolute left-5 top-5 z-50">
            <div className={` ${pathName.includes("/auth") ? "inline-flex" : "hidden"} items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.55)]`}>
              {locales.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLocale(option)}
                  className={`min-w-11 rounded-xl px-3 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 ${locale === option
                    ? "bg-[#2f6de3] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                  aria-pressed={locale === option}
                  aria-label={`Switch language to ${option.toUpperCase()}`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {children}
        </div>
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};

export default MainWrapper;
