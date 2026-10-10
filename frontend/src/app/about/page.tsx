import type { Metadata } from "next";

import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Juan David Valencia — AI Software Developer at Trajectory Inc. building RAG pipelines, LLM infrastructure, and MCP integrations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
