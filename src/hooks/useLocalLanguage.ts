"use client";

import { useEffect, useState } from "react";
import { UI_MESSAGES, mapStoredLocaleToUILang, UILang } from "@/lib/messages";

const STORAGE_KEY = "smart-pos-locale"; // used by MainWrapper

export default function useLocalLanguage() {
  const [language, setLanguageState] = useState<UILang>("EN");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLanguageState(mapStoredLocaleToUILang(stored));
      }
    } catch {
      // ignore
    }

    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setLanguageState(mapStoredLocaleToUILang(e.newValue));
      }
    };

    const onCustom = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setLanguageState(mapStoredLocaleToUILang(stored));
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("languagechange", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("languagechange", onCustom as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, language === "ID" ? "id" : "en");
    } catch {
      // ignore
    }
  }, [hydrated, language]);

  const setLanguage = (uiLang: UILang) => {
    // write stored locale as 'en' or 'id' to match MainWrapper
    try {
      const stored = uiLang === "ID" ? "id" : "en";
      window.localStorage.setItem(STORAGE_KEY, stored);
      // notify same-tab listeners
      window.dispatchEvent(new Event("languagechange"));
      setLanguageState(uiLang);
    } catch {
      // ignore
    }
  };

  const t = UI_MESSAGES[language];

  return { t, language, setLanguage } as const;
}
