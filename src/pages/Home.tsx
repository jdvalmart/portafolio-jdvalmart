import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import type { Stat } from "../components/StatsBar";
import { FeaturedProjects } from "../components/FeaturedProjects";
import { SkillsPreview } from "../components/SkillsPreview";
import { projects } from "../data/projects";

const stats: Stat[] = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "AI Projects", value: 4 },
  { label: "ML Labs", value: 20, suffix: "+" },
  { label: "Bootcamp IA", value: 20, suffix: " weeks" },
];

const Home: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <div
        ref={ref}
        className={`${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        } transition-all duration-700`}
      >
        <Hero />
      </div>

      {/* Stats Bar */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <StatsBar stats={stats} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <FeaturedProjects projects={projects} />
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <SkillsPreview />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-600 dark:bg-teal-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Tienes un proyecto de IA en mente?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Construyo soluciones completas: desde el modelo de ML hasta la API y
            la interfaz. Hablemos de cómo puedo ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              Contáctame
            </a>
            <a
              href="/projects"
              className="px-8 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
