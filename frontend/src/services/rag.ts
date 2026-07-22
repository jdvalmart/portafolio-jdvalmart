export interface KnowledgeChunk {
  id: string;
  content: string;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vector length mismatch: ${a.length} vs ${b.length}`
    );
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
    .filter((w) => w.length > 1);

  const contentLower = chunkContent.toLowerCase();

  let score = 0;
  for (const word of queryWords) {
    if (contentLower.includes(word)) {
      score += 1;
    }
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
    .slice(0, 3)
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
      body: JSON.stringify({
        query,
        session_id: sessionId,
        lang,
      }),
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
        body: JSON.stringify({
          query,
          session_id: sessionId,
          lang,
        }),
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
