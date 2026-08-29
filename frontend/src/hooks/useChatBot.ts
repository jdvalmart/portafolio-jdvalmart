import { useCallback, useEffect, useState, useRef } from "react";
import { generateResponse, generateResponseStream, getKnowledgeChunks } from "../services/rag";
import fallbackData from "../data/fallback-responses.json";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface FallbackEntry {
  patterns: string[];
  response: string;
}

interface FallbackData {
  fallbackResponses: {
    en: FallbackEntry[];
    es: FallbackEntry[];
  };
}

interface ChatBotState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingContent: string;
}

interface ChatBotActions {
  sendMessage: (query: string) => Promise<void>;
}

type UseChatBotReturn = ChatBotState & ChatBotActions;

const typedFallback = fallbackData as unknown as FallbackData;
const STORAGE_KEY = "chat_messages";

function loadMessages(welcomeMessage: string): Message[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupted storage, start fresh
  }
  return [
    {
      role: "assistant",
      content: welcomeMessage,
      timestamp: Date.now(),
    },
  ];
}

function persistMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // storage full or unavailable, ignore
  }
}

function findFallbackResponse(
  query: string,
  defaultResponse: string,
  lang: "en" | "es"
): string {
  const lowerQuery = query.toLowerCase();
  const entries =
    typedFallback.fallbackResponses[lang] ||
    typedFallback.fallbackResponses.en;

  for (const entry of entries) {
    const matched = entry.patterns.some((pattern) =>
      new RegExp("\\b" + pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(lowerQuery)
    );
    if (matched) {
      return entry.response;
    }
  }

  return defaultResponse;
}

function buildContextFromChunks(query: string): string {
  const chunks = getKnowledgeChunks();
  const scored = chunks.map((chunk) => {
    const queryWords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    const contentLower = chunk.content.toLowerCase();
    let score = 0;
    for (const word of queryWords) {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      const matches = contentLower.match(regex);
      if (matches) score += matches.length;
    }
    return { chunk, score };
  });

  const relevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.chunk.content);

  return relevant.join("\n\n");
}

function generateLocalAnswer(query: string, lang: "en" | "es"): string {
  const context = buildContextFromChunks(query);
  if (!context) return "";

  const isSpanish = lang === "es";
  const prompt = isSpanish
    ? `Eres el asistente de Juan David Valencia. Responde basándote SOLO en la información de abajo. Sé conciso y natural.\n\nInformación:\n${context}\n\nPregunta: ${query}\n\nRespuesta:`
    : `You are Juan David Valencia's assistant. Answer based ONLY on the information below. Be concise and natural.\n\nInformation:\n${context}\n\nQuestion: ${query}\n\nAnswer:`;

  return prompt;
}

interface UseChatBotOptions {
  welcomeMessage?: string;
  fallbackMessage?: string;
  lang?: "en" | "es";
}

