import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home.tsx";
import Projects from "../pages/Projects.tsx";
import About from "../pages/About.tsx";
import Contact from "../pages/Contact.tsx";

const ChatBot = lazy(() => import("../components/ChatBot"));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/chat"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-pulse text-teal-600">
                      Loading AI Assistant...
                    </div>
                  </div>
                }
              >
                <ChatBot />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
