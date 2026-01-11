import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="h-5 flex items-center justify-center">
          <a href="./">
            <img
              src="/miLogo.png"
              alt="Mi Logo"
              className="w-20 h-15 object-contain rounded-[2rem] "
            />
          </a>
        </div>

        <nav>
          <Link
            to="/"
            className="mr-4 text-sm px-3 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="mr-4 text-sm px-3 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
          >
            Projects
          </Link>
          <Link
            to="/about"
            className="mr-4 text-sm px-3 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
          >
            About
          </Link>
          <Link
            to="contact"
            className="text-sm px-3 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-4 text-center">
        © 2026 Juan David — React & TypeScript
      </footer>
    </div>
  );
};

export default Layout;
