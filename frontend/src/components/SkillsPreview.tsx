import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillGroups } from "./Skills";
import type { SkillLevel } from "./Skills";
import { useT } from "../i18n/LanguageContext";

/**
 * Extracts the top N skills (by level) across all skill groups.
 */
function getTopSkills(n: number): SkillLevel[] {
  const allSkills = skillGroups.flatMap((group) => group.skills);
  const sorted = [...allSkills].sort((a, b) => b.level - a.level);
  return sorted.slice(0, n);
}

function SkillCard({ skill, animate }: { skill: SkillLevel; animate: boolean }) {
  const widthPercent = skill.level * 10; // level 1-10 → 10%-100%

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {skill.name}
        </span>
        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tabular-nums">
          {skill.level}/10
        </span>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-600 dark:bg-teal-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${widthPercent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function SkillsPreview() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useT();
  const topSkills = getTopSkills(6);

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2
        className="
          text-2xl sm:text-3xl font-bold text-center mb-10
          text-zinc-900 dark:text-zinc-100
        "
      >
        {t.coreSkills}
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {topSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} animate={isVisible} />
        ))}
      </div>
    </section>
  );
}

export default SkillsPreview;
