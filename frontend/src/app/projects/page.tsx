import type { Metadata } from "next";

import Projects from "@/views/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Juan David Valencia across AI engineering, RAG, LLMs, MCP, and full-stack development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
