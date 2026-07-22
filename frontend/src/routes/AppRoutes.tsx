import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Home from "../pages/Home.tsx";

const Projects = lazy(() => import("../pages/Projects.tsx"));
const About = lazy(() => import("../pages/About.tsx"));
const Contact = lazy(() => import("../pages/Contact.tsx"));
const Cv = lazy(() => import("../pages/Cv.tsx"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail.tsx"));
const ChatBot = lazy(() => import("../components/ChatBot"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-teal-600 text-sm">
      Loading...
    </div>
  </div>
);

const RouteError = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        This section encountered an error.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition"
      >
        Reload
      </button>
    </div>
  </div>
);

function LazyRoute({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<RouteError />}>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects"
            element={
              <LazyRoute>
                <Projects />
              </LazyRoute>
            }
          />
          <Route
            path="/about"
            element={
              <LazyRoute>
                <About />
              </LazyRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <LazyRoute>
                <Contact />
              </LazyRoute>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <LazyRoute>
                <ProjectDetail />
              </LazyRoute>
            }
          />
          <Route
            path="/cv"
            element={
              <LazyRoute>
                <Cv />
              </LazyRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <LazyRoute>
                <ChatBot />
              </LazyRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
