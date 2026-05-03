/**
 * KnowledgeChunk type matching the chatbot-knowledge.json structure.
 * Embeddings are pre-computed float arrays; in the current implementation
 * they are sparse placeholder values. Real embeddings will be generated
 * at build time (see chatbot-knowledge.json task 1.6).
 */
export interface KnowledgeChunk {
  id: string;
  content: string;
  embedding: number[];
}

/**
 * Compute the cosine similarity between two vectors.
 * Returns a value between -1 and 1, where 1 means identical direction.
 */
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

/**
 * Score how many keywords from the query overlap with the chunk content.
 * Used as a lightweight fallback when real embeddings are not available.
 * Returns a score: number of matching keywords (case-insensitive).
 */
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

/**
 * Search for the top-3 knowledge chunks most relevant to the query.
 * Uses keyword overlap as the primary search method.
 *
 * TODO: Replace keyword matching with real embedding-based search
 * once sentence-transformers embeddings are generated at build time.
 * The cosineSimilarity function above will be used with real embeddings
 * from chatbot-knowledge.json.
 */
export function searchChunks(
  query: string,
  chunks: KnowledgeChunk[]
): KnowledgeChunk[] {
  // Attempt embedding-based search first (if embeddings seem valid)
  const hasRealEmbeddings = chunks.some(
    (c) =>
      Array.isArray(c.embedding) &&
      c.embedding.length > 0 &&
      c.embedding.some((v) => v !== 0)
  );

  if (hasRealEmbeddings) {
    // When real embeddings are generated, use cosine similarity
    const scored = chunks.map((chunk) => ({
      chunk,
      score: 0, // placeholder — real embedding similarity will go here
    }));
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.chunk);
  }

  // Fallback: keyword-based scoring
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

/**
 * Call the HuggingFace Inference API to generate a response.
 *
 * @param context - Retrieved knowledge chunks as a combined string
 * @param query - The user's original question
 * @returns The generated text, or null on any error (rate limit, server error, network failure)
 */
export async function generateResponse(
  context: string,
  query: string
): Promise<string | null> {
  const apiKey = import.meta.env.VITE_HF_API_KEY || "";

  const prompt = `<s>[INST] You are Juan David Valencia's portfolio assistant. Answer questions using ONLY the context provided below. If the context does not contain the answer, say "I don't have that information, but feel free to ask me about Juan David's skills, projects, experience, or education."

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

    // Handle rate limiting (429)
    if (response.status === 429) {
      console.warn("HF API rate limited (429). Falling back to static responses.");
      return null;
    }

    // Handle server errors (5xx)
    if (!response.ok) {
      console.warn(`HF API returned ${response.status}. Falling back to static responses.`);
      return null;
    }

    const data: unknown = await response.json();

    // HF API returns either [{ generated_text: "..." }] or an error object
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
