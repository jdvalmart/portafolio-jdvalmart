const skills = {
  frontend: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
  backend: ["FastAPI", "NestJS", "Node.js", "Python", "REST APIs"],
  database: ["PostgreSQL", "SQL"],
  devops: ["Docker"],
  tools: ["Git", "GitHub", "Vite", "npm"],
  ai: ["Machine Learning (basics)", "Natural Language Processing (basics)"],
};

export const Skills = () => {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>

      <div className="space-y-10">
        <SkillGroup title="Frontend" items={skills.frontend} />
        <SkillGroup title="Backend" items={skills.backend} />
        <SkillGroup title="Database" items={skills.database} />
        <SkillGroup title="devops" items={skills.devops} />
        <SkillGroup title="Tools" items={skills.tools} />
        <SkillGroup title="AI" items={skills.ai} />
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
