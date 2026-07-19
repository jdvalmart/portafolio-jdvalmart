export interface SkillLevel {
  name: string;
  level: number;
}

export interface SkillGroupData {
  title: string;
  skills: SkillLevel[];
}

const LEVELS: Record<number, string> = {
  1: "Learning",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const ringColors: Record<number, { fill: string; stroke: string }> = {
  1: { fill: "fill-zinc-200 dark:fill-zinc-700", stroke: "stroke-zinc-400 dark:stroke-zinc-500" },
  2: { fill: "fill-cyan-200 dark:fill-cyan-900", stroke: "stroke-cyan-400 dark:stroke-cyan-600" },
  3: { fill: "fill-teal-200 dark:fill-teal-900", stroke: "stroke-teal-400 dark:stroke-teal-600" },
  4: { fill: "fill-teal-300 dark:fill-teal-800", stroke: "stroke-teal-500 dark:stroke-teal-500" },
  5: { fill: "fill-teal-400 dark:fill-teal-700", stroke: "stroke-teal-600 dark:stroke-teal-400" },
};

export const skillGroups: SkillGroupData[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "NLP", level: 5 },
      { name: "Transformers", level: 4 },
      { name: "TensorFlow", level: 4 },
      { name: "LLMs", level: 4 },
      { name: "XAI", level: 4 },
      { name: "scikit-learn", level: 4 },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Python", level: 5 },
      { name: "FastAPI", level: 5 },
      { name: "Docker", level: 4 },
      { name: "PostgreSQL", level: 4 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind", level: 4 },
      { name: "Next.js", level: 2 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", level: 5 },
      { name: "CI/CD", level: 4 },
      { name: "Unix Shell", level: 4 },
    ],
  },
];

import { useT } from "../i18n/LanguageContext";

function SkillRing({ skill }: { skill: SkillLevel }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const pct = skill.level / 5;
  const offset = circumference * (1 - pct);
  const level = LEVELS[skill.level] || "";
  const colors = ringColors[skill.level] || ringColors[3];

  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14 sm:w-16 sm:h-16">
        <circle
          cx="30" cy="30" r={radius}
          fill="none"
          className="stroke-zinc-100 dark:stroke-zinc-700"
          strokeWidth="3"
        />
        <circle
          cx="30" cy="30" r={radius}
          fill="none"
          className={colors.stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 30 30)"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        <circle
          cx="30" cy="30" r={radius - 6}
          className={`${colors.fill} opacity-20 transition-opacity group-hover:opacity-40`}
        />
        <text
          x="30" y="34"
          textAnchor="middle"
          className="fill-zinc-700 dark:fill-zinc-300 text-[10px] font-bold"
          fontFamily="system-ui, sans-serif"
        >
          {level.slice(0, 4)}
        </text>
      </svg>
      <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

export const Skills = () => {
  const { t } = useT();

  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-zinc-100">
        {t.skills.title}
      </h2>

      <div className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-5 text-center">
              {group.title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
              {group.skills.map((skill) => (
                <SkillRing key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
