import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-200">
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

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            {["/", "/projects", "/about", "/contact"].map((path, i) => {
              const labels = ["Home", "Projects", "About", "Contact"];
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
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-10">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
