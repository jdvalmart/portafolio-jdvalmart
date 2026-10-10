import { useCallback, useEffect, useState } from "react";

interface DarkModeResult {
  isDark: boolean;
  toggle: () => void;
}

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

/**
 * Dark mode hook that:
 * - Reads/writes localStorage key "theme"
 * - Syncs the <html> element's "dark" class
 * - Detects prefers-color-scheme on first visit
 * - Returns { isDark, toggle }
 *
 * SSR-safe: the initial state is `null` until mounted, so the stored
 * preference is only read on the client.
 */
export function useDarkMode(): DarkModeResult {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial =
      stored !== null
        ? stored === DARK_CLASS
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(initial);
  }, []);

  useEffect(() => {
    if (isDark === null) return;
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? DARK_CLASS : "light");
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !(prev ?? false));
  }, []);

  return { isDark: isDark ?? false, toggle };
}
