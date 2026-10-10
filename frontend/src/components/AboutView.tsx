"use client";

import { t } from "@/content/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CertBadges } from "./CertBadges";
import { Portrait } from "./Portrait";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";

const GOALS = [
  { icon: "🚀", text: t.about.goal1 },
  { icon: "🐳", text: t.about.goal2 },
  { icon: "🧪", text: t.about.goal3 },
  { icon: "☁️", text: t.about.goal4 },
];

export function AboutView() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <section className="max-w-5xl mx-auto pt-20 pb-12 px-6" aria-label="Professional profile">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
          <div
            ref={ref}
            className={`${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
              {t.about.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              {t.about.intro}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.about.p1}</p>
          </div>

          <div className="flex justify-center">
            <Portrait />
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-14 space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {t.about.storyTitle}
        </h2>
        <p>{t.about.story1}</p>
        <p>{t.about.story2}</p>
        <p>{t.about.p2}</p>
        <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">
          {t.about.nowTitle}
        </h3>
        <p>{t.about.now}</p>
        <p>{t.about.p3}</p>
        <div className="rounded-2xl bg-teal-50 dark:bg-teal-950 border border-teal-100 dark:border-teal-900 p-6">
          <p className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {t.about.connectTitle}
          </p>
          <p className="text-base">{t.about.connectText}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium">
            <a
              href="/contact"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              Contact
            </a>
            <a
              href="https://www.linkedin.com/in/jdvalmart/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jdvalmart"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <Timeline />
      </section>

      <section className="mb-16">
        <CertBadges />
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          {t.about.philosophy}
        </h2>
        <blockquote className="border-l-4 border-teal-600 dark:border-teal-400 pl-6 py-4 bg-teal-50 dark:bg-teal-950 rounded-r-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg italic text-center">{t.about.quote}</p>
          <p className="mt-3 text-sm font-medium text-teal-600 dark:text-teal-400 not-italic text-center">
            {t.about.quoteAuthor}
          </p>
        </blockquote>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          {t.about.goals}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GOALS.map((goal) => (
            <div
              key={goal.text}
              className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-950 border border-teal-100 dark:border-teal-900"
            >
              <span className="text-xl">{goal.icon}</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {goal.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Skills />
    </>
  );
}
