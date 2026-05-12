import type { Project } from "../data/projects";
import { useT } from "../i18n/LanguageContext";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { t } = useT();

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
      <div className="h-44 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800">
        {project.id === 1 ? (
          /* Pequelectores — Open book with sparkle stars */
          <svg viewBox="0 0 200 120" className="w-44 h-24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pequelectores illustration">
            <path d="M55 15 Q100 5 145 15 L145 95 Q100 85 55 95 Z" className="fill-teal-500/20 stroke-teal-500" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="90" className="stroke-teal-400/50" strokeWidth="1" />
            <line x1="68" y1="35" x2="95" y2="32" className="stroke-teal-400/40" strokeWidth="1" />
            <line x1="68" y1="50" x2="95" y2="47" className="stroke-teal-400/40" strokeWidth="1" />
            <line x1="68" y1="65" x2="95" y2="62" className="stroke-teal-400/40" strokeWidth="1" />
            <line x1="105" y1="32" x2="132" y2="35" className="stroke-teal-400/40" strokeWidth="1" />
            <line x1="105" y1="47" x2="132" y2="50" className="stroke-teal-400/40" strokeWidth="1" />
            <line x1="105" y1="62" x2="132" y2="65" className="stroke-teal-400/40" strokeWidth="1" />
            <polygon points="160,10 162,16 168,16 163,20 165,26 160,22 155,26 157,20 152,16 158,16" className="fill-amber-400" />
            <polygon points="40,10 42,16 48,16 43,20 45,26 40,22 35,26 37,20 32,16 38,16" className="fill-amber-400" />
            <polygon points="35,60 36,64 40,64 37,66 38,70 35,68 32,70 33,66 30,64 34,64" className="fill-amber-300/60" />
            <polygon points="162,70 163,74 167,74 164,76 165,80 162,78 159,80 160,76 157,74 161,74" className="fill-amber-300/60" />
          </svg>
        ) : project.id === 2 ? (
          /* Bootcamp IA — neural network with data flow and multiple layers */
          <svg viewBox="0 0 200 120" className="w-44 h-24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bootcamp IA illustration">
            {/* Layer 1 */}
            <circle cx="30" cy="30" r="5" className="fill-teal-400/50" />
            <circle cx="30" cy="55" r="5" className="fill-teal-400/50" />
            <circle cx="30" cy="80" r="5" className="fill-teal-400/50" />
            {/* Layer 2 */}
            <circle cx="85" cy="20" r="6" className="fill-teal-500/60" />
            <circle cx="85" cy="42" r="7" className="fill-teal-600/70" />
            <circle cx="85" cy="65" r="6" className="fill-teal-500/60" />
            <circle cx="85" cy="88" r="5" className="fill-teal-400/50" />
            {/* Layer 3 */}
            <circle cx="140" cy="25" r="5" className="fill-teal-400/50" />
            <circle cx="140" cy="55" r="6" className="fill-teal-500/60" />
            <circle cx="140" cy="85" r="5" className="fill-teal-400/50" />
            {/* Connections L1→L2 */}
            <line x1="35" y1="30" x2="79" y2="22" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="35" y1="30" x2="79" y2="42" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="35" y1="55" x2="79" y2="42" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="35" y1="55" x2="79" y2="65" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="35" y1="80" x2="79" y2="65" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="35" y1="80" x2="79" y2="88" className="stroke-teal-300/30" strokeWidth="1" />
            {/* Connections L2→L3 */}
            <line x1="92" y1="42" x2="134" y2="25" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="92" y1="42" x2="134" y2="55" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="92" y1="65" x2="134" y2="55" className="stroke-teal-300/30" strokeWidth="1" />
            <line x1="92" y1="65" x2="134" y2="85" className="stroke-teal-300/30" strokeWidth="1" />
            {/* XAI overlays */}
            <circle cx="85" cy="42" r="11" className="fill-cyan-400/15 stroke-cyan-400/50" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="140" cy="55" r="10" className="fill-cyan-400/10 stroke-cyan-400/40" strokeWidth="1" strokeDasharray="3 2" />
            {/* Data badges */}
            <rect x="155" y="12" width="28" height="10" rx="3" className="fill-amber-400/60" />
            <text x="169" y="19" textAnchor="middle" className="fill-white" fontSize="6" fontWeight="bold">ML</text>
            <rect x="155" y="50" width="28" height="10" rx="3" className="fill-teal-300/60" />
            <text x="169" y="57" textAnchor="middle" className="fill-white" fontSize="5" fontWeight="bold">DL</text>
            <rect x="155" y="80" width="28" height="10" rx="3" className="fill-cyan-300/60" />
            <text x="169" y="87" textAnchor="middle" className="fill-white" fontSize="5" fontWeight="bold">NLP</text>
          </svg>
        ) : project.id === 3 ? (
          /* Book-Tracker — library management bookshelf */
          <svg viewBox="0 0 200 120" className="w-44 h-24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Book-Tracker illustration">
            <rect x="20" y="75" width="160" height="5" rx="2.5" className="fill-teal-600/80" />
            <rect x="30" y="78" width="4" height="10" className="fill-teal-600/50" />
            <rect x="166" y="78" width="4" height="10" className="fill-teal-600/50" />
            <rect x="30" y="35" width="16" height="42" rx="2" className="fill-teal-500/80" />
            <rect x="33" y="40" width="10" height="2" rx="1" className="fill-white/40" />
            <rect x="33" y="46" width="10" height="2" rx="1" className="fill-white/30" />
            <rect x="50" y="25" width="14" height="52" rx="2" className="fill-amber-400/80" />
            <rect x="53" y="32" width="8" height="2" rx="1" className="fill-white/40" />
            <rect x="68" y="20" width="18" height="57" rx="2" className="fill-cyan-400/80" />
            <rect x="72" y="28" width="10" height="2" rx="1" className="fill-white/50" />
            <rect x="72" y="34" width="10" height="2" rx="1" className="fill-white/30" />
            <rect x="90" y="30" width="15" height="47" rx="2" className="fill-zinc-400/80" />
            <rect x="93" y="38" width="9" height="2" rx="1" className="fill-white/40" />
            <rect x="93" y="44" width="9" height="2" rx="1" className="fill-white/30" />
            <rect x="110" y="24" width="14" height="53" rx="2" className="fill-teal-300/80" />
            <rect x="113" y="32" width="8" height="2" rx="1" className="fill-white/50" />
            <rect x="113" y="38" width="8" height="2" rx="1" className="fill-white/30" />
            <rect x="128" y="32" width="16" height="45" rx="2" className="fill-amber-500/80" />
            <rect x="131" y="40" width="10" height="2" rx="1" className="fill-white/40" />
            <circle cx="170" cy="15" r="14" className="fill-teal-600" />
            <polyline points="163,15 168,20 177,10" className="stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ) : null}
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
              {t.projectCard.viewDemo}
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
              {t.projectCard.codeRepo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
