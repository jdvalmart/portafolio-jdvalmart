export interface TimelineEntry {
  year: number;
  month?: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 2020,
    title: "Started Tech Studies (SENA)",
    description:
      "Began Software Analysis & Development program while working full-time. First contact with programming, databases, and software design.",
  },
  {
    year: 2021,
    title: "Technology Media Operator",
    description:
      "Monitored critical security systems for 200+ users with 99% availability. Developed Python/SQL automation scripts for inventory management, reducing manual processing by 30%. Forged operational discipline and zero-error culture.",
  },
  {
    year: 2022,
    title: "Full-Stack Developer Internship (SENA) — 6 months",
    description:
      "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Managed MySQL databases. First experience in agile teams with Scrum. 6-month internship.",
  },
  {
    year: 2025,
    month: "Jan — Apr",
    title: "AI Bootcamp — MinTIC (Talento Tech)",
    description:
      "20 intensive weeks: Machine Learning, NLP, Deep Learning, XAI, MLOps, and Cloud. 33 labs completed with TensorFlow, HuggingFace, and model deployment as APIs.",
  },
  {
    year: 2025,
    month: "Apr — Jun",
    title: "Diploma in Computer Science",
    description:
      "Software architecture patterns (SOA, JEE, .NET), advanced algorithms (graph theory, text search, data structures), and complexity analysis at Politécnico Grancolombiano.",
  },
  {
    year: 2026,
    month: "Jun — Present",
    title: "AI Software Developer — Trajectory Inc.",
    description:
      "Initus Area (Backend & AI Core). Building scalable AI-powered applications with Python, FastAPI, React. Production RAG pipelines (ChromaDB, ONNX). Enterprise MCP for Claude (140+ tools). Full ML lifecycle management. Clean architecture, code reviews, agile collaboration with Canadian team.",
  },
];