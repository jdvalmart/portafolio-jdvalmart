"use client";

import Link from "next/link";

import { t } from "@/content/site";
import { projects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FeaturedProjects } from "./FeaturedProjects";
import { Hero } from "./Hero";
import { SkillsPreview } from "./SkillsPreview";
import { StatsBar, type Stat } from "./StatsBar";
import { TalkToCV } from "./TalkToCV";

const rawStats = t.home.stats as unknown as Stat[];
const stats: Stat[] = rawStats.map((stat, index) =>
  index === 3 ? { ...stat, isLabel: true } : stat
);

export function HomeView() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <div
        ref={ref}
        className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
      >
        <Hero />
      </div>

      <TalkToCV />

      <section className="py-12" aria-label="Key statistics">
        <div className="max-w-5xl mx-auto px-6">
          <StatsBar stats={stats} />
        </div>
      </section>

      <section className="py-16 bg-zinc-50 dark:bg-zinc-900" aria-label="Featured projects preview">
        <div className="max-w-6xl mx-auto px-6">
          <FeaturedProjects projects={projects} />
        </div>
      </section>

      <section className="py-16" aria-label="Core skills overview">
        <div className="max-w-5xl mx-auto px-6">
          <SkillsPreview />
        </div>
      </section>

      <section className="py-20 bg-teal-600 dark:bg-teal-800" aria-label="Call to action">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.home.ctaTitle}</h2>
          <p className="text-teal-100 text-lg mb-8">{t.home.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              {t.home.ctaContact}
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              {t.home.ctaProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
