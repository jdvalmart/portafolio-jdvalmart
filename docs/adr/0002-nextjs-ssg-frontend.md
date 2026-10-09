# 0002 — Migrate the frontend to Next.js App Router (SSG)

- Status: Accepted
- Date: 2026-10-08

## Context

The current frontend is a client-rendered React SPA built with Vite. The server
returns an empty HTML shell and the content is painted by JavaScript, so search
engines and link previews cannot reliably read the page. For a portfolio whose
main distribution channel is search and social sharing, this is a critical
weakness.

## Decision

Migrate the frontend to **Next.js (App Router)** and render pages statically
(SSG). Use the framework Metadata API for per-page metadata and Open Graph tags,
`next/image` for optimized images, and `sitemap.ts` / `robots.ts` for discovery.

The chatbot remains a client component that calls the FastAPI backend over SSE.

## Consequences

- Pages ship as pre-rendered HTML, improving SEO and first paint.
- Native support for a Markdown/MDX notes section and image optimization.
- A one-time migration cost: pages, routing, and SEO move from
  `react-helmet-async` to the App Router conventions.
- The site becomes English-only, removing the i18n layer and its duplicated
  content.