export function useChatBot(options?: UseChatBotOptions): UseChatBotReturn {
  const {
    welcomeMessage = "Hello! I'm Juan David's virtual assistant. I can tell you about his skills, projects, experience, and education. How can I help you? \u{1F60A}",
    fallbackMessage = "Interesting question. I don't have specific information about that, but I can tell you about Juan David's projects, skills, and experience. What would you like to know? \u{1F60A}",
    lang = "en",
  } = options ?? {};

  const [messages, setMessages] = useState<Message[]>(() => loadMessages(welcomeMessage));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const streamRef = useRef("");
  const langRef = useRef(lang);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    persistMessages(messages);
  }, [messages]);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initial load already handled by useState initializer
      return;
    }
  }, [welcomeMessage]);

  const sendMessage = useCallback(
    async (query: string) => {
      const userMessage: Message = {
        role: "user",
        content: query,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setStreamingContent("");
      streamRef.current = "";
      setIsLoading(true);

      const respondWithFallback = () => {
        const fallbackResponse = findFallbackResponse(
          query,
          fallbackMessage,
          langRef.current
        );
        const assistantMessage: Message = {
          role: "assistant",
          content: fallbackResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      };

      try {
        // 1. Try local RAG first (instant, no API needed)
        const localPrompt = generateLocalAnswer(query, langRef.current);
        if (localPrompt) {
          // For now, we return a synthesized response based on local knowledge
          // In a full implementation, this would call a local LLM or use the prompt
          // For this portfolio, we'll use the context to build a direct answer
          const context = buildContextFromChunks(query);
          if (context) {
            const answer = synthesizeAnswerFromContext(query, context, langRef.current);
            const assistantMessage: Message = {
              role: "assistant",
              content: answer,
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
            return;
          }
        }

        // 2. Try streaming from external API (if configured)
        const streamed = await generateResponseStream(query, langRef.current, (token) => {
          streamRef.current += token;
          setStreamingContent(streamRef.current);
        });

        if (streamed) {
          const assistantMessage: Message = {
            role: "assistant",
            content: streamed,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          return;
        }

        // 3. Try non-streaming external API
        const apiResponse = await generateResponse(query, langRef.current);

        if (apiResponse) {
          const assistantMessage: Message = {
            role: "assistant",
            content: apiResponse,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          respondWithFallback();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
        respondWithFallback();
      } finally {
        setIsLoading(false);
        setStreamingContent("");
        streamRef.current = "";
      }
    },
    [fallbackMessage]
  );

  return { messages, isLoading, error, sendMessage, streamingContent };
}

function synthesizeAnswerFromContext(query: string, context: string, lang: "en" | "es"): string {
  const isSpanish = lang === "es";
  const lowerQuery = query.toLowerCase();

  // Simple pattern-based synthesis for common question types
  if (lowerQuery.includes("mcp") || lowerQuery.includes("model context")) {
    return isSpanish
      ? `Juan David tiene amplia experiencia con MCP (Model Context Protocol). En Trajectory Inc. (área Initus) construyó 140+ herramientas MCP para Claude que exponen: consultas PostgreSQL, wrappers REST API, automatización de flujos de negocio y lógica de negocio. También creó Orion, su MCP personal con 12 herramientas para memoria, grafo de conocimiento y gestión de sesiones, usando ChromaDB + embeddings ONNX.`
      : `Juan David has extensive MCP (Model Context Protocol) experience. At Trajectory Inc. (Initus area) he built 140+ MCP tools for Claude exposing: PostgreSQL queries, REST API wrappers, business workflow automation, and business logic. He also created Orion, his personal MCP with 12 tools for memory, knowledge graph, and session management, using ChromaDB + ONNX embeddings.`;
  }

  if (lowerQuery.includes("trajectory") || lowerQuery.includes("trabajo") || lowerQuery.includes("job") || lowerQuery.includes("current")) {
    return isSpanish
      ? `Juan David trabaja como Backend Python Developer & AI Engineer en Trajectory Inc. (Canadá) desde junio 2026, remoto desde Colombia. Está en el área Initus (Backend & AI Core) construyendo un MCP empresarial para Claude con 140+ herramientas. Tech stack: Python, FastAPI, PostgreSQL, Docker, MCP, ChromaDB, ONNX.`
      : `Juan David works as Backend Python Developer & AI Engineer at Trajectory Inc. (Canada) since June 2026, remote from Colombia. He's in the Initus area (Backend & AI Core) building an enterprise MCP for Claude with 140+ tools. Tech stack: Python, FastAPI, PostgreSQL, Docker, MCP, ChromaDB, ONNX.`;
  }

  if (lowerQuery.includes("orion") || lowerQuery.includes("personal mcp")) {
    return isSpanish
      ? `Orion es su MCP personal con 12 herramientas: memoria (remember, recall, revise, forget, browse), grafo de conocimiento (link, find, browse), gestión de sesiones (remember, recall, browse) y whoami. Usa ChromaDB + embeddings ONNX (all-MiniLM-L6-v2) para búsqueda semántica híbrida. Arquitectura limpia con FastAPI, Pydantic, ruff/mypy.`
      : `Orion is his personal MCP with 12 tools: memory (remember, recall, revise, forget, browse), knowledge graph (link, find, browse), session management (remember, recall, browse), and whoami. Uses ChromaDB + ONNX embeddings (all-MiniLM-L6-v2) for hybrid semantic search. Clean architecture with FastAPI, Pydantic, ruff/mypy.`;
  }

  if (lowerQuery.includes("lucius")) {
    return isSpanish
      ? `Lucius es su framework de auditoría para agentes IA y herramientas MCP. Usa LLM-as-judge para evaluar precisión de tool-calling, detectar alucinaciones y hacer testing de regresión. Se integra en CI/CD. Está en desarrollo.`
      : `Lucius is his AI agent auditor framework for evaluating MCP tools and agents. Uses LLM-as-judge for tool-calling accuracy, hallucination detection, and regression testing. CI/CD integration. In development.`;
  }

  if (lowerQuery.includes("skill") || lowerQuery.includes("habilidad") || lowerQuery.includes("tech") || lowerQuery.includes("tecnolog")) {
    return isSpanish
      ? `Stack principal: Python (5/5), FastAPI (5/5), PostgreSQL (4/5), Docker (4/5), MCP (5/5), NLP (5/5), LLMs (4/5), Transformers (4/5), RAG (4/5), XAI (4/5), TensorFlow (4/5). Frontend secundario: React, TypeScript, Tailwind, Vue.js. DevOps: CI/CD, Railway, Netlify, Redis.`
      : `Core stack: Python (5/5), FastAPI (5/5), PostgreSQL (4/5), Docker (4/5), MCP (5/5), NLP (5/5), LLMs (4/5), Transformers (4/5), RAG (4/5), XAI (4/5), TensorFlow (4/5). Frontend (secondary): React, TypeScript, Tailwind, Vue.js. DevOps: CI/CD, Railway, Netlify, Redis.`;
  }

  if (lowerQuery.includes("project") || lowerQuery.includes("proyecto")) {
    return isSpanish
      ? `Proyectos clave: 1) MCP Corporativo Trajectory (140+ tools, Initus area), 2) Orion MCP personal (12 tools, memoria+grafo+sesiones), 3) Pequelectores (recomendador libros IA niños, TF-IDF, XAI), 4) Bootcamp IA MinTIC (33 labs ML/DL/NLP/XAI), 5) Book-Tracker (full-stack CRUD), 6) Lucius (auditor IA, en desarrollo).`
      : `Key projects: 1) Trajectory Enterprise MCP (140+ tools, Initus area), 2) Orion personal MCP (12 tools, memory+graph+sessions), 3) Pequelectores (AI book recommender for kids, TF-IDF, XAI), 4) MinTIC AI Bootcamp (33 ML/DL/NLP/XAI labs), 5) Book-Tracker (full-stack CRUD), 6) Lucius (AI auditor, in development).`;
  }

  if (lowerQuery.includes("experience") || lowerQuery.includes("experiencia") || lowerQuery.includes("work")) {
    return isSpanish
      ? `5+ años experiencia: Trajectory Inc. (2026-presente, Initus area, MCP 140+ tools), Operador Medios Tecnológicos (2021-2026, automatización Python/SQL), Bootcamp IA MinTIC (2025-2026, 33 labs), Practicante Full-Stack SENA (2022, Vue.js/PHP/Laravel).`
      : `5+ years experience: Trajectory Inc. (2026-present, Initus area, MCP 140+ tools), Technology Media Operator (2021-2026, Python/SQL automation), MinTIC AI Bootcamp (2025-2026, 33 labs), Full-Stack Intern SENA (2022, Vue.js/PHP/Laravel).`;
  }

  if (lowerQuery.includes("education") || lowerQuery.includes("educación") || lowerQuery.includes("study")) {
    return isSpanish
      ? `Ingeniería de Software (Politécnico Grancolombiano, 2026), Diplomado en Ciencias de la Computación (Politécnico, 2025), Análisis y Desarrollo de Software (SENA, 2020-2022). Bootcamp IA MinTIC 20 semanas, 33 laboratorios.`
      : `Software Engineering (Politécnico Grancolombiano, 2026), Diploma in Computer Science (Politécnico, 2025), Software Analysis & Development (SENA, 2020-2022). MinTIC AI Bootcamp 20 weeks, 33 labs.`;
  }

  // Generic response using context
  const sentences = context.split(".").filter((s) => s.trim().length > 20);
  const relevant = sentences.slice(0, 3).join(". ") + ".";

  return isSpanish
    ? `Basado en su perfil: ${relevant} ¿Quieres saber algo más específico?`
    : `Based on his profile: ${relevant} Want to know something more specific?`;
}