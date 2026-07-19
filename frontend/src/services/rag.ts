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

const HF_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

export async function generateResponse(
  context: string,
  query: string,
  lang: "en" | "es" = "en"
): Promise<string | null> {
  const apiKey = import.meta.env.VITE_HF_API_KEY || "";

  const isSpanish = lang === "es";
  const systemPrompt = isSpanish
    ? `Eres el asistente del portafolio de Juan David Valencia. Responde en español usando SOLO el contexto proporcionado. Si el contexto no contiene la respuesta, di "No tengo esa informacion, pero puedes preguntarme sobre las habilidades, proyectos, experiencia o educacion de Juan David."`
    : `You are Juan David Valencia's portfolio assistant. Answer questions using ONLY the context provided below. If the context does not contain the answer, say "I don't have that information, but feel free to ask me about Juan David's skills, projects, experience, or education."`;

  const prompt = `<s>[INST] ${systemPrompt}

Context:
${context}

Question: ${query} [/INST]`;

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
    });

    if (response.status === 429) {
      console.warn("HF API rate limited (429). Falling back to static responses.");
      return null;
    }

    if (!response.ok) {
      console.warn(`HF API returned ${response.status}. Falling back to static responses.`);
      return null;
    }

    const data: unknown = await response.json();

    if (
      Array.isArray(data) &&
      data.length > 0 &&
      typeof data[0] === "object" &&
      data[0] !== null &&
      "generated_text" in data[0]
    ) {
      return (data[0] as { generated_text: string }).generated_text.trim();
    }

    console.warn("Unexpected HF API response format:", data);
    return null;
  } catch (error) {
    console.warn("HF API call failed:", error);
    return null;
  }
}
