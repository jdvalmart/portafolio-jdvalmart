import { useContext } from "react";
import { LanguageContext } from "./LanguageContextType";
import type { LanguageContextValue } from "./LanguageContextType";

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}