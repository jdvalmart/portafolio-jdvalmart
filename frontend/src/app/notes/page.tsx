import type { Metadata } from "next";
import Link from "next/link";

import { t } from "@/content/site";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Notes by Juan David Valencia on RAG, LLMs, MCP, and backend engineering: what I build and what I learn.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {t.notes.title}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">{t.notes.subtitle}</p>

      {notes.length === 0 ? (
        <p className="text-zinc-500">{t.notes.empty}</p>
      ) : (
        <ul className="space-y-10">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="group block">
                <h2 className="font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {note.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {note.description}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
                  {note.date} · {note.readingMinutes} {t.notes.minRead}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
