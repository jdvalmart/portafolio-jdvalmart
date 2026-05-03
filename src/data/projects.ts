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
    title: "XAI CIFAR-10",
    description:
      "CNN image classifier for CIFAR-10 with XAI explanations using LIME, SHAP, and Grad-CAM. Achieved 87.14% accuracy with interpretability overlays.",
    image: "/xai.png",
    techs: ["Python", "TensorFlow", "LIME", "SHAP", "Grad-CAM", "NumPy"],
    repoUrl: "https://github.com/jdvalmart/MachineDeepLearning/blob/main/nivel_intermedio/Laboratorio_5_Redes_neuronales_convolucionales.ipynb",
    category: "ai-ml",
    metrics: {
      accuracy: 87.14,
    },
  },
  {
    id: 3,
    title: "NLP Labs",
    description:
      "Hands-on labs covering sentiment analysis, Named Entity Recognition (NER), and text classification using NLTK, spaCy, and transformers.",
    image: "/nlp.png",
    techs: ["Python", "NLTK", "spaCy", "transformers", "pandas"],
    repoUrl: "https://github.com/jdvalmart/MachineDeepLearning/blob/main/nivel_intermedio/Laboratorio_9_Analisis_de_sentimiento_y_mineria_de_opiniones.ipynb",
    category: "ai-ml",
    metrics: {
      labCount: 20,
    },
  },
  {
    id: 4,
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