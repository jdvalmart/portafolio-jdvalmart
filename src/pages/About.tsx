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
        <h2 className="text-3xl font-bold mb-10 text-center text-zinc-900 dark:text-zinc-100">About Me</h2>
        <div
          ref={ref}
          className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed`}
        >
          <p>
            AI Engineer & ML Engineer with a focus on NLP and interpretable AI.
            I build machine learning pipelines, train models with transformers,
            and deploy APIs that make AI accessible and explainable.
          </p>

          <p>
            Bootcamp MINTIC — Ministerio de Tecnologías de Colombia. Two
            intensive 10-week cycles: Basic (ML, NLP, Big Data) and Intermediate
            (Deep Learning, XAI). Applied CNNs to CIFAR-10 with LIME, SHAP, and
            Grad-CAM explainability techniques.
          </p>

          <p>
            Skilled in the full ML lifecycle: data preprocessing with pandas,
            model training with TensorFlow and scikit-learn, NLP with spaCy and
            HuggingFace transformers, and model serving via FastAPI. Currently
            building real-world AI projects to deploy in production.
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
        <blockquote className="border-l-4 border-teal-600 dark:border-teal-400 pl-6 py-4 my-8 bg-teal-50 dark:bg-teal-950 rounded-r-lg italic text-zinc-700 dark:text-zinc-300">
          "My professional philosophy: I'm not a developer who just codes — I
          build complete applications integrating machine learning models to
          solve real-world problems."
        </blockquote>
      </section>

      <Skills />
    </>
  );
};

export default About;
