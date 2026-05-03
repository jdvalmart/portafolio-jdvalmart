import type { Project } from "../data/projects";

interface Props {
  project: Project;
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
      {/* Imagen */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-zinc-50 dark:bg-zinc-800"
        >
          <div className="h-44 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="
                max-h-32
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </div>
        </a>
      )}

      {/* Contenido */}
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech) => (
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
                🎯 {project.metrics.accuracy}% accuracy
              </span>
            )}
            {project.metrics.labCount !== undefined && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                🧪 {project.metrics.labCount}+ labs
              </span>
            )}
            {project.metrics.booksManaged !== undefined && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                📚 {project.metrics.booksManaged} books
              </span>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-3 pt-2">
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
              View Demo
            </a>
          )}

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
                border
                border-zinc-300 dark:border-zinc-600
                text-zinc-700 dark:text-zinc-300
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition
              "
            >
              Code Repository
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
