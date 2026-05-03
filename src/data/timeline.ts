export interface TimelineEntry {
  year: number;
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
    title: "AI Bootcamp — MinTIC",
    description:
      "20 intensive weeks with Talento Tech: Machine Learning, NLP, Deep Learning, XAI, MLOps, and Cloud. Built projects with TensorFlow, HuggingFace, and deployed models as APIs. 20+ labs completed.",
  },
  {
    year: 2026,
    title: "Software Engineer — AI & Full-Stack",
    description:
      "Graduated in Software Engineering. Building real AI projects: TF-IDF recommendation systems, CNN classifiers with XAI explainability, and NLP labs. Full-stack development with React, FastAPI, and PostgreSQL.",
  },
];
