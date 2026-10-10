import type { Metadata } from "next";

import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Juan David Valencia — open to AI engineering, RAG, LLM, and backend opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
