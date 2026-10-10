"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { t } from "@/content/site";
import { useDarkMode } from "@/hooks/useDarkMode";

const NAV_ITEMS = [
  { href: "/", label: t.nav.home },
  { href: "/projects", label: t.nav.projects },
  { href: "/about", label: t.nav.about },
  { href: "/contact", label: t.nav.contact },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const { isDark, toggle } = useDarkMode();

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-lg transition-colors ${
      isActive(pathname, href)
        ? "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300"
        : "text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg
            viewBox="0 0 36 36"
            className="w-9 h-9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="JDV Logo"
          >
            <ellipse cx="18" cy="10" rx="9" ry="7.5" className="fill-teal-600 dark:fill-teal-500" />
            <circle cx="14.5" cy="8" r="1.3" className="fill-white" />
            <circle cx="21.5" cy="8" r="1.3" className="fill-white" />
            <path
              d="M10 16.5 Q 8 24 10 28"
              className="stroke-teal-600 dark:stroke-teal-500"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M13.5 17 Q 12.5 25 13.5 30"
              className="stroke-teal-600 dark:stroke-teal-500"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M18 17.5 Q 18 27 18 31"
              className="stroke-teal-600 dark:stroke-teal-500"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M22.5 17 Q 23.5 25 22.5 30"
              className="stroke-teal-600 dark:stroke-teal-500"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M26 16.5 Q 28 24 26 28"
              className="stroke-teal-600 dark:stroke-teal-500"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-lg font-extrabold tracking-tighter">
            <span className="text-teal-600 dark:text-teal-400">jd</span>
            <span className="text-zinc-800 dark:text-zinc-200">val</span>
            <span className="text-teal-600 dark:text-teal-400">mart</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label={isDark ? t.darkMode.light : t.darkMode.dark}
          >
            {isDark ? "☀" : "☾"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="ml-1 p-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label={isDark ? t.darkMode.light : t.darkMode.dark}
          >
            {isDark ? "☀" : "☾"}
          </button>
        </nav>
      </div>

      {open && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={linkClass(href)}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
