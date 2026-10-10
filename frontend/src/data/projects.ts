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
  tier: "main" | "lab";
  status?: string;
  year?: string;
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
    problem?: string;
    challenges?: string;
    learnings?: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "orion",
    title: "Orion",
    description:
      "Personal MCP server that gives AI coding assistants persistent memory, semantic search, a knowledge graph, and cross-session context.",
    image: "/orion.png",
    techs: ["Python", "FastMCP", "ChromaDB", "ONNX", "Pydantic"],
    repoUrl: "https://github.com/jdvalmart/orion",
    category: "ai-ml",
    tier: "main",
    status: "Open source (MIT)",
    year: "2026",
    detail: {
      overview:
        "Orion is an open-source MCP (Model Context Protocol) server that provides persistent memory, semantic search, knowledge graphs, and session context to AI coding assistants such as Claude Desktop, OpenCode, and editors like VS Code and Neovim.",
      architecture:
        "FastMCP server over stdio and HTTP. Twelve tools are grouped into memory, profile, graph, and session modules. Flat JSON files store the durable data, ChromaDB with ONNX embeddings powers semantic recall, and logs are rotated. The code is typed strictly and linted with zero warnings.",
      problem:
        "AI assistants forget everything between sessions. Without persistent memory, architectural decisions, project context, and prior reasoning are lost, so the user re-explains the same things over and over.",
      challenges:
        "Keeping recall useful without an external service: the embeddings run locally with ONNX, and the tool surface had to stay small and composable so the assistant can chain tools reliably.",
      learnings:
        "Tool schema design matters as much as the model. Small, well-named, typed tools produce far better agent behavior than a large monolithic one. Local embeddings remove reliance on external APIs and keep retrieval fast and private.",
      highlights: [
        "12 tools across memory, knowledge graph, sessions, and profile",
        "ChromaDB with local ONNX embeddings for hybrid semantic search",
        "Runs over stdio or HTTP (port 9099) with an auto-start systemd unit",
        "Strict typing (mypy) and linting (ruff) with a layered test suite",
      ],
      role: "Designer and sole developer. Defined the architecture, implemented every tool, and set up the quality and documentation standards.",
    },
  },
  {
    id: 2,
    slug: "mishkan",
    title: "Mishkan",
    description:
      "E-commerce platform for Christian products for the Colombian market: catalog, cart, checkout, payments, tax, and a documented order lifecycle.",
    image: "/mishkan.png",
    techs: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
    category: "full-stack",
    tier: "main",
    status: "In development",
    year: "2026",
    detail: {
      overview:
        "Mishkan is an e-commerce platform for Christian products (Bibles, books, devotionals, and accessories) aimed at the Colombian market, designed to grow to other markets and product categories. It covers the catalog, cart, checkout, payments, tax, and order management.",
      architecture:
        "Monorepo with a FastAPI backend (SQLAlchemy 2.0 async + asyncpg, Alembic migrations), a Next.js App Router frontend (TypeScript, Tailwind, TanStack Query), PostgreSQL, and Wompi for payments. Dev runs on Docker Compose; production targets a VPS behind Nginx/Caddy with Let's Encrypt.",
      problem:
        "Selling online in Colombia means handling mixed VAT treatment (books are VAT-exempt, accessories are not), local payment methods, idempotent order creation, and a storefront that search engines can actually index.",
      challenges:
        "Getting money and tax right: prices are stored as integer minor units, tax is computed per line item, and the order lifecycle is webhook-driven with an explicit pending state so retries are idempotent and stock never goes negative.",
      learnings:
        "Writing the decisions down first pays off. Twenty-two ADRs turned a contradictory early design into a coherent model for payments, tax, order lifecycle, and deployment before a single line of production code.",
      highlights: [
        "22 ADRs documenting payments, tax, order lifecycle, and deployment",
        "Correct money handling with integer minor units and per-line VAT",
        "Webhook-driven, idempotent order lifecycle with an explicit pending state",
        "VAT-exempt books vs. taxed accessories per Colombian tax rules",
        "Next.js storefront chosen for crawlable, per-product SEO",
      ],
      role: "Designer and sole developer. Owned the architecture, backend, frontend, and infrastructure decisions end to end.",
    },
  },
  {
    id: 3,
    slug: "pacioli",
    title: "Pacioli",
    description:
      "Personal finance app inspired by double-entry bookkeeping: budgets, transactions, credit cards, savings, and reports. Local-first with SQLite.",
    image: "/pacioli.png",
    techs: ["Python", "FastAPI", "SQLite", "PostgreSQL", "React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/jdvalmart/pacioli",
    category: "full-stack",
    tier: "main",
    status: "Open source (MIT)",
    year: "2026",
    detail: {
      overview:
        "Pacioli is a personal finance web app inspired by Luca Pacioli, the father of double-entry bookkeeping. It lets you budget, record, and understand your money month by month. It is local-first: SQLite by default and PostgreSQL when a DATABASE_URL is provided.",
      architecture:
        "FastAPI backend with Pydantic and a dual SQLite/PostgreSQL data layer where money is stored as integer cents. Schema migrations are versioned. The frontend is React 19 with Vite, Tailwind v4, shadcn/ui, Recharts, TanStack Query, and React Router.",
      problem:
        "Most budgeting apps either lock your data in a cloud or ignore real-world mechanics like credit-card billing cycles, installments with interest, and savings that are reserved rather than spent.",
      challenges:
        "Modeling credit cards correctly: billing cycles, current statement, total debt, and installment purchases with total interest, all while keeping the budget view honest about what is actually spent versus reserved.",
      learnings:
        "A small, well-defined money type and idempotent recurring transactions prevent a whole class of bugs. Modeling the domain faithfully matters more than adding features.",
      highlights: [
        "Double-entry-inspired model; money stored as integer cents",
        "Credit-card cycles, installments (1–60) with interest, and payments",
        "Budgets, savings pockets/CDTs/stocks, and four report panels",
        "Idempotent recurring transactions that never inflate future balances",
        "Local-first: SQLite by default, PostgreSQL via DATABASE_URL",
      ],
      role: "Designer and sole developer. Built the full stack, the data model, and the quality tooling (ruff, mypy, pytest, oxlint).",
    },
  },
  {
    id: 4,
    slug: "enterprise-mcp-platform",
    title: "Enterprise MCP Platform",
    description:
      "Multi-tenant MCP platform: a single core for identity, permissions, credentials, and observability, with integrations enabled by configuration and human confirmation for sensitive changes.",
    image: "/mcp.png",
    techs: ["Python", "FastAPI", "MCP", "PostgreSQL", "Docker", "AWS"],
    category: "ai-ml",
    tier: "main",
    status: "Production (private)",
    year: "2026",
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
    id: 5,
    slug: "pequelectores",
    title: "Pequelectores",
    description:
      "Book recommendation system for children (ages 6-14) with AI-powered TF-IDF recommendations, reading streaks, badge gamification, and JWT parent auth.",
    image: "/pequelectores.png",
    techs: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "scikit-learn", "Docker"],
    liveUrl: "https://pequeletores.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/pequeletores",
    category: "ai-ml",
    tier: "main",
    year: "2025",
    detail: {
      overview:
        "Pequelectores is a web application that recommends books to children aged 6-14 using content-based AI filtering. Children select visual icons representing their interests, and an AI-powered recommendation engine finds the best matching books from the Open Library catalog.",
      architecture:
        "Three-tier architecture: React SPA on Netlify, FastAPI async backend on Railway, PostgreSQL for relational data. The recommendation engine uses TF-IDF vectorization from scikit-learn with cosine similarity scoring, and Open Library data is cached with a 24-hour TTL.",
      highlights: [
        "TF-IDF content-based filtering with cosine similarity",
        "Explainable recommendations showing top contributing words",
        "Reading streaks with consecutive-day tracking and gamification badges",
        "JWT authentication with bcrypt hashing for parent accounts",
      ],
      role: "Lead Developer. Designed the system, built the FastAPI API, implemented the TF-IDF engine, and configured CI/CD.",
    },
  },
  {
    id: 6,
    slug: "book-tracker",
    title: "Book Tracker",
    description:
      "Full-stack CRUD application for managing personal book collections with a documented REST API and Docker Compose.",
    image: "/book-tracker.png",
    techs: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    liveUrl: "https://book-tracker1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/book-tracker",
    category: "full-stack",
    tier: "lab",
    year: "2024",
    detail: {
      overview:
        "A full-stack CRUD application demonstrating clean architecture and production deployment practices: add, update, and delete books, toggle read status, and view reading statistics.",
      architecture:
        "Three-layer backend separation (routers, services, models) with async SQLAlchemy, a React frontend, and PostgreSQL. Docker Compose orchestrates the database, backend, and an Nginx-served build.",
      highlights: [
        "Clean three-layer backend with async SQLAlchemy",
        "Documented REST API with OpenAPI/Swagger",
        "Docker Compose for local development and deployment",
      ],
      role: "Solo developer. Designed and implemented the full stack and infrastructure.",
    },
  },
  {
    id: 7,
    slug: "machine-deep-learning",
    title: "MachineDeepLearning",
    description:
      "Repository with 20+ practical labs covering EDA, supervised/unsupervised ML, NLP, neural networks, and model deployment as APIs.",
    image: "/ml.png",
    techs: ["Python", "TensorFlow", "scikit-learn", "NLTK", "spaCy", "LIME", "SHAP", "Grad-CAM"],
    repoUrl: "https://github.com/jdvalmart/MachineDeepLearning",
    category: "ai-ml",
    tier: "lab",
    year: "2025",
    detail: {
      overview:
        "A learning repository documenting the full machine learning lifecycle through 20+ hands-on laboratories: EDA, supervised and unsupervised learning, NLP, neural networks, and model deployment as REST APIs.",
      architecture:
        "Progressive modules from EDA to deep learning (MLP, CNN, LSTM), each including theory, implementation, evaluation, and API deployment steps.",
      highlights: [
        "20+ practical labs covering the full ML lifecycle",
        "Explainability with LIME, SHAP, and Grad-CAM",
        "NLP with Transformers, spaCy, and NLTK",
      ],
      role: "Solo developer. Completed and documented every lab.",
    },
  },
  {
    id: 8,
    slug: "xai-cifar10",
    title: "XAI CIFAR-10",
    description:
      "CNN with 87.14% accuracy on CIFAR-10, using three XAI techniques for computer-vision model explainability.",
    image: "/xai.png",
    techs: ["Python", "TensorFlow", "LIME", "SHAP", "Grad-CAM"],
    repoUrl: "https://github.com/jdvalmart/MachineDeepLearning",
    category: "ai-ml",
    tier: "lab",
    year: "2025",
    metrics: { accuracy: 87.14 },
    detail: {
      overview:
        "A computer vision project reaching 87.14% accuracy on CIFAR-10 with a CNN, plus a full explainability layer.",
      architecture:
        "CNN trained with data augmentation. Explainability uses LIME for local explanations, SHAP for feature importance, and Grad-CAM for visual heatmaps.",
      highlights: [
        "87.14% accuracy on CIFAR-10",
        "Three XAI techniques: LIME, SHAP, Grad-CAM",
        "Comparative analysis of explanation methods",
      ],
      role: "Solo developer. Designed the CNN, training pipeline, and explainability layer.",
    },
  },
];

export const mainProjects = projects.filter((project) => project.tier === "main");
export const labProjects = projects.filter((project) => project.tier === "lab");
