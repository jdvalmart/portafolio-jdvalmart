import en from "./en";
import es from "./es";

export const translations = { en, es } as const;

export type Lang = "en" | "es";
export type Translations = typeof en;
