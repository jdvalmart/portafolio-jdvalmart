import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx";
import { t } from "@/content/site";
import { getNote, getNoteSlugs } from "@/lib/notes";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      publishedTime: note.date,
      tags: note.tags,
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <Link
        href="/notes"
        className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline mb-8"
      >
        {t.notes.backToNotes}
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {note.title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-8">
        {note.date} · {note.readingMinutes} {t.notes.minRead}
      </p>

      <div className="mt-6">
        <MDXRemote source={note.content} components={mdxComponents} />
      </div>

      {note.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-3">
            {t.notes.tags}
          </p>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
