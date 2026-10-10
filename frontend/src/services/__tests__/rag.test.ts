import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateResponse } from "../rag";

describe("generateResponse", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns response text on successful backend API response", async () => {
    const mockResponse = { response: "Hello! I am the portfolio assistant.", session_id: "abc123" };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await generateResponse("Who are you?");
    expect(result).toBe("Hello! I am the portfolio assistant.");
  });

  it("returns null when backend returns non-ok status", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });

    const result = await generateResponse("Who are you?");
    expect(result).toBeNull();
  });

  it("returns null on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    const result = await generateResponse("Who are you?");
    expect(result).toBeNull();
  });

  it("returns null when no API URL is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");

    const result = await generateResponse("Who are you?");
    expect(result).toBeNull();
  });
});
