import React, { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useT } from "../i18n/LanguageContext";

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "ai-ml" | "full-stack">("all");
  const { ref, isVisible } = useScrollReveal();
  const { t } = useT();

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const labels: Record<"all" | "ai-ml" | "full-stack", string> = {
    all: t.projects.all,
    "ai-ml": t.projects.aiMl,
    "full-stack": t.projects.fullStack,
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-6">
        {t.projects.title}
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center mb-10">
        {t.projects.subtitle}
      </p>

      {/* Filter buttons */}
      <div className="flex justify-center gap-2 mb-10">
        {(["all", "ai-ml", "full-stack"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === cat
                ? "bg-teal-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {labels[cat]}
          </button>
        ))}
      </div>

      {/* Projects grid with scroll reveal */}
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-500 py-16 text-lg">
            {t.projects.noProjects}
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
