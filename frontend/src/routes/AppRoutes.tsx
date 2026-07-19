import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home.tsx";

const Projects = lazy(() => import("../pages/Projects.tsx"));
const About = lazy(() => import("../pages/About.tsx"));
const Contact = lazy(() => import("../pages/Contact.tsx"));
const Cv = lazy(() => import("../pages/Cv.tsx"));
const ChatBot = lazy(() => import("../components/ChatBot"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-teal-600 text-sm">
      Loading...
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/cv"
            element={
              <Suspense fallback={<PageLoader />}>
                <Cv />
              </Suspense>
            }
          />
          <Route
            path="/chat"
            element={
              <Suspense fallback={<PageLoader />}>
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
