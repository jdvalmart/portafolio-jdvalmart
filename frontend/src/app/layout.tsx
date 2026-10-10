import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteWidgets } from "@/components/SiteWidgets";
import { SITE_URL, site, t } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Juan David Valencia — AI Software Developer",
    template: "%s | Juan David Valencia",
  },
  description:
    "Juan David Valencia — AI Software Developer at Trajectory Inc. specializing in RAG pipelines, LLM infrastructure, MCP, Python and FastAPI.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: "Juan David Valencia — AI Software Developer",
    description:
      "AI Software Developer specializing in RAG pipelines, LLM infrastructure, and MCP. Python, FastAPI, PostgreSQL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan David Valencia — AI Software Developer",
    description:
      "AI Software Developer specializing in RAG pipelines, LLM infrastructure, and MCP.",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description:
    "AI Software Developer at Trajectory Inc. specializing in RAG, LLMs, MCP, Python, and FastAPI.",
  url: SITE_URL,
  sameAs: [site.github, site.linkedin, site.huggingface],
  email: site.email,
  knowsAbout: [
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "MCP (Model Context Protocol)",
    "Python",
    "FastAPI",
    "PostgreSQL",
  ],
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          defer
          data-domain="jdvalmartdev.netlify.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          {t.skipToContent}
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <SiteWidgets />
      </body>
    </html>
  );
}
