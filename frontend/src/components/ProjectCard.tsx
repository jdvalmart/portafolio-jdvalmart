import Link from "next/link";

import { t } from "@/content/site";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

function initials(title: string): string {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProjectCard({ project }: Props) {
  return (
    <article
      className="
      group
      bg-white dark:bg-zinc-900
      mt-3
      border border-zinc-200 dark:border-zinc-700
      rounded-2xl
      overflow-hidden
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
    "
    >
      {/* Image area */}
      <div className="relative h-40 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800">
        <span
          className="font-display text-4xl font-bold text-teal-600/50 dark:text-teal-400/40 tracking-tight"
          aria-hidden="true"
        >
          {initials(project.title)}
        </span>
        {project.status && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300">
            {project.status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techs.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="
                text-xs
                bg-zinc-100 dark:bg-zinc-800
                text-zinc-700 dark:text-zinc-300
                px-2.5
                py-1
                rounded-full
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics badges */}
        {project.metrics && (
          <div className="flex flex-wrap gap-2">
            {project.metrics.accuracy !== undefined && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                {"\u{1F3AF}"} {project.metrics.accuracy}% {t.projectCard.accuracy}
              </span>
            )}
            {project.metrics.labCount !== undefined && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                {"\u{1F9EA}"} {project.metrics.labCount}+ {t.projectCard.labs}
              </span>
            )}
            {project.metrics.booksManaged !== undefined && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                {"\u{1F4DA}"} {project.metrics.booksManaged} {t.projectCard.books}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm
                font-medium
                px-4
                py-2
                rounded-lg
                bg-teal-600
                text-white
                hover:bg-teal-700
                transition
              "
            >
              {t.projectCard.viewDemo}
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="
              text-sm
              font-medium
              px-4
              py-2
              rounded-lg
              border
              border-zinc-300 dark:border-zinc-600
              text-zinc-700 dark:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition
            "
          >
            {t.projectCard.details}
          </Link>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm
                font-medium
                px-4
                py-2
                rounded-lg
                text-zinc-500 dark:text-zinc-400
                hover:text-teal-600 dark:hover:text-teal-400
                transition
              "
            >
              {t.projectCard.codeRepo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
