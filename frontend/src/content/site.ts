export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jdvalmartdev.netlify.app";

export const site = {
  name: "Juan David Valencia",
  role: "AI Software Developer",
  email: "juanvalencia9411@outlook.com",
  linkedin: "https://www.linkedin.com/in/jdvalmart/",
  github: "https://github.com/jdvalmart",
  huggingface: "https://huggingface.co/jdvalmart",
};

export const t = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I'm Juan David",
    role: "AI Software Developer at Trajectory Inc.",
    subtitle:
      "AI Software Developer specialized in building scalable AI-powered applications and services. Full ML lifecycle: research, design, training, deployment, optimization. Python · FastAPI · LLMs · RAG · MCP · Machine Learning.",
    talkBtn: "Talk to my CV",
    projectsBtn: "Projects",
    aboutBtn: "About Me",
    cvBtn: "Download CV",
  },
  home: {
    stats: [
      { label: "Years in Tech", value: 5, suffix: "+" },
      { label: "Projects Built", value: 6, suffix: "+" },
      { label: "ML Labs", value: 33, suffix: "+" },
      { label: "Currently at", value: 0, suffix: "Trajectory" },
    ],
    ctaTitle: "Have an AI project in mind?",
    ctaSubtitle:
      "I build scalable AI-powered applications and services for the enterprise. From algorithm research to production deployment. Let's talk about how I can help you.",
    ctaContact: "Contact Me",
    ctaProjects: "View Projects",
    talkEyebrow: "My portfolio is not read, it is conversed",
    talkTitle: "Talk to my CV",
    talkSubtitle:
      "Ask a question and a RAG agent built by me answers from my real experience, projects, and stack — no scrolling required.",
    talkPlaceholder: "Ask about my experience, projects, or stack…",
    talkCta: "Ask",
    talkPrompts: [
      "What projects have you built?",
      "What is your experience with RAG?",
      "What is your tech stack?",
      "Are you open to new opportunities?",
    ],
  },
  projects: {
    title: "Projects",
    subtitle: "Machine Learning, NLP, Backend, and AI applications",
    all: "All",
    aiMl: "AI & ML",
    fullStack: "Full Stack",
    noProjects: "No projects found for this category.",
  },
  about: {
    title: "About Me",
    eyebrow: "Who I am",
    intro:
      "I'm Juan David Valencia, an AI Software Developer who builds systems that turn language models into useful, reliable products.",
    p1: "I'm an AI Software Developer at Trajectory Inc., specialized in building scalable AI-powered applications and services for the enterprise. My focus is 100% on AI-driven software development, covering the full ML lifecycle: from algorithm research and design to deployment, optimization, and monitoring of models in production.",
    p2: "My Software Engineering background and intensive AI bootcamp (MinTIC) enable me to combine software engineering discipline with advanced deep learning, NLP, and MLOps techniques. Previously spent 5 years monitoring critical security systems, forging operational discipline, zero-error tolerance, and high-availability principles that I now apply to building robust AI agents and data pipelines.",
    p3: "Based in Bogotá, Colombia. Working on-site for Trajectory Inc. (Canada) since June 2026.",
    storyTitle: "From critical systems to AI",
    story1:
      "I grew up in Palmira and moved to Bogotá to build my career. For five years I monitored critical security systems, where a downtime is not an option. That experience shaped how I think about software: observability, reliability, and accountability first.",
    story2:
      "I moved into software engineering and then into AI, drawn by explainability, retrieval-augmented generation, and agents that can actually do work. Today I design and ship RAG pipelines, LLM infrastructure, and MCP integrations that connect assistants to real systems.",
    nowTitle: "What I do today",
    now: "I build a multi-tenant MCP platform at Trajectory Inc. and, on my own time, projects like Orion — a personal MCP server for AI memory — to keep learning in public.",
    connectTitle: "Let's connect",
    connectText: "I'm open to AI engineering, RAG, LLM, and backend opportunities.",
    philosophy: "Philosophy",
    quote: '"There is no elevator to what\'s worth it. You climb the stairs, one step at a time."',
    quoteAuthor: "— Juan David Valencia",
    goals: "Current Goals",
    goal1: "Master ML model development and AI agent ecosystems",
    goal2: "Build and deploy a personal AI SaaS product",
    goal3: "Contribute to open-source AI/ML projects",
    goal4: "Cloud certification (AWS/GCP)",
  },
  contact: {
    title: "Contact",
    intro:
      "If you have an opportunity, an idea, or simply want to contact me, I'd be happy to talk to you.",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: "What is this about?",
    messagePlaceholder: "Your message...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Thanks for reaching out!",
    successText: "Thanks for your message. You can also reach me directly at",
    errorText: "Something went wrong. Please try again or email directly.",
    sendEmail: "Send Email",
    linkedIn: "LinkedIn",
    huggingFace: "HuggingFace",
    gitHub: "GitHub",
    validation: {
      name: "Name must be at least 2 characters",
      email: "Please enter a valid email",
      subject: "Subject must be at least 3 characters",
      message: "Message must be at least 10 characters",
    },
  },
  skills: {
    title: "Skills",
  },
  featured: {
    title: "Featured Projects",
    viewAll: "View All",
  },
  coreSkills: "Core Skills",
  timeline: {
    title: "Experience Timeline",
  },
  certs: {
    title: "Certifications & Education",
    entries: [
      { name: "AI Bootcamp — MinTIC (Talento Tech)", issuer: "2025 — 2026 | 20 weeks, 33 labs" },
      { name: "Diploma in C.S.", issuer: "Politécnico" },
      { name: "Software Eng.", issuer: "Politécnico" },
      { name: "Software Dev.", issuer: "SENA" },
    ],
  },
  footer: {
    builtWith: "Built with Next.js · TypeScript · Tailwind",
    rights: "All rights reserved.",
  },
  chatbot: {
    welcome:
      "Hello! I'm Juan David's virtual assistant. I can tell you about his skills, projects, experience, and education. How can I help you?",
    assistant: "AI Assistant",
    placeholder: "Ask me anything...",
    sendMessage: "Send message",
    closeChat: "Close chat",
    openChat: "Open chat",
    fallback:
      "Interesting question. I don't have specific information about that, but I can tell you about Juan David's projects, skills, and experience. What would you like to know?",
  },
  darkMode: {
    light: "Switch to light mode",
    dark: "Switch to dark mode",
  },
  skipToContent: "Skip to content",
  backToTop: "Back to top",
  projectCard: {
    viewDemo: "View Demo",
    codeRepo: "Code Repository",
    accuracy: "accuracy",
    labs: "labs",
    books: "books",
    details: "Details",
  },
};

export type SiteCopy = typeof t;
