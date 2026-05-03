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

export const Skills = () => {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>

      <div className="space-y-10">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
};

interface SkillGroupProps {
  group: SkillGroupData;
}

const SkillGroup = ({ group }: SkillGroupProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
    <div className="flex flex-wrap gap-3">
      {group.skills.map((skill) => (
        <span
          key={skill.name}
          className="px-4 py-2 rounded-full text-sm
                     bg-teal-50 text-teal-700
                     dark:bg-teal-950 dark:text-teal-300"
        >
          {skill.name} [{skill.level}/10]
        </span>
      ))}
    </div>
  </div>
);