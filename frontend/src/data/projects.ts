export interface Project {
  id: number;
  slug: string;
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
  detail?: {
    overview: string;
    architecture: string;
    highlights: string[];
    role: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "pequeletores",
    title: "Pequelectores",
    description:
      "Book recommendation system for children (ages 6-14) with AI-powered TF-IDF recommendations, reading streaks, badge gamification, and JWT parent auth.",
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
    detail: {
      overview:
        "Pequelectores is a web application that recommends books to children aged 6-14 using content-based AI filtering. Children select visual icons representing their interests, and an AI-powered recommendation engine finds the best matching books from the Open Library catalog. The system includes reading streaks, badge gamification, and a parent dashboard with JWT authentication.",
      architecture:
        "Three-tier architecture: React 18 SPA on Netlify, FastAPI async backend on Railway, PostgreSQL 15 for relational data. The recommendation engine uses TF-IDF vectorization from scikit-learn with cosine similarity scoring. Open Library API integration with 24-hour TTL caching handles book metadata retrieval.",
      highlights: [
        "TF-IDF content-based filtering with 500-feature vector space and n-gram (1,2) tokenization",
        "XAI explanations showing top-3 contributing words per recommendation",
        "36 visual icons across 6 categories for child-friendly preference selection",
        "Reading streaks with consecutive day tracking and 8 gamification badges",
        "JWT authentication with bcrypt hashing for parent/tutor accounts",
        "Full test coverage: 54 backend tests (pytest) + 30 frontend tests (Vitest)",
      ],
      role: "Lead Developer & Backend. Designed the full system, built the FastAPI API with SQLAlchemy async ORM, implemented the TF-IDF recommendation engine, and configured CI/CD on Railway and Netlify.",
    },
  },
  {
    id: 2,
    slug: "bootcamp-ia-mintic",
    title: "Bootcamp IA — MinTIC",
    description:
      "33 hands-on labs across ML, Deep Learning, NLP, Big Data, and distributed systems with XAI explainability.",
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
    detail: {
      overview:
        "A comprehensive learning repository documenting the full machine learning lifecycle. Built during MinTIC's 20-week intensive AI Bootcamp, it contains 33 hands-on laboratories progressing from basic ML concepts to advanced deep learning, NLP, XAI, and MLOps. Each lab includes theory, code, results, and documentation.",
      architecture:
        "Organized into progressive modules: Machine Learning fundamentals (scikit-learn), Deep Learning (TensorFlow/Keras), NLP with Transformers (HuggingFace), and MLOps. Each lab is self-contained with Jupyter notebooks covering data preparation, model training, evaluation, interpretation, and API deployment.",
      highlights: [
        "CNN image classifier achieving 87.14% accuracy on CIFAR-10 with XAI explainability (LIME, SHAP, Grad-CAM)",
        "RNN/LSTM sequence models for text generation and sentiment analysis",
        "GAN implementation for synthetic data generation",
        "Transformer fine-tuning with HuggingFace for text classification and NER",
        "Big Data processing with Apache Spark and Hadoop",
        "Distributed messaging with Apache Kafka for streaming data pipelines",
      ],
      role: "Solo learner. Completed all 33 labs independently, documenting each experiment with theory, implementation, results analysis, and production deployment steps.",
    },
  },
  {
    id: 3,
    slug: "book-tracker",
    title: "Book-Tracker",
    description:
      "Full-stack application for managing personal book collections and tracking reading progress.",
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
    detail: {
      overview:
        "A full-stack CRUD application demonstrating clean architecture and production deployment practices. Users can add, update, and delete books, toggle read/unread status, and view reading statistics. Features dark mode, skeleton loading states, toast notifications, and Docker Compose for local development.",
      architecture:
        "Three-layer backend separation: FastAPI routers (HTTP), services (business logic), and SQLAlchemy Core models (data). React 19 frontend with Context API state management and Axios HTTP client. PostgreSQL 15 with UUID-based primary keys. Docker Compose orchestrates PostgreSQL, FastAPI backend, and Nginx-served React build.",
      highlights: [
        "Clean three-layer backend separation with async SQLAlchemy Core",
        "Dark mode with system preference detection and FOUC prevention",
        "Skeleton loading cards and toast notifications with slide-in animation",
        "Reading statistics dashboard with color-coded progress bar",
        "Docker Compose with health checks for zero-dependency local setup",
        "Spec-driven development with openspec/ documentation",
      ],
      role: "Solo Developer. Designed and implemented the full stack: FastAPI backend, React frontend, Docker infrastructure, and automated deployment to Railway and Netlify.",
    },
  },
];
