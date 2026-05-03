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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/pulpo.gif"
              alt="Logo Jdvalmart"
              loading="lazy"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Jdvalmart
            </span>
          </Link>
          {/* Dark mode toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-xl p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-zinc-800"
            >
              ☰
            </button>
          </div>
          {/* Navigation  desktop*/}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {["/", "/projects", "/about", "/contact"].map((path, i) => {
              const labels = ["Home", "Projects", "About Me", "Contact"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-600"
                      : "text-zinc-700 hover:text-teal-600 transition"
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </nav>
        </div>
        {/* Menú móvil desplegable */}
        {open && (
          <nav className="md:hidden absolute right-6 top-full mt-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border border-zinc-200 dark:border-zinc-800 shadow rounded-lg">
            <div className="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
              {["/", "/projects", "/about", "/contact"].map((path, i) => {
                const labels = ["Home", "Projects", "About Me", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-600"
                        : "text-zinc-700 hover:text-teal-600 transition"
                    }
                  >
                    {labels[i]}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 px-4 md:px-6 py-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Jdvalmart. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/jdvalmart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/jdvalmart/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>

            <a
              href="mailto:juanvalencia9411@outlook.com"
              className="hover:text-white transition"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-teal-600 text-white rounded-full w-12 h-12 shadow-lg hover:bg-teal-700 transition flex items-center justify-center"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      {/* Global ChatBot widget */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Layout;
