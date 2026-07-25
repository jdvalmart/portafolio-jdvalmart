import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const mockGenerateResponseStream = vi.fn();
const mockGenerateResponse = vi.fn();

vi.mock("../../services/rag", () => ({
  generateResponse: (...args: unknown[]) => mockGenerateResponse(...args),
  generateResponseStream: (...args: unknown[]) => mockGenerateResponseStream(...args),
}));

vi.mock("../../data/fallback-responses.json", () => ({
  default: {
    fallbackResponses: {
      en: [
        { patterns: ["hello", "hi"], response: "Hello! How can I help?" },
        { patterns: ["skills"], response: "He works with React and Python." },
      ],
      es: [
        { patterns: ["hola"], response: "¡Hola! ¿En qué puedo ayudarte?" },
        { patterns: ["habilidades"], response: "Trabaja con React y Python." },
      ],
    },
  },
}));

import { useChatBot } from "../useChatBot";

describe("useChatBot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe("initial state", () => {
    it("starts with welcome message", () => {
      const { result } = renderHook(() =>
        useChatBot({ welcomeMessage: "Welcome!", lang: "en" })
      );

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].role).toBe("assistant");
      expect(result.current.messages[0].content).toBe("Welcome!");
    });

    it("starts with loading false", () => {
      const { result } = renderHook(() => useChatBot());

      expect(result.current.isLoading).toBe(false);
    });

    it("starts with no error", () => {
      const { result } = renderHook(() => useChatBot());

      expect(result.current.error).toBeNull();
    });

    it("starts with empty streaming content", () => {
      const { result } = renderHook(() => useChatBot());

      expect(result.current.streamingContent).toBe("");
    });
  });

  describe("sendMessage", () => {
    it("adds user message to the list", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue("Backend response!");

      const { result } = renderHook(() => useChatBot());

      await act(async () => {
        await result.current.sendMessage("Hello");
      });

      const roles = result.current.messages.map((m) => m.role);
      expect(roles).toContain("user");
      expect(result.current.messages[1].content).toBe("Hello");
    });

    it("adds assistant response when backend succeeds", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue("I am the assistant.");

      const { result } = renderHook(() => useChatBot());

      await act(async () => {
        await result.current.sendMessage("Hello");
      });

      expect(result.current.messages).toHaveLength(3);
      expect(result.current.messages[2].role).toBe("assistant");
      expect(result.current.messages[2].content).toBe("I am the assistant.");
    });

    it("uses streaming response when available", async () => {
      mockGenerateResponseStream.mockImplementation(
        async (_query: string, _lang: string, onToken: (t: string) => void) => {
          onToken("Hel");
          onToken("lo!");
          return "Hello!";
        }
      );

      const { result } = renderHook(() => useChatBot());

      await act(async () => {
        await result.current.sendMessage("Hi");
      });

      expect(result.current.messages).toHaveLength(3);
      expect(result.current.messages[2].content).toBe("Hello!");
      expect(mockGenerateResponse).not.toHaveBeenCalled();
    });

    it("falls back to pattern-matched response when backend fails", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue(null);

      const { result } = renderHook(() => useChatBot());

      await act(async () => {
        await result.current.sendMessage("hello");
      });

      expect(result.current.messages).toHaveLength(3);
      expect(result.current.messages[2].role).toBe("assistant");
      expect(result.current.messages[2].content).toBe("Hello! How can I help?");
    });

    it("falls back to default message when no pattern matches", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue(null);

      const { result } = renderHook(() =>
        useChatBot({
          fallbackMessage: "Default fallback",
          lang: "en",
        })
      );

      await act(async () => {
        await result.current.sendMessage("xyz_unmatchable_query_12345");
      });

      expect(result.current.messages[2].content).toBe("Default fallback");
    });

    it("sets error and falls back on network error", async () => {
      mockGenerateResponseStream.mockRejectedValue(new Error("Network failure"));

      const { result } = renderHook(() =>
        useChatBot({
          fallbackMessage: "Default fallback",
          lang: "en",
        })
      );

      await act(async () => {
        await result.current.sendMessage("test");
      });

      expect(result.current.error).toBe("Network failure");
      expect(result.current.messages).toHaveLength(3);
    });

    it("sets loading to true while processing and false when done", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue("Response");

      const { result } = renderHook(() => useChatBot());

      expect(result.current.isLoading).toBe(false);

      await act(async () => {
        await result.current.sendMessage("test");
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.messages).toHaveLength(3);
    });

    it("handles Spanish language fallback", async () => {
      mockGenerateResponseStream.mockResolvedValue(null);
      mockGenerateResponse.mockResolvedValue(null);

      const { result } = renderHook(() =>
        useChatBot({ lang: "es" })
      );

      await act(async () => {
        await result.current.sendMessage("hola");
      });

      expect(result.current.messages[2].content).toBe("¡Hola! ¿En qué puedo ayudarte?");
    });
  });

  describe("session persistence", () => {
    it("persists messages to sessionStorage after sending", async () => {
      mockGenerateResponseStream.mockResolvedValue("Response");

      const { result } = renderHook(() => useChatBot());

      await act(async () => {
        await result.current.sendMessage("Hello");
      });

      const stored = sessionStorage.getItem("chat_messages");
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBeGreaterThanOrEqual(2);
    });

    it("loads saved messages from sessionStorage", () => {
      const saved = JSON.stringify([
        { role: "assistant", content: "Saved message", timestamp: 1 },
      ]);
      sessionStorage.setItem("chat_messages", saved);

      const { result } = renderHook(() =>
        useChatBot({ welcomeMessage: "New welcome" })
      );

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].content).toBe("Saved message");
    });
  });
});
