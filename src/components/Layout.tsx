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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg
              viewBox="0 0 40 40"
              className="w-9 h-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="JDV Logo"
            >
              {/* Hexagon container */}
              <polygon
                points="20,2 37,11 37,29 20,38 3,29 3,11"
                className="fill-teal-600 dark:fill-teal-500 stroke-teal-700 dark:stroke-teal-400"
                strokeWidth="1.5"
              />
              {/* "JDV" monogram */}
              <text
                x="20"
                y="24"
                textAnchor="middle"
                className="fill-white text-[11px] font-bold"
                fontFamily="system-ui, sans-serif"
              >
                JDV
              </text>
            </svg>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              jdvalmart
            </span>
          </Link>

          {/* Dark mode toggle + mobile hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="text-lg p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "☀️" : "🌙"}
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

      {/* Footer */}
      <footer className="bg-zinc-900 dark:bg-black border-t border-zinc-800 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                  <polygon
                    points="16,1 30,9 30,23 16,31 2,23 2,9"
                    className="fill-teal-600"
                  />
                  <text
                    x="16" y="20" textAnchor="middle"
                    className="fill-white text-[9px] font-bold"
                    fontFamily="system-ui"
                  >JDV</text>
                </svg>
                <span className="text-white font-semibold text-sm">jdvalmart</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                AI Engineer & ML Engineer. NLP, Transformers, XAI.
                Construyendo el futuro con IA interpretable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { to: "/", label: "Home" },
                  { to: "/projects", label: "Projects" },
                  { to: "/about", label: "About Me" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-zinc-400 hover:text-teal-400 transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Connect</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="https://github.com/jdvalmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-teal-400 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jdvalmart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-teal-400 transition"
                >
                  LinkedIn
                </a>
                <a
                  href="https://huggingface.co/jdvalmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-teal-400 transition"
                >
                  HuggingFace
                </a>
                <a
                  href="mailto:juanvalencia9411@outlook.com"
                  className="text-zinc-400 hover:text-teal-400 transition"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Juan David Valencia. All rights reserved.</p>
            <p>
              Built with React · TypeScript · Tailwind CSS · ❤️
            </p>
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
