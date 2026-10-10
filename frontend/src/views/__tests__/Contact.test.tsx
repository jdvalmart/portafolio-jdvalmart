import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../../hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({
    ref: vi.fn(),
    isVisible: true,
  }),
}));

import Contact from "../Contact";

describe("Contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the contact title", () => {
      render(<Contact />);
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders all form fields", () => {
      render(<Contact />);
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Subject")).toBeInTheDocument();
      expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<Contact />);
      expect(screen.getByText("Send Message")).toBeInTheDocument();
    });

    it("renders social links", () => {
      render(<Contact />);
      expect(screen.getByText("Send Email")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    it("shows success state after valid submission", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });
      render(<Contact />);

      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Subject"), {
        target: { value: "Hello there" },
      });
      fireEvent.change(screen.getByLabelText("Message"), {
        target: { value: "This is a test message for contact form." },
      });

      fireEvent.click(screen.getByText("Send Message"));

      await waitFor(() => {
        expect(screen.getByText("Thanks for reaching out!")).toBeInTheDocument();
      });
    });

    it("shows validation errors for empty fields", async () => {
      render(<Contact />);

      fireEvent.click(screen.getByText("Send Message"));

      await waitFor(() => {
        expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
      });
    });
  });
});
