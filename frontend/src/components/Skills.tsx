export interface SkillLevel {
  name: string;
  level: number;
}

export interface SkillGroupData {
  title: string;
  skills: SkillLevel[];
}

export const skillGroups: SkillGroupData[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "NLP", level: 6 },
      { name: "Transformers", level: 5 },
      { name: "TensorFlow", level: 5 },
      { name: "XAI", level: 5 },
      { name: "scikit-learn", level: 5 },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Python", level: 7 },
      { name: "FastAPI", level: 6 },
      { name: "Docker", level: 5 },
      { name: "PostgreSQL", level: 5 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 6 },
      { name: "TypeScript", level: 6 },
      { name: "Tailwind CSS", level: 5 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 6 },
      { name: "GitHub", level: 6 },
      { name: "Vite", level: 5 },
    ],
  },
];

import { useT } from "../i18n/LanguageContext";

function SkillRing({ skill }: { skill: SkillLevel }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const pct = skill.level / 10;
  const offset = circumference * (1 - pct);
  const shortName = skill.name.length > 9 ? skill.name.slice(0, 8) + "…" : skill.name;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="64" height="64" viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16">
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          className="stroke-zinc-100 dark:stroke-zinc-700"
          strokeWidth="4"
        />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          className="stroke-teal-500 dark:stroke-teal-400"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 32 32)"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
        <text
          x="32" y="34"
          textAnchor="middle"
          className="fill-zinc-700 dark:fill-zinc-300 text-[10px] font-bold"
          fontFamily="system-ui, sans-serif"
        >
          {skill.level * 10}%
        </text>
      </svg>
      <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 text-center leading-tight max-w-[72px] truncate">
        {shortName}
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
            <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-4 text-center">
              {group.title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
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
