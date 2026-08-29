export interface SkillLevel {
  name: string;
  level: number;
}

export interface SkillGroupData {
  title: string;
  skills: SkillLevel[];
}

export const LEVELS: Record<number, string> = {
  1: "Learning",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export const ringColors: Record<number, { fill: string; stroke: string }> = {
  1: { fill: "fill-zinc-200 dark:fill-zinc-700", stroke: "stroke-zinc-400 dark:stroke-zinc-500" },
  2: { fill: "fill-cyan-200 dark:fill-cyan-900", stroke: "stroke-cyan-400 dark:stroke-cyan-600" },
  3: { fill: "fill-teal-200 dark:fill-teal-900", stroke: "stroke-teal-400 dark:stroke-teal-600" },
  4: { fill: "fill-teal-300 dark:fill-teal-800", stroke: "stroke-teal-500 dark:stroke-teal-500" },
  5: { fill: "fill-teal-400 dark:fill-teal-700", stroke: "stroke-teal-600 dark:stroke-teal-400" },
};

export const skillGroups: SkillGroupData[] = [
  {
    title: "Backend & Data",
    skills: [
      { name: "Python", level: 5 },
      { name: "FastAPI", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Docker", level: 4 },
      { name: "Redis", level: 3 },
      { name: "SQLAlchemy", level: 4 },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "MCP", level: 5 },
      { name: "NLP", level: 5 },
      { name: "LLMs", level: 4 },
      { name: "Transformers", level: 4 },
      { name: "RAG", level: 4 },
      { name: "XAI", level: 4 },
      { name: "TensorFlow", level: 4 },
      { name: "scikit-learn", level: 4 },
    ],
  },
  {
    title: "AI Protocols & Production",
    skills: [
      { name: "MCP Tools", level: 5 },
      { name: "ONNX", level: 4 },
      { name: "ChromaDB", level: 4 },
      { name: "MLOps", level: 4 },
      { name: "Model Serving", level: 4 },
    ],
  },
  {
    title: "Frontend (Secondary)",
    skills: [
      { name: "React", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind", level: 4 },
      { name: "Vue.js", level: 3 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", level: 5 },
      { name: "CI/CD", level: 4 },
      { name: "Unix Shell", level: 4 },
      { name: "Railway", level: 3 },
      { name: "Netlify", level: 3 },
    ],
  },
];