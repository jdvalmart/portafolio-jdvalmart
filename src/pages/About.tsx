import React from "react";
import { Skills } from "../components/Skills";
import { Timeline } from "../components/Timeline";
import { CertBadges } from "../components/CertBadges";
import { useScrollReveal } from "../hooks/useScrollReveal";

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <section id="about" className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-zinc-900 dark:text-zinc-100">
          About Me
        </h2>

        <div
          ref={ref}
          className={`${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          } transition-all duration-700 space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed`}
        >
          <p>
            I'm a <strong className="text-zinc-800 dark:text-zinc-200">Software Engineer</strong>{" "}
            with <strong className="text-teal-600 dark:text-teal-400">4 years of experience</strong>{" "}
            in technology environments. I combine{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">Full-Stack</strong>{" "}
            development (React, FastAPI, NestJS, PostgreSQL) with a specialization in{" "}
            <strong className="text-teal-600 dark:text-teal-400">
              Artificial Intelligence and NLP
            </strong>
            , acquired through MinTIC's 20-week AI bootcamp.
          </p>

          <p>
            I'm not just a dev who codes — I build complete applications{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">
              integrating machine learning models
            </strong>{" "}
            to solve real-world problems. I'm passionate about automating
            processes, documenting everything I do, and working in teams with a
            focus on results.
          </p>

          <p>
            My experience ranges from inventory automation with Python and SQL
            in the private security sector, to developing recommendation systems
            with TF-IDF, CNN classifiers with XAI explainability, and advanced
            NLP labs with Transformers and HuggingFace.
          </p>

          <p>
            I'm currently building real AI projects deployed to production,
            combining FastAPI for model serving, React for interfaces, and
            Docker for containerization. My focus is on making AI{" "}
            <strong className="text-teal-600 dark:text-teal-400">
              accessible, interpretable, and useful
            </strong>
            .
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <Timeline />
      </section>

      {/* Certifications */}
      <section className="mb-16">
        <CertBadges />
      </section>

      {/* Professional Philosophy */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          Philosophy
        </h2>
        <blockquote className="border-l-4 border-teal-600 dark:border-teal-400 pl-6 py-4 bg-teal-50 dark:bg-teal-950 rounded-r-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg italic">
            "I'm not just a dev who codes — I build complete applications
            integrating machine learning models to solve real-world problems.
            I'm passionate about automating processes, documenting everything I
            do, and working in teams with a focus on results."
          </p>
          <p className="mt-3 text-sm font-medium text-teal-600 dark:text-teal-400 not-italic">
            — Juan David Valencia
          </p>
        </blockquote>
      </section>

      {/* Current Goals */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          Current Goals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🚀", text: "Ship a real AI project with an NLP API" },
            { icon: "🐳", text: "MLOps: model deployment with Docker + FastAPI" },
            { icon: "🧪", text: "Testing across all projects" },
            { icon: "☁️", text: "Cloud certification (AWS/GCP)" },
          ].map((goal) => (
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
};

export default About;
