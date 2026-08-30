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
    title: "Backend & AI",
    skills: [
      { name: "Python", level: 5 },
      { name: "SQL", level: 4 },
      { name: "FastAPI", level: 4 },
      { name: "MCP", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "ChromaDB", level: 3 },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "ML Algorithms", level: 4 },
      { name: "LLM Fine-tuning", level: 3 },
      { name: "RAG", level: 3 },
      { name: "ONNX", level: 3 },
      { name: "XAI", level: 3 },
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      { name: "React", level: 3 },
      { name: "JavaScript", level: 3 },
      { name: "React Native", level: 2 },
      { name: "Node.js", level: 2 },
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      { name: "Docker", level: 2 },
      { name: "Git", level: 4 },
      { name: "CI/CD", level: 2 },
      { name: "Linux/Unix", level: 3 },
      { name: "Code Reviews", level: 3 },
      { name: "Testing", level: 3 },
      { name: "Agile/Scrum", level: 3 },
    ],
  },
];