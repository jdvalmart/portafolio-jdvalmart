export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techs: string[];
  liveUrl?: string;
  repoUrl?: string;
  category: "ai-ml" | "full-stack";
  metrics?: {
    accuracy?: number;
    labCount?: number;
    booksManaged?: number;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pequelectores",
    description:
      "Book recommendation system for children (ages 6-14) with AI-powered TF-IDF recommendations, reading streaks, badge gamification, and JWT parent auth. Full test coverage on both frontend and backend.",
    image: "/pequelectores.png",
    techs: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "scikit-learn",
      "Docker",
      "Railway",
      "Netlify",
    ],
    liveUrl: "https://pequeletores.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/pequeletores",
    category: "ai-ml",
  },
  {
    id: 2,
    title: "Bootcamp IA — MinTIC",
    description:
      "33 hands-on labs across ML, Deep Learning, NLP, Big Data, and distributed systems. Covers scikit-learn, TensorFlow (CNN 87.14%, RNN/LSTM, GANs), XAI (LIME, SHAP, Grad-CAM), Transformers, HuggingFace, Spark, Kafka, Docker. Learning repository — applying AI concepts, not production deployment.",
    image: "/xai.png",
    techs: [
      "Python",
      "TensorFlow",
      "scikit-learn",
      "HuggingFace",
      "NLTK",
      "spaCy",
      "LIME",
      "SHAP",
      "Grad-CAM",
      "Spark",
      "Docker",
    ],
    repoUrl: "https://github.com/jdvalmart/bootcamp-ia-mintic",
    category: "ai-ml",
    metrics: {
      labCount: 33,
      accuracy: 87.14,
    },
  },
  {
    id: 3,
    title: "Book-Tracker",
    description:
      "Full Stack application to manage books and personal reading progress.",
    image: "/book-tracker.png",
    techs: [
      "React",
      "TypeScript",
      "Tailwind",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Railway",
    ],
    liveUrl: "https://book-tracker1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/book-tracker",
    category: "full-stack",
  },
];
