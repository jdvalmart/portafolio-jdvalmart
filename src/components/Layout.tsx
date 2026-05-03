import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const ChatBot = lazy(() => import("./ChatBot"));

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Logo — minimalist octopus */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg
              viewBox="0 0 36 36"
              className="w-9 h-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="JDV Logo"
            >
              {/* Head */}
              <ellipse cx="18" cy="10" rx="9" ry="7.5" className="fill-teal-600 dark:fill-teal-500" />
              {/* Eyes */}
              <circle cx="14.5" cy="8" r="1.3" className="fill-white" />
              <circle cx="21.5" cy="8" r="1.3" className="fill-white" />
              {/* Tentacles */}
              <path d="M10 16.5 Q 8 24 10 28" className="stroke-teal-600 dark:stroke-teal-500" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13.5 17 Q 12.5 25 13.5 30" className="stroke-teal-600 dark:stroke-teal-500" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M18 17.5 Q 18 27 18 31" className="stroke-teal-600 dark:stroke-teal-500" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M22.5 17 Q 23.5 25 22.5 30" className="stroke-teal-600 dark:stroke-teal-500" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M26 16.5 Q 28 24 26 28" className="stroke-teal-600 dark:stroke-teal-500" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-extrabold tracking-tighter">
              <span className="text-teal-600 dark:text-teal-400">jd</span>
              <span className="text-zinc-800 dark:text-zinc-200">val</span>
              <span className="text-teal-600 dark:text-teal-400">mart</span>
            </span>
          </Link>

          {/* Dark mode toggle (desktop) + mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle — mobile only (desktop toggle is in the nav bar) */}
            <button
              onClick={toggle}
              className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-xl p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Toggle menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {[
              { path: "/", label: "Home" },
              { path: "/projects", label: "Projects" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {/* Dark mode toggle — desktop, last item in nav bar */}
            <button
              onClick={toggle}
              className="ml-1 p-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <svg className="w-5 h-5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isDark ? (
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
            </button>
          </nav>
        </div>

        {/* Mobile nav dropdown */}
        {open && (
          <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
            <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
              {[
                { path: "/", label: "Home" },
                { path: "/projects", label: "Projects" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer — compact single row */}
      <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            {/* Left: Copyright */}
            <p>© 2026 Juan David Valencia</p>

            {/* Center: Built with */}
            <p>Built with React · TypeScript · Tailwind</p>

            {/* Right: Social links as text */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jdvalmart"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/jdvalmart/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://huggingface.co/jdvalmart"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                HuggingFace
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="mailto:juanvalencia9411@outlook.com"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-teal-600 text-white rounded-full w-11 h-11 shadow-lg hover:bg-teal-700 transition flex items-center justify-center"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Global ChatBot */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Layout;
