import type { TimelineEntry as TimelineEntryType } from "../data/timeline";
import { timeline } from "../data/timeline";
import { useScrollReveal } from "../hooks/useScrollReveal";

function TimelineItem({
  entry,
  isLast,
}: {
  entry: TimelineEntryType;
  isLast: boolean;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`
        relative pl-8 pb-10
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
      `}
    >
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-teal-200 dark:bg-teal-800" />
      )}

      {/* Dot indicator */}
      <div
        className="
          absolute left-0 top-1.5
          w-4 h-4 rounded-full
          bg-teal-600 dark:bg-teal-500
          border-2 border-white dark:border-zinc-900
          shadow-sm
        "
      />

      {/* Year badge */}
      <span
        className="
          inline-block mb-2 px-3 py-0.5
          text-xs font-bold tracking-wide uppercase
          bg-teal-50 text-teal-700
          dark:bg-teal-950 dark:text-teal-300
          rounded-full
        "
      >
        {entry.year}
      </span>

      {/* Title */}
      <h3
        className="
          text-lg font-bold mb-1.5
          text-zinc-900 dark:text-zinc-100
        "
      >
        {entry.title}
      </h3>

      {/* Description */}
      <p
        className="
          text-sm leading-relaxed
          text-zinc-600 dark:text-zinc-400
        "
      >
        {entry.description}
      </p>
    </div>
  );
}

export function Timeline() {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2
        className="
          text-2xl sm:text-3xl font-bold text-center mb-10
          text-zinc-900 dark:text-zinc-100
        "
      >
        Experience Timeline
      </h2>

      <div className="relative">
        {timeline.map((entry, index) => (
          <TimelineItem
            key={entry.year}
            entry={entry}
            isLast={index === timeline.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default Timeline;
