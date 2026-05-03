export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 2021,
    title: "Security Technology Operator",
    description:
      "Began monitoring critical security systems (CCTV, alarms, access control) for 200+ users. Discovered automation by writing Python and SQL scripts to optimize inventory — reducing manual work by 30%. First real contact with code in production.",
  },
  {
    year: 2022,
    title: "Full-Stack Developer (SENA Internship)",
    description:
      "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Managed MySQL databases. First experience in agile development teams using Scrum methodology.",
  },
  {
    year: 2025,
    title: "AI Bootcamp — MinTIC",
    description:
      "20 intensive weeks with Talento Tech: Machine Learning, NLP, Deep Learning, XAI, MLOps, and Cloud. Built projects with TensorFlow, HuggingFace, and deployed models as APIs. Completed 20+ hands-on labs.",
  },
  {
    year: 2026,
    title: "Software Engineer — AI & Full-Stack",
    description:
      "Graduated in Software Engineering. Building real AI projects: TF-IDF recommendation systems, CNN classifiers with XAI explainability, and NLP labs. Full-stack development with React, FastAPI, and PostgreSQL.",
  },
];
