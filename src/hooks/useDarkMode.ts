import { useCallback, useEffect, useState } from "react";

interface DarkModeResult {
  isDark: boolean;
  toggle: () => void;
}

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

function getInitialDark(): boolean {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    return stored === DARK_CLASS;
  }
  // Fall back to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Dark mode hook that:
 * - Reads/writes localStorage key "theme"
 * - Syncs the <html> element's "dark" class
 * - Detects prefers-color-scheme on first visit
 * - Returns { isDark, toggle }
 */
export function useDarkMode(): DarkModeResult {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);

  // Sync the <html> class whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }
    localStorage.setItem(STORAGE_KEY, isDark ? DARK_CLASS : "light");
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
}
