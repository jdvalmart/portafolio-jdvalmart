import React from "react";
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
  return (
    <>
      <Hero />

      {/* Stats Bar */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <StatsBar stats={stats} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-zinc-50">
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
    </>
  );
};

export default Home;
