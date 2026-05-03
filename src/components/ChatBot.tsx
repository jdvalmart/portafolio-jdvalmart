import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { useChatBot } from "../hooks/useChatBot";
import type { Message } from "../hooks/useChatBot";
import { useT } from "../i18n/LanguageContext";

/**
 * Typing indicator — three animated dots.
 */
function TypingIndicator() {
  return (
    <div
      className="
        self-start max-w-[80%] px-4 py-2.5
        bg-zinc-100 dark:bg-zinc-800
        rounded-2xl rounded-bl-sm
      "
    >
      <div className="flex gap-1.5 py-1">
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/**
 * Chat message bubble with styling based on role.
 */
function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`
        max-w-[80%] px-4 py-2.5 text-sm leading-relaxed
        ${
          isUser
            ? "self-end bg-teal-600 text-white rounded-2xl rounded-br-sm"
            : "self-start bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-bl-sm"
        }
      `}
    >
      {message.content}
    </div>
  );
}

/**
 * Lazy-loadable ChatBot component.
 *
 * Uses useChatBot hook for state management and message sending.
 * Renders a FAB toggle button and a slide-in chat panel with
 * message bubbles, typing indicator, and auto-scroll.
 *
 * Must be a default export for React.lazy() compatibility.
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { t, lang } = useT();
  const { messages, isLoading, error, sendMessage } = useChatBot({
    welcomeMessage: t.chatbot.welcome,
    fallbackMessage: t.chatbot.fallback,
    lang,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the panel animation start
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage(trimmed);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* FAB Toggle Button */}
      <button
        onClick={togglePanel}
        aria-label={isOpen ? t.chatbot.closeChat : t.chatbot.openChat}
        className={`
          fixed bottom-6 left-6 z-50
          w-14 h-14 rounded-full
          bg-teal-600 hover:bg-teal-700
          dark:bg-teal-600 dark:hover:bg-teal-500
          text-white
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}
        `}
      >
        <span className="text-2xl" role="img" aria-hidden="true">
          💬
        </span>
      </button>

      {/* Chat Panel */}
      <div
        className={`
          fixed bottom-24 left-6 z-50
          w-[380px] max-w-[calc(100vw-2rem)]
          bg-white dark:bg-zinc-900
          rounded-2xl shadow-2xl
          border border-zinc-200 dark:border-zinc-700
          flex flex-col
          transition-all duration-300 ease-out origin-bottom-right
          ${
            isOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        style={{ height: "32rem", maxHeight: "calc(100vh - 7rem)" }}
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            px-4 py-3
            border-b border-zinc-200 dark:border-zinc-700
            shrink-0
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                w-2.5 h-2.5 rounded-full
                bg-teal-500 dark:bg-teal-400
              "
              aria-hidden="true"
            />
            <h3
              className="
                text-sm font-semibold
                text-zinc-800 dark:text-zinc-200
              "
            >
              {t.chatbot.assistant}
            </h3>
          </div>
          <button
            onClick={togglePanel}
            aria-label={t.chatbot.closeChat}
            className="
              w-7 h-7 flex items-center justify-center rounded-lg
              text-zinc-400 hover:text-zinc-600
              dark:text-zinc-500 dark:hover:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Message Area */}
        <div
          className="
            flex-1 overflow-y-auto
            px-4 py-4
            flex flex-col gap-3
          "
        >
          {messages.map((msg, i) => (
            <ChatBubble key={`${msg.role}-${msg.timestamp}-${i}`} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          {/* Error display */}
          {error && (
            <div
              className="
                self-center px-3 py-1.5 rounded-lg
                bg-red-50 dark:bg-red-950
                text-red-600 dark:text-red-400
                text-xs font-medium
              "
            >
              {error}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className="
            flex items-center gap-2
            px-4 py-3
            border-t border-zinc-200 dark:border-zinc-700
            shrink-0
          "
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chatbot.placeholder}
            disabled={isLoading}
            className="
              flex-1 px-3 py-2
              text-sm
              bg-zinc-100 dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              rounded-xl
              text-zinc-800 dark:text-zinc-200
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-teal-500
              disabled:opacity-50
            "
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label={t.chatbot.sendMessage}
            className="
              w-9 h-9 flex items-center justify-center
              rounded-xl
              bg-teal-600 hover:bg-teal-700
              dark:bg-teal-600 dark:hover:bg-teal-500
              text-white
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors shrink-0
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
