import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 relative bg-white/80 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/pulpo.gif"
              alt="Logo Jdvalmart"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-semibold text-zinc-900">
              Jdvalmart
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-zinc-800"
          >
            ☰
          </button>
          {/* Navigation  desktop*/}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {["/", "/projects", "/about", "/contact"].map((path, i) => {
              const labels = ["Inicio", "Proyectos", "Sobre mi", "Contacto"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600"
                      : "text-zinc-700 hover:text-indigo-600 transition"
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
          <nav className="md:hidden absolute right-6 bg-white/95 backdrop-blur border-b border-zinc-200 shadow">
            <div className="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
              {["/", "/projects", "/about", "/contact"].map((path, i) => {
                const labels = ["Inicio", "Proyectos", "Sobre mi", "Contacto"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600"
                        : "text-zinc-700 hover:text-indigo-600 transition"
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
      <main className="flex-1 px-6 py-10">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Jdvalmart. Todos los derechos
            reservados.
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
    </div>
  );
};

export default Layout;
