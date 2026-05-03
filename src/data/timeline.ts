export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 2021,
    title: "Technology Media Operator",
    description:
      "Inventory automation with Python and SQL. Computer lab setup. First real contact with production technology and solving problems with scripts.",
  },
  {
    year: 2022,
    title: "Full-Stack Developer (SENA Internship)",
    description:
      "Built interfaces with Vue.js and backends with PHP/Laravel. MySQL database management. Agile methodology experience within a development team.",
  },
  {
    year: 2025,
    title: "AI Bootcamp — MinTIC",
    description:
      "20 intensive weeks: Machine Learning, NLP, Deep Learning, XAI, MLOps. Projects with TensorFlow, HuggingFace, Transformer models, and model deployment.",
  },
  {
    year: 2026,
    title: "AI Engineer & ML Engineer",
    description:
      "Real AI projects deployed: TF-IDF recommendation systems, CNN classifiers with XAI explainability, advanced NLP labs. Full-stack development with React, FastAPI, and PostgreSQL.",
  },
];
