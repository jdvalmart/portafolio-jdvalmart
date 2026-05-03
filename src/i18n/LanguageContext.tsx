import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type T = (typeof translations)[Lang];

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang");
    return stored === "es" ? "es" : "en";
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
