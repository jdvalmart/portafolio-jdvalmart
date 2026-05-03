import type { Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useT } from "../i18n/LanguageContext";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useT();
  const featured = projects.slice(0, 3);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2
          className="
            text-2xl sm:text-3xl font-bold
            text-zinc-900
            dark:text-zinc-100
          "
        >
          {t.featured.title}
        </h2>
        <a
          href="/projects"
          className="
            group inline-flex items-center gap-1.5
            text-sm font-semibold
            text-teal-600 hover:text-teal-700
            dark:text-teal-400 dark:hover:text-teal-300
            transition-colors duration-200
          "
        >
          {t.featured.viewAll}
          <span
            className="
              inline-block
              transition-transform duration-200
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </a>
      </div>

      {/* Project Grid with scroll reveal */}
      <div
        ref={ref}
        className={`
          grid grid-cols-1 md:grid-cols-3 gap-6
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
