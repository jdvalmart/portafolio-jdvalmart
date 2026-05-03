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
    title: "Supporting Skills",
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

function SkillBadge({ skill }: { skill: SkillLevel }) {
  const icon = skill.name.substring(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-teal-50 dark:bg-teal-950 border border-teal-100 dark:border-teal-900 text-center">
      <span
        className="w-14 h-14 rounded-xl bg-teal-600 dark:bg-teal-500 text-white text-lg font-extrabold flex items-center justify-center shadow-sm"
        aria-label={skill.name}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
        {skill.name}
      </span>
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {skill.level}/10
      </span>
    </div>
  );
}

export const Skills = () => {
  const { t } = useT();
  const allSkills = skillGroups.flatMap((g) => g.skills);

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-zinc-100">
        {t.skills.title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allSkills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
};
