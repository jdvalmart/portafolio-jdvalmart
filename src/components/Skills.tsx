const skills = {
  frontend: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
  ],
  state: ["useState", "useEffect", "Context API", "Custom Hooks"],
  tools: ["Git", "GitHub", "Vite", "Netlify", "npm", "Bun", "Nvim", "VS code"],
  extra: [
    "APIs REST",
    "Nodejs",
    "Python",
    "Backend básico",
    "SQL",
    "Fundamentos de IA",
  ],
};

export const Skills = () => {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>

      <div className="space-y-10">
        <SkillGroup title="Frontend" items={skills.frontend} />
        <SkillGroup title="Estado & Arquitectura" items={skills.state} />
        <SkillGroup title="Herramientas" items={skills.tools} />
        <SkillGroup
          title="Conocimientos Complementarios"
          items={skills.extra}
        />
      </div>
    </section>
  );
};

interface SkillGroupProps {
  title: string;
  items: string[];
}

const SkillGroup = ({ title, items }: SkillGroupProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {items.map((skill) => (
        <span
          key={skill}
          className="px-4 py-2 rounded-full text-sm
                     bg-indigo-50 text-indigo-700
                     dark:bg-indigo-950 dark:text-indigo-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);
