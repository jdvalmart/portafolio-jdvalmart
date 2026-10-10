function generateSessionId(): string {
  const stored = sessionStorage.getItem("chat_session_id");
  if (stored) return stored;
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  sessionStorage.setItem("chat_session_id", id);
  return id;
}

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "";
}

export async function generateResponseStream(
  query: string,
  lang: "en" | "es",
  onToken: (token: string) => void
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
