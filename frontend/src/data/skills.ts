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
    title: "AI & Machine Learning",
    skills: [
      { name: "RAG Pipelines", level: 4 },
      { name: "ONNX Embeddings", level: 4 },
      { name: "Vector Search (ChromaDB)", level: 4 },
      { name: "LLM Fine-tuning", level: 3 },
      { name: "Neural Networks", level: 3 },
      { name: "Regression", level: 3 },
      { name: "Classification", level: 3 },
      { name: "Clustering", level: 3 },
      { name: "NLP (Transformers, spaCy, NLTK)", level: 3 },
      { name: "XAI (LIME, SHAP, Grad-CAM)", level: 3 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Python", level: 4 },
      { name: "FastAPI", level: 4 },
      { name: "MCP (Model Context Protocol)", level: 4 },
      { name: "REST APIs", level: 4 },
      { name: "Async Services", level: 4 },
      { name: "Clean Architecture", level: 4 },
      { name: "SQL", level: 4 },
      { name: "JavaScript", level: 3 },
      { name: "Node.js", level: 2 },
    ],
  },
  {
    title: "Data & Databases",
    skills: [
      { name: "PostgreSQL", level: 4 },
      { name: "ChromaDB", level: 4 },
      { name: "Data Cleaning", level: 4 },
      { name: "MySQL", level: 3 },
      { name: "Pandas / NumPy", level: 3 },
      { name: "Feature Engineering", level: 3 },
    ],
  },
  {
    title: "DevOps & Practices",
    skills: [
      { name: "Git / GitHub", level: 4 },
      { name: "Agile / Scrum", level: 4 },
      { name: "Code Reviews", level: 4 },
      { name: "Docker", level: 3 },
      { name: "CI/CD", level: 3 },
      { name: "Testing", level: 3 },
    ],
  },
];
