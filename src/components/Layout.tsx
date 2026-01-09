import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi portafolio</h1>

        <nav>
          <Link to="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link to="/projects" className="mr-4 hover:underline">
            Projects
          </Link>
          <Link to="/about" className="mr-4 hover:underline">
            About
          </Link>
          <Link to="contact" className=" hover:underline">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        2026 Juan Valencia
      </footer>
    </div>
  );
};

export default Layout;
