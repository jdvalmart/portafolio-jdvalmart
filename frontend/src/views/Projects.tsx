"use client";

import ProjectCard from "@/components/ProjectCard";
import { t } from "@/content/site";
import { labProjects, mainProjects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-6">
        {t.projects.title}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center mb-12">
        {t.projects.subtitle}
      </p>

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {mainProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <section className="mt-20" aria-label="Labs and experiments">
        <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-3">
          {t.projects.labsTitle}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-center mb-10">
          {t.projects.labsSubtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
