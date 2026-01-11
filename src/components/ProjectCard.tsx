import type { Project } from "../data/projects";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <article className="bg-slate-800 rounded-xl mt-3 p-8 space-y-4">
      {/* Imagen → Netlify */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="h-40 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-45 h-50 object-contain rounded-xl backdrop-blur-md p-4 transform transition-all duration-500 hover:scale-105 hover:rotate-2"
            />
          </div>
        </a>
      ) : null}

      <h3 className="text-xl font-semibold text-white">{project.title}</h3>

      <p className="text-slate-300 text-sm">{project.description}</p>

      {/* Tecnologías */}
      <div className="flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-slate-700 text-white px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Ver demo
          </a>
        )}

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
          >
            Ver código
          </a>
        )}
      </div>
    </article>
  );
}
export default ProjectCard;
