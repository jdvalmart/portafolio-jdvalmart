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
    slug: "enterprise-mcp-platform",
    title: "Enterprise MCP Platform",
    description:
      "Multi-tenant MCP platform: a single core for identity, permissions, credentials, and observability, with integrations enabled by configuration and human confirmation for sensitive changes.",
    image: "/mcp.png",
    techs: ["Python", "FastAPI", "MCP", "PostgreSQL", "Docker", "AWS"],
    category: "ai-ml",
    detail: {
      overview:
        "A multi-tenant MCP (Model Context Protocol) platform that connects AI assistants to enterprise systems through a single core handling identity, permissions, credentials, and observability. Integrations are enabled by configuration without redeploys, and sensitive changes require human confirmation.",
      architecture:
        "Python and FastAPI service exposing MCP tools over a shared core. PostgreSQL for relational data, configuration-driven integrations, and a permissions/credential layer. Deployed on AWS (EC2 and Lambda) with observability built in.",
      highlights: [
        "Single core for identity, permissions, credentials, and observability",
        "Integrations activated by configuration, no redeploy required",
        "Human-in-the-loop confirmation for sensitive changes",
        "Python, FastAPI, PostgreSQL, Docker on AWS EC2 + Lambda",
      ],
      role: "AI Software Developer. Building and maintaining the MCP core, integration layers, and backend APIs that connect AI assistants to enterprise systems.",
    },
  },
  {
    id: 2,
    slug: "pequelectores",
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
    id: 3,
    slug: "machine-deep-learning",
    title: "MachineDeepLearning",
    description:
      "Repository with 20+ practical labs covering EDA, supervised/unsupervised ML, NLP, neural networks, and model deployment as APIs.",
    image: "/ml.png",
    techs: [
      "Python",
      "TensorFlow",
      "scikit-learn",
      "NLTK",
      "spaCy",
      "HuggingFace",
      "LIME",
      "SHAP",
      "Grad-CAM",
    ],
    repoUrl: "https://github.com/jdvalmart/MachineDeepLearning",
    category: "ai-ml",
    metrics: {
      labCount: 20,
    },
    detail: {
      overview:
        "A comprehensive learning repository documenting the full machine learning lifecycle. Contains 20+ hands-on laboratories covering exploratory data analysis, supervised and unsupervised learning, NLP, neural networks, and model deployment as REST APIs.",
      architecture:
        "Organized into progressive modules: EDA, supervised learning (regression, classification), unsupervised learning (clustering), NLP with Transformers, and deep learning (MLP, CNN, LSTM). Each lab includes theory, implementation, evaluation, and API deployment steps.",
      highlights: [
        "20+ practical labs covering full ML lifecycle",
        "XAI implementations: LIME, SHAP, Grad-CAM",
        "NLP with Transformers (HuggingFace), spaCy, NLTK",
        "Model deployment as REST APIs with FastAPI",
        "Comprehensive documentation for each lab",
      ],
      role: "Solo developer. Completed all labs independently, documenting theory, implementation, evaluation, and production deployment steps.",
    },
  },
  {
    id: 4,
    slug: "xai-cifar10",
    title: "XAI CIFAR-10",
    description:
      "CNN with 87.14% accuracy on CIFAR-10, implementing three XAI techniques for computer vision model explainability.",
    image: "/xai.png",
    techs: ["Python", "TensorFlow", "LIME", "SHAP", "Grad-CAM"],
    category: "ai-ml",
    metrics: {
      accuracy: 87.14,
    },
    detail: {
      overview:
        "A computer vision project achieving 87.14% accuracy on CIFAR-10 using CNN, with comprehensive XAI implementation for model explainability.",
      architecture:
        "CNN architecture trained on CIFAR-10 with data augmentation. XAI layer implemented using LIME for local explanations, SHAP for feature importance, and Grad-CAM for visual heatmaps.",
      highlights: [
        "87.14% accuracy on CIFAR-10",
        "Three XAI techniques: LIME, SHAP, Grad-CAM",
        "Visual heatmap explanations for model decisions",
        "Comparative analysis of XAI methods",
      ],
      role: "Solo developer. Designed CNN architecture, implemented training pipeline, and integrated three XAI techniques for model explainability.",
    },
  },
  {
    id: 5,
    slug: "book-tracker",
    title: "Book Tracker",
    description:
      "Full-stack CRUD application for managing personal book collections with documented REST API, Docker Compose containerization, and cloud deployment.",
    image: "/book-tracker.png",
    techs: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    liveUrl: "https://book-tracker1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/book-tracker",
    category: "full-stack",
    detail: {
      overview:
        "A full-stack CRUD application demonstrating clean architecture and production deployment practices. Users can add, update, and delete books, toggle read/unread status, and view reading statistics.",
      architecture:
        "Three-layer backend separation: FastAPI routers (HTTP), services (business logic), and SQLAlchemy Core models (data). React 18 frontend with Context API state management. PostgreSQL 15 with UUID primary keys. Docker Compose orchestrates PostgreSQL, FastAPI backend, and Nginx-served React build.",
      highlights: [
        "Clean three-layer backend separation with async SQLAlchemy Core",
        "Documented REST API with OpenAPI/Swagger",
        "Docker Compose containerization for local development and deployment",
        "Reading statistics dashboard with progress tracking",
        "TypeScript throughout for type safety",
      ],
      role: "Solo Developer. Designed and implemented full stack: FastAPI backend, React frontend, Docker infrastructure, cloud deployment.",
    },
  },
];
