import React from "react";
import { Skills } from "../components/Skills";
import { Timeline } from "../components/Timeline";
import { CertBadges } from "../components/CertBadges";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useT } from "../i18n/LanguageContext";

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useT();
  return (
    <>
      <section id="about" className="max-w-5xl mx-auto py-20 px-6" aria-label="Professional profile">
        <h2 className="text-3xl font-bold mb-10 text-center text-zinc-900 dark:text-zinc-100">
          {t.about.title}
        </h2>

        <div
          ref={ref}
          className={`${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          } transition-all duration-700 space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed`}
        >
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
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
          {t.about.philosophy}
        </h2>
        <blockquote className="border-l-4 border-teal-600 dark:border-teal-400 pl-6 py-4 bg-teal-50 dark:bg-teal-950 rounded-r-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg italic">{t.about.quote}</p>
          <p className="mt-3 text-sm font-medium text-teal-600 dark:text-teal-400 not-italic">
            {t.about.quoteAuthor}
          </p>
        </blockquote>
      </section>

      {/* Current Goals */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          {t.about.goals}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🚀", text: t.about.goal1 },
            { icon: "🐳", text: t.about.goal2 },
            { icon: "🧪", text: t.about.goal3 },
            { icon: "☁️", text: t.about.goal4 },
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
