import { useState, useEffect, type ReactNode } from "react";
import { translations, type Lang } from "./translations";
import { LanguageContext } from "./LanguageContextType";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang");
    return stored === "es" ? "es" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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