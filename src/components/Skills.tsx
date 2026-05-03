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

export const Skills = () => {
  const { t } = useT();

  return (
    <section id="skills" className="max-w-2xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-zinc-100">
        {t.skills.title}
      </h2>

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="w-28 text-sm text-zinc-600 dark:text-zinc-400 truncate">
                    {skill.name}
                  </span>
                  <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 dark:bg-teal-400 rounded-full"
                      style={{ width: `${skill.level * 10}%` }}
                    />
                  </div>
                  <span className="w-7 text-xs text-right text-zinc-400 dark:text-zinc-500 tabular-nums">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
