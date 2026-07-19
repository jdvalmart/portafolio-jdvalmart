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
    title: "AI Bootcamp — MinTIC",
    description:
      "20 intensive weeks with Talento Tech: Machine Learning, NLP, Deep Learning, XAI, MLOps, and Cloud. 33 labs completed with TensorFlow, HuggingFace, and model deployment as APIs.",
  },
  {
    year: 2025,
    month: "Apr — Jun",
    title: "Diploma in Computer Science",
    description:
      "Software architecture patterns (SOA, JEE, .NET), advanced algorithms (graph theory, text search, data structures), and complexity analysis at Politecnico Grancolombiano.",
  },
  {
    year: 2025,
    month: "Jun — Present",
    title: "AI Developer — Trajectory Inc.",
    description:
      "Developing AI-powered solutions for enterprise clients. Building production ML pipelines, NLP systems, and scalable APIs. Working with LLMs, embeddings, and modern AI infrastructure in a collaborative in-person team in Bogotá.",
  },
];
