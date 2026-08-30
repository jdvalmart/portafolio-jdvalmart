import { projects } from "../data/projects";
import { timeline } from "../data/timeline";
import { certifications } from "../data/certifications";
import { skillGroups } from "../data/skills";

export interface KnowledgeChunk {
  id: string;
  content: string;
  source: "project" | "timeline" | "certification" | "skill" | "general";
  metadata?: Record<string, unknown>;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Vector length mismatch: ${a.length} vs ${b.length}`);
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  if (magnitude === 0) return 0;
  return dotProduct / magnitude;
}

function keywordScore(query: string, chunkContent: string): number {
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const contentLower = chunkContent.toLowerCase();

  let score = 0;
  for (const word of queryWords) {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const matches = contentLower.match(regex);
    if (matches) score += matches.length;
  }
  return score;
}

export function searchChunks(
  query: string,
  chunks: KnowledgeChunk[]
): KnowledgeChunk[] {
  const scored = chunks.map((chunk) => ({
    chunk,
    score: keywordScore(query, chunk.content),
  }));

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.chunk);
}

function generateSessionId(): string {
  const stored = sessionStorage.getItem("chat_session_id");
  if (stored) return stored;
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  sessionStorage.setItem("chat_session_id", id);
  return id;
}

function getApiUrl(): string {
  return import.meta.env.VITE_API_URL || "";
}

export async function generateResponseStream(
  query: string,
  lang: "en" | "es",
  onToken: (token: string) => void,
): Promise<string | null> {
  if (!getApiUrl()) return null;

  try {
    const sessionId = generateSessionId();
    const response = await fetch(`${getApiUrl()}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, session_id: sessionId, lang }),
    });

    if (!response.ok || !response.body) return null;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let full = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);

        if (data === "[DONE]") return full;

        try {
          const parsed = JSON.parse(data);
          if (parsed.token) {
            full += parsed.token;
            onToken(parsed.token);
          }
        } catch {
          // ignore malformed chunks
        }
      }
    }

    return full;
  } catch {
    return null;
  }
}

interface BackendChatResponse {
  response: string;
  session_id: string;
}

