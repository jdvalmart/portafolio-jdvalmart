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
      {/* Image area — always rendered */}
      <div className="h-44 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="
                max-h-36
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </a>
        ) : project.category === "ai-ml" ? (
          /* Neural network placeholder for AI/ML projects */
          <svg viewBox="0 0 200 100" className="w-40 h-20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AI illustration">
            <circle cx="30" cy="30" r="5" className="fill-teal-400/60" />
            <circle cx="100" cy="15" r="5" className="fill-teal-500/60" />
            <circle cx="170" cy="30" r="5" className="fill-teal-400/60" />
            <circle cx="30" cy="70" r="5" className="fill-teal-400/60" />
            <circle cx="100" cy="85" r="5" className="fill-teal-500/60" />
            <circle cx="170" cy="70" r="5" className="fill-teal-400/60" />
            <circle cx="100" cy="50" r="7" className="fill-teal-600/60" />
            <line x1="35" y1="30" x2="95" y2="20" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="105" y1="20" x2="165" y2="30" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="35" y1="35" x2="95" y2="45" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="105" y1="45" x2="165" y2="35" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="35" y1="65" x2="95" y2="55" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="105" y1="55" x2="165" y2="65" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="35" y1="70" x2="95" y2="80" className="stroke-teal-300/40" strokeWidth="1.5" />
            <line x1="105" y1="80" x2="165" y2="70" className="stroke-teal-300/40" strokeWidth="1.5" />
          </svg>
        ) : (
          /* Code/window placeholder for Full-Stack projects */
          <svg viewBox="0 0 200 100" className="w-40 h-20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Full-stack illustration">
            <rect x="25" y="15" width="150" height="70" rx="8" className="stroke-teal-400/60" strokeWidth="2" />
            <rect x="25" y="15" width="150" height="20" rx="8" className="fill-teal-400/20" />
            <circle cx="36" cy="25" r="3" className="fill-teal-400/80" />
            <circle cx="45" cy="25" r="3" className="fill-teal-500/80" />
            <circle cx="54" cy="25" r="3" className="fill-teal-300/80" />
            <rect x="33" y="45" width="30" height="4" rx="2" className="fill-teal-400/40" />
            <rect x="33" y="54" width="55" height="4" rx="2" className="fill-teal-400/30" />
            <rect x="33" y="63" width="40" height="4" rx="2" className="fill-teal-400/25" />
            <line x1="116" y1="44" x2="136" y2="44" className="stroke-teal-400/50" strokeWidth="2" strokeLinecap="round" />
            <line x1="126" y1="34" x2="126" y2="54" className="stroke-teal-400/50" strokeWidth="2" strokeLinecap="round" />
            <rect x="116" y="60" width="45" height="10" rx="3" className="fill-teal-600/50" />
            <rect x="128" y="62" width="22" height="1.5" rx="1" className="fill-white/60" />
            <rect x="128" y="65.5" width="28" height="1.5" rx="1" className="fill-white/40" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
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

        {/* Actions */}
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
