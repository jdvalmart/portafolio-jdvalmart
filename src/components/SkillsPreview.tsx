import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillGroups } from "./Skills";
import type { SkillLevel } from "./Skills";

/**
 * Extracts the top N skills (by level) across all skill groups.
 */
function getTopSkills(n: number): SkillLevel[] {
  const allSkills = skillGroups.flatMap((group) => group.skills);
  const sorted = [...allSkills].sort((a, b) => b.level - a.level);
  return sorted.slice(0, n);
}

function SkillBar({ skill, animate }: { skill: SkillLevel; animate: boolean }) {
  const widthPercent = skill.level * 10; // level 1-10 → 10%-100%

  return (
    <div className="flex items-center gap-3">
      <span
        className="
          w-28 sm:w-32 text-sm font-medium
          text-zinc-700 dark:text-zinc-300
          whitespace-nowrap
        "
      >
        {skill.name}
      </span>
      <div className="flex-1 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="
            h-full bg-teal-600 dark:bg-teal-500 rounded-full
            transition-all duration-1000 ease-out
          "
          style={{ width: animate ? `${widthPercent}%` : "0%" }}
        />
      </div>
      <span
        className="
          w-8 text-xs font-semibold text-right
          text-zinc-500 dark:text-zinc-400
          tabular-nums
        "
      >
        {skill.level}/10
      </span>
    </div>
  );
}

export function SkillsPreview() {
  const { ref, isVisible } = useScrollReveal();
  const topSkills = getTopSkills(6);

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2
        className="
          text-2xl sm:text-3xl font-bold text-center mb-10
          text-zinc-900 dark:text-zinc-100
        "
      >
        Core Skills
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {topSkills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} animate={isVisible} />
        ))}
      </div>
    </section>
  );
}

export default SkillsPreview;
