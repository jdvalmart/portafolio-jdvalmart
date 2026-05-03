# 🐙 jdvalmart — AI Engineer Portfolio

**Juan David Valencia** — AI Engineer & ML Engineer specializing in NLP, Transformers, and interpretable AI.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/jdvalmartdev)
[![Tests](https://img.shields.io/badge/tests-18%2F18-brightgreen)]()

🔗 **[Live Demo](https://jdvalmartdev.netlify.app/)**

---

## 🚀 Features

- 🤖 **AI Chatbot (RAG)** — Answers questions about my profile, projects, and skills using HuggingFace Inference API + Mistral-7B
- 🌓 **Dark Mode** — Class-based toggle with system preference detection and localStorage persistence
- 📊 **Animated Stats** — Counter animations triggered on scroll
- 🎯 **Project Filters** — Category filtering (AI & ML / Full Stack) with responsive grid
- ✉️ **Contact Form** — React Hook Form + Zod validation + mailto integration
- 🎨 **Custom SVG Illustrations** — Project-specific vector graphics (no external images)
- 🔍 **SEO Optimized** — Open Graph, Twitter Card, meta description
- 📱 **Fully Responsive** — Mobile-first with Tailwind CSS 4

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 + Bun |
| Styling | Tailwind CSS 4 |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| AI | HuggingFace Inference API (Mistral-7B) |
| Testing | Vitest + React Testing Library |
| Deploy | Netlify |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Layout.tsx          # Nav, footer, dark mode, chatbot
│   ├── Hero.tsx            # Hero with AI-grid background
│   ├── ProjectCard.tsx     # Project cards with SVG illustrations
│   ├── StatsBar.tsx        # Animated counters
│   ├── ChatBot.tsx         # Lazy-loaded RAG chatbot
│   ├── Timeline.tsx        # Experience timeline
│   ├── CertBadges.tsx      # Certification badges
│   ├── Skills.tsx          # Skills grouped by category
│   ├── SkillsPreview.tsx   # Top skills with progress bars
│   └── FeaturedProjects.tsx
├── hooks/          # Custom React hooks
│   ├── useDarkMode.ts      # localStorage + system preference
│   ├── useScrollReveal.ts  # IntersectionObserver animations
│   └── useChatBot.ts       # Chatbot state management
├── services/       # Business logic
│   └── rag.ts              # Cosine similarity + HF API
├── data/           # Static data & knowledge base
│   ├── projects.ts         # Project definitions
│   ├── timeline.ts         # Experience entries
│   ├── certifications.ts   # Cert data
│   └── chatbot-knowledge.json  # RAG knowledge chunks
├── pages/          # Route pages
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── About.tsx
│   └── Contact.tsx
└── test/           # Test setup
```

## 📦 Projects Showcased

| Project | Type | Key Feature |
|---------|------|------------|
| **Pequelectores** | AI & ML | Book recommendation system for children (TF-IDF) |
| **XAI CIFAR-10** | AI & ML | CNN classifier with LIME, SHAP, Grad-CAM (87.14% accuracy) |
| **NLP Labs** | AI & ML | 20+ NLP laboratories (sentiment, NER, classification) |
| **Book-Tracker** | Full Stack | Library management app (React + FastAPI + PostgreSQL) |

## ▶️ Run Locally

```bash
# Clone
git clone git@github.com:jdvalmart/portafolio-jdvalmart.git
cd portafolio-jdvalmart

# Install
bun install

# Environment (optional — chatbot falls back to static responses)
cp .env.example .env
# Add your HuggingFace token to .env

# Dev server
bun run dev

# Tests
bun run test

# Build
bun run build
```

## 🧪 Testing

```bash
bun run test        # Run once
bun run test:watch  # Watch mode
```

- **18 tests** across 2 suites
- Unit: `rag.ts` cosine similarity, HF API calls
- Component: `StatsBar` rendering and counter animation

## 🌐 Deployment

Deployed on Netlify with automatic CI/CD on push to `main`.

**Environment variables** (Netlify):
| Variable | Required | Description |
|----------|----------|------------|
| `VITE_HF_API_KEY` | No | HuggingFace token for AI chatbot responses |

## 📬 Contact

- **Email**: juanvalencia9411@outlook.com
- **LinkedIn**: [linkedin.com/in/jdvalmart](https://www.linkedin.com/in/jdvalmart/)
- **GitHub**: [github.com/jdvalmart](https://github.com/jdvalmart)
- **HuggingFace**: [huggingface.co/jdvalmart](https://huggingface.co/jdvalmart)

---

*Built with React · TypeScript · Tailwind CSS · ❤️*
