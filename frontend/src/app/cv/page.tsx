import type { Metadata } from "next";

import CvPage from "@/views/Cv";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Juan David Valencia — CV/Resume. AI Software Developer specializing in Python, FastAPI, LLMs, RAG, and MCP.",
  alternates: { canonical: "/cv" },
};

export default function Page() {
  return <CvPage />;
}
