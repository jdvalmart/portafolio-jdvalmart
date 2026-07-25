import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockSendMessage = vi.fn();
const mockUseChatBot = vi.fn();
const mockUseT = vi.fn();

Element.prototype.scrollIntoView = vi.fn();

vi.mock("../../hooks/useChatBot", () => ({
  useChatBot: (...args: unknown[]) => mockUseChatBot(...args),
}));

vi.mock("../../i18n/LanguageContext", () => ({
  useT: () => mockUseT(),
}));

import ChatBot from "../../components/ChatBot";

const defaultChatState = {
  messages: [
    { role: "assistant" as const, content: "Welcome!", timestamp: 1 },
  ],
  isLoading: false,
  error: null,
  streamingContent: "",
  sendMessage: mockSendMessage,
};

const defaultT = {
  t: {
    chatbot: {
      welcome: "Welcome!",
      assistant: "AI Assistant",
      placeholder: "Ask anything...",
      sendMessage: "Send",
      closeChat: "Close",
      openChat: "Open",
      fallback: "Fallback",
    },
  },
  lang: "en" as const,
  setLang: vi.fn(),
};

describe("ChatBot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseChatBot.mockReturnValue(defaultChatState);
    mockUseT.mockReturnValue(defaultT);
  });

  describe("rendering", () => {
    it("renders the FAB button", () => {
      render(<ChatBot />);
      expect(screen.getByLabelText("Open")).toBeInTheDocument();
    });

    it("shows chat panel when FAB is clicked", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    it("shows welcome message in the panel", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByText("Welcome!")).toBeInTheDocument();
    });

    it("hides FAB when panel is open", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      const closeButtons = screen.getAllByLabelText("Close");
      expect(closeButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("input", () => {
    it("renders text input when panel is open", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByPlaceholderText("Ask anything...")).toBeInTheDocument();
    });

    it("disables input when loading", () => {
      mockUseChatBot.mockReturnValue({
        ...defaultChatState,
        isLoading: true,
      });
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByPlaceholderText("Ask anything...")).toBeDisabled();
    });

    it("calls sendMessage on Enter key", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      const input = screen.getByPlaceholderText("Ask anything...");
      fireEvent.change(input, { target: { value: "Hello" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockSendMessage).toHaveBeenCalledWith("Hello");
    });

    it("calls sendMessage on send button click", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      const input = screen.getByPlaceholderText("Ask anything...");
      fireEvent.change(input, { target: { value: "Test message" } });
      fireEvent.click(screen.getByLabelText("Send"));
      expect(mockSendMessage).toHaveBeenCalledWith("Test message");
    });

    it("does not send empty messages", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      const input = screen.getByPlaceholderText("Ask anything...");
      fireEvent.change(input, { target: { value: "   " } });
      fireEvent.click(screen.getByLabelText("Send"));
      expect(mockSendMessage).not.toHaveBeenCalled();
    });
  });

  describe("streaming", () => {
    it("shows streaming content", () => {
      mockUseChatBot.mockReturnValue({
        ...defaultChatState,
        streamingContent: "Typing...",
      });
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByText("Typing...")).toBeInTheDocument();
    });
  });

  describe("error", () => {
    it("displays error message when present", () => {
      mockUseChatBot.mockReturnValue({
        ...defaultChatState,
        error: "Something went wrong",
      });
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  describe("close", () => {
    it("closes panel on close button click", () => {
      render(<ChatBot />);
      fireEvent.click(screen.getByLabelText("Open"));
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();

      const closeButtons = screen.getAllByLabelText("Close");
      const headerCloseBtn = closeButtons.find(
        (btn) => !btn.classList.contains("fixed")
      );
      fireEvent.click(headerCloseBtn!);

      expect(screen.getByLabelText("Open")).toBeVisible();
    });
  });
});
