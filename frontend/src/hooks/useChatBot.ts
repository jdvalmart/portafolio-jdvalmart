import { useCallback, useEffect, useState, useRef } from "react";
import { searchChunks, generateResponse, generateResponseStream } from "../services/rag";
import type { KnowledgeChunk } from "../services/rag";
import chunksData from "@shared/data/chunks.json";
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

const typedChunks = chunksData as KnowledgeChunk[];
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

  const [messages, setMessages] = useState<Message[]>(() => loadMessages(welcomeMessage));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const streamRef = useRef("");
  const langRef = useRef(lang);

  langRef.current = lang;

  useEffect(() => {
    persistMessages(messages);
  }, [messages]);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          timestamp: Date.now(),
        },
      ]);
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

      try {
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
          setStreamingContent("");
          streamRef.current = "";
          setIsLoading(false);
          return;
        }

        const relevantChunks = searchChunks(query, typedChunks);

        const context = relevantChunks
          .map((chunk) => chunk.content)
          .join("\n\n");

        const promptContext =
          context.length > 0
            ? context
            : "No specific context found. Provide a general helpful response about Juan David's portfolio.";

        const apiResponse = await generateResponse(promptContext, query, langRef.current);

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
            langRef.current
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
          langRef.current
        );
        const assistantMessage: Message = {
          role: "assistant",
          content: fallbackResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
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
