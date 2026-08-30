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
      "Monitored critical security systems for 200+ users with 99% availability. Managed inventory and logistics operations in private security sector.",
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
    title: "Backend Python Developer | AI Engineer — Trajectory Inc.",
    description:
      "Initus Area (Backend & AI Core). Building enterprise MCP for Claude with 140+ tools: PostgreSQL access, REST API wrappers, workflow automation, business logic. MCP tool schemas (JSON Schema), FastAPI endpoints, LLM tool-calling optimization. RAG pipelines: ChromaDB, ONNX embeddings, hybrid search. Backend: FastAPI async, PostgreSQL, clean architecture. On-site in Bogotá for Canadian company.",
  },
];