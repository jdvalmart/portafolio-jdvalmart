import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "src/content/notes");

export interface NoteMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
}

export interface Note extends NoteMeta {
  content: string;
}

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getNote(slug: string): Note | null {
  const file = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    content,
  };
}

export function getAllNotes(): NoteMeta[] {
  return getNoteSlugs()
    .map((slug) => getNote(slug))
    .filter((note): note is Note => note !== null)
    .map((note) => ({
      slug: note.slug,
      title: note.title,
      description: note.description,
      date: note.date,
      tags: note.tags,
      readingMinutes: note.readingMinutes,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
