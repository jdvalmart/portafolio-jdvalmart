import React from "react";
import { Skills } from "../components/Skills";

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">About Me</h2>
        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
      <Skills />
    </>
  );
};

export default About;
