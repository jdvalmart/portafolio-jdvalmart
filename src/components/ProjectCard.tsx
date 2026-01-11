import type { Project } from "../data/projects";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <article
      className="
      group
      bg-white
      mt-3
      border border-zinc-400
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
          className="block bg-zinc-50"
        >
          <div className="h-44 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
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
        <h3 className="text-lg font-semibold text-zinc-900">{project.title}</h3>

        <p className="text-sm text-zinc-600 leading-relaxed">
          {project.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="
                text-xs
                bg-zinc-100
                text-zinc-700
                px-2.5
                py-1
                rounded-full
              "
            >
              {tech}
            </span>
          ))}
        </div>

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
                bg-indigo-600
                text-white
                hover:bg-indigo-700
                transition
              "
            >
              Ver demo
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
                border-zinc-300
                text-zinc-700
                hover:bg-zinc-100
                transition
              "
            >
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