export async function generateResponse(
  query: string,
  lang: "en" | "es" = "en"
): Promise<string | null> {
  if (getApiUrl()) {
    try {
      const sessionId = generateSessionId();
      const response = await fetch(`${getApiUrl()}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, session_id: sessionId, lang }),
      });

      if (response.ok) {
        const data: BackendChatResponse = await response.json();
        return data.response;
      }
    } catch {
      // Backend unavailable, report failure so caller can use fallbacks
    }
  }

  return null;
}

function buildProjectChunks(): KnowledgeChunk[] {
  return projects.map((p) => ({
    id: `project-${p.id}`,
    content: `${p.title}. ${p.description}. Technologies: ${p.techs.join(", ")}. ${p.detail?.overview || ""} ${p.detail?.architecture || ""} Highlights: ${p.detail?.highlights?.join(" ") || ""} Role: ${p.detail?.role || ""}`,
    source: "project",
    metadata: { slug: p.slug, category: p.category, techs: p.techs },
  }));
}

function buildTimelineChunks(): KnowledgeChunk[] {
  return timeline.map((t) => ({
    id: `timeline-${t.year}-${t.title.replace(/\s+/g, "-").toLowerCase()}`,
    content: `${t.title} (${t.year}${t.month ? ` ${t.month}` : ""}). ${t.description}`,
    source: "timeline",
    metadata: { year: t.year, month: t.month },
  }));
}

function buildCertificationChunks(): KnowledgeChunk[] {
  return certifications.map((c, i) => ({
    id: `cert-${i}`,
    content: `Certification: ${c.name} issued by ${c.issuer}`,
    source: "certification",
    metadata: { name: c.name, issuer: c.issuer },
  }));
}

function buildSkillChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  for (const group of skillGroups) {
    for (const skill of group.skills) {
      chunks.push({
        id: `skill-${group.title}-${skill.name}`,
        content: `Skill: ${skill.name} (${group.title}) - Proficiency: ${skill.level}/5`,
        source: "skill",
        metadata: { group: group.title, name: skill.name, level: skill.level },
      });
    }
  }
  return chunks;
}

function buildGeneralChunks(): KnowledgeChunk[] {
  const general = [
    {
      id: "general-profile",
      content: `Juan David Valencia is an AI Software Developer at Trajectory Inc. (Initus Area — Backend & AI Core) since June 2026. Developing scalable AI-powered applications: researching, designing, implementing ML models; building RAG pipelines with ChromaDB and ONNX embeddings; developing enterprise MCP for Claude with 140+ tools. Full ML lifecycle: data collection, cleaning, training, evaluation, optimization, deployment. Collaborating with product team for AI features. Prior: 6-month Full-Stack internship (SENA, 2022) with Vue.js, PHP/Laravel, MySQL. 5+ years as Technology Media Operator in private security. AI Bootcamp MinTIC (2025-2026): 20 weeks, 33 labs in ML, DL, NLP, XAI. On-site in Bogotá, Colombia.`,
      source: "general" as const,
    },
    {
      id: "general-mcp",
      content: `MCP (Model Context Protocol) expertise: 140+ tools built at Trajectory Inc. Tool schema design (JSON Schema), FastAPI MCP server implementation, LLM tool-calling optimization, agent orchestration.`,
      source: "general" as const,
    },
    {
      id: "general-ai-ml",
      content: `AI/ML: ML algorithms (regression, classification, clustering, neural networks), LLM fine-tuning, RAG pipelines (ChromaDB, ONNX embeddings), vector search, model optimization, XAI (LIME, SHAP, Grad-CAM). NLP: Transformers, spaCy, NLTK, HuggingFace. Full ML lifecycle: data preparation, training, evaluation, deployment.`,
      source: "general" as const,
    },
    {
      id: "general-backend",
      content: `Backend & APIs: FastAPI, REST API design, async Python, clean architecture (routers→services→repositories), Node.js basics. Frontend: React, React Native basics, JavaScript. Full ML lifecycle: data preparation, training, evaluation, deployment.`,
      source: "general" as const,
    },
    {
      id: "general-education",
      content: `Education: Software Engineering (Politécnico Grancolombiano, 2026), Diploma in Computer Science (Politécnico Grancolombiano, 2025), Software Analysis & Development (SENA, 2020-2022). AI Bootcamp MinTIC (2025-2026): 20 weeks, 33 labs.`,
      source: "general" as const,
    },
    {
      id: "general-orion",
      content: `Orion MCP: Personal MCP server with 12 tools across memory (remember, recall, revise, forget, browse), knowledge graph (link, find, browse), session management (remember, recall, browse), and whoami. ChromaDB + ONNX embeddings for semantic search.`,
      source: "general" as const,
    },
    {
      id: "general-lucius",
      content: `Lucius: AI Agent Auditor — automated evaluation framework for AI agents and MCP tools. LLM-as-judge for tool-calling accuracy, hallucination detection, regression testing. CI/CD integration. In development.`,
      source: "general" as const,
    },
    {
      id: "general-databases",
      content: `Databases: PostgreSQL, MySQL, ChromaDB (vector search).`,
      source: "general" as const,
    },
  ];
  return general;
}

let cachedChunks: KnowledgeChunk[] | null = null;

export function getKnowledgeChunks(): KnowledgeChunk[] {
  if (cachedChunks) return cachedChunks;
  cachedChunks = [
    ...buildProjectChunks(),
    ...buildTimelineChunks(),
    ...buildCertificationChunks(),
    ...buildSkillChunks(),
    ...buildGeneralChunks(),
  ];
  return cachedChunks;
}

export function generateLocalResponse(query: string, lang: "en" | "es"): string {
  const chunks = searchChunks(query, getKnowledgeChunks());
  if (chunks.length === 0) return "";

  const relevantContent = chunks.map((c) => c.content).join("\n\n");

  const prompt = lang === "en"
    ? `Based on the following information about Juan David Valencia, answer the user's question concisely and naturally. Use only the provided information.\n\nInformation:\n${relevantContent}\n\nQuestion: ${query}\n\nAnswer:`
    : `Basándote en la siguiente información sobre Juan David Valencia, responde la pregunta del usuario de forma concisa y natural. Usa solo la información proporcionada.\n\nInformación:\n${relevantContent}\n\nPregunta: ${query}\n\nRespuesta:`;

  return prompt;
}