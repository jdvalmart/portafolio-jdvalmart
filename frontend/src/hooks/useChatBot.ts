import { useCallback, useEffect, useState } from "react";
import { searchChunks, generateResponse } from "../services/rag";
import type { KnowledgeChunk } from "../services/rag";
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
  fallbackResponses: {
    en: FallbackEntry[];
    es: FallbackEntry[];
  };
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

function findFallbackResponse(
  query: string,
  defaultResponse: string,
  lang: "en" | "es"
): string {
  const lowerQuery = query.toLowerCase();
  const entries =
    typedKnowledge.fallbackResponses[lang] ||
    typedKnowledge.fallbackResponses.en;

  for (const entry of entries) {
    const matched = entry.patterns.some((pattern) =>
      lowerQuery.includes(pattern.toLowerCase())
    );
    if (matched) {
      return entry.response;
    }
  }

  return defaultResponse;
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
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
      setIsLoading(true);

      try {
        const relevantChunks = searchChunks(query, typedKnowledge.chunks);

        const context = relevantChunks
          .map((chunk) => chunk.content)
          .join("\n\n");

        const promptContext =
          context.length > 0
            ? context
            : "No specific context found. Provide a general helpful response about Juan David's portfolio.";

        const apiResponse = await generateResponse(promptContext, query, lang);

        if (apiResponse) {
          const assistantMessage: Message = {
            role: "assistant",
            content: apiResponse,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          const fallbackResponse = findFallbackResponse(
            query,
            fallbackMessage,
            lang
          );
          const assistantMessage: Message = {
            role: "assistant",
            content: fallbackResponse,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
        const fallbackResponse = findFallbackResponse(
          query,
          fallbackMessage,
          lang
        );
        const assistantMessage: Message = {
          role: "assistant",
          content: fallbackResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [fallbackMessage, lang]
  );

  return { messages, isLoading, error, sendMessage };
}
