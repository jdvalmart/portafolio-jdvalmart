import { createContext } from "react";
import { translations, type Lang } from "./translations";

type T = (typeof translations)[Lang];

export interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);