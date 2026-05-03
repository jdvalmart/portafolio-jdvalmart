import { useCallback, useState } from "react";
import { searchChunks, generateResponse } from "../services/rag";
import type { KnowledgeChunk } from "../services/rag";
// Static knowledge base and fallback responses
import knowledge from "../data/chatbot-knowledge.json";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface FallbackEntry {
  patterns: string[];
  response: string;
}

interface KnowledgeData {
  chunks: KnowledgeChunk[];
  fallbackResponses: FallbackEntry[];
}

interface ChatBotState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

interface ChatBotActions {
  sendMessage: (query: string) => Promise<void>;
}

type UseChatBotReturn = ChatBotState & ChatBotActions;

const typedKnowledge = knowledge as unknown as KnowledgeData;

/**
 * Look up a fallback response by matching the query against pattern arrays.
 * Returns the first matching response, or a default message if nothing matches.
 */
function findFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  const entries = typedKnowledge.fallbackResponses;

  for (const entry of entries) {
    const matched = entry.patterns.some((pattern) =>
      lowerQuery.includes(pattern.toLowerCase())
    );
    if (matched) {
      return entry.response;
    }
  }

  return "Interesante pregunta. No tengo información específica sobre eso, pero puedo hablarte sobre los proyectos, habilidades y experiencia de Juan David. ¿Qué te gustaría saber? 😊";
}

/**
 * Custom hook that manages the chatbot state and message sending flow.
 *
 * Flow:
 * 1. Adds the user message to the messages array
 * 2. Sets loading state to true
 * 3. Searches knowledge chunks using keyword matching (rag.ts)
 * 4. Constructs a prompt with retrieved context
 * 5. Calls the HuggingFace Inference API
 * 6. On success: adds the assistant response to messages
 * 7. On failure: falls back to a static response from the knowledge base
 */
export function useChatBot(): UseChatBotReturn {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente virtual de Juan David. Puedo hablarte sobre sus habilidades, proyectos, experiencia y formación. ¿En qué puedo ayudarte? 😊",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (query: string) => {
    // 1) Add user message
    const userMessage: Message = {
      role: "user",
      content: query,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      // 2) & 3) Search relevant knowledge chunks
      // Uses keyword matching as the primary search method for now.
      // TODO: When real sentence-transformers embeddings are generated at
      // build time, replace this with embedding-based cosine similarity
      // search using the cosineSimilarity function from rag.ts.
      const relevantChunks = searchChunks(
        query,
        typedKnowledge.chunks
      );

      // 4) Construct context prompt
      const context = relevantChunks
        .map((chunk) => chunk.content)
        .join("\n\n");

      const promptContext =
        context.length > 0
          ? context
          : "No specific context found. Provide a general helpful response about Juan David's portfolio.";

      // 5) & 6) Call HF API
      const apiResponse = await generateResponse(promptContext, query);

      if (apiResponse) {
        // 7) Add assistant response from API
        const assistantMessage: Message = {
          role: "assistant",
          content: apiResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // 7 fallback) Use static fallback response
        const fallbackResponse = findFallbackResponse(query);
        const assistantMessage: Message = {
          role: "assistant",
          content: fallbackResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      // Catch-all error handler
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado.";
      setError(message);
      // Still provide a fallback response on error
      const fallbackResponse = findFallbackResponse(query);
      const assistantMessage: Message = {
        role: "assistant",
        content: fallbackResponse,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, error, sendMessage };
}
