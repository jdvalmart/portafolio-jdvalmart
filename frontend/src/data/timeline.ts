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
      "Monitored critical security systems for 200+ users with 99% availability. Discovered automation by writing Python and SQL scripts to optimize inventory — reducing manual work by 30%.",
  },
  {
    year: 2022,
    title: "Full-Stack Developer Internship (SENA)",
    description:
      "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Managed MySQL databases. First experience in agile teams with Scrum.",
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
    month: "Jun 1 — Present",
    title: "Backend Python Developer | AI Engineer — Trajectory Inc.",
    description:
      "Initus Area (Backend & AI Core). Building enterprise MCP for Claude with 140+ tools: PostgreSQL access, REST API wrappers, workflow automation, business logic execution. MCP tool schemas (JSON Schema), FastAPI endpoints, LLM tool-calling optimization (>95% accuracy). Production NLP: Transformer fine-tuning (BERT, Llama), custom tokenizers, ONNX export. RAG pipelines: ChromaDB vector store, embedding models, hybrid search. XAI: LIME/SHAP explanations in production APIs. MLOps: CI/CD for ML models, model registry, A/B testing, drift monitoring. Backend: FastAPI async, PostgreSQL (asyncpg/SQLAlchemy), Redis, WebSocket. Clean architecture, Docker multi-stage, Railway/Render deployment. Remote from Colombia for Canadian company.",
  },
];