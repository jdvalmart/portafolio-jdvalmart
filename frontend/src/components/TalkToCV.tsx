"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { t } from "@/content/site";
import { projects } from "@/data/projects";

export function TalkToCV() {
  const [value, setValue] = useState("");

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    window.dispatchEvent(new CustomEvent("open-cv-chat", { detail: { query: trimmed } }));
    setValue("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(value);
  };

  const featured = projects.slice(0, 3);

  return (
    <section
      className="py-16 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800"
      aria-label="Talk to my CV"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">
          <span className="animate-token" aria-hidden="true">
            ●
          </span>
          {t.home.talkEyebrow}
        </p>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {t.home.talkTitle}
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">{t.home.talkSubtitle}</p>

        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t.home.talkPlaceholder}
            aria-label={t.home.talkPlaceholder}
            className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
          >
            {t.home.talkCta}
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {t.home.talkPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => ask(prompt)}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-sm">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              {project.title} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
