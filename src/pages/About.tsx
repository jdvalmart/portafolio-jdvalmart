import React from "react";
import { Skills } from "../components/Skills";

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">About Me</h2>
        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Software Engineer with a strong focus on backend development,
            specializing in building scalable APIs and web applications using
            FastAPI, NestJS, and PostgreSQL.
          </p>

          <p>
            Experienced in developing full stack applications, integrating
            modern frontend solutions with React, and designing efficient,
            maintainable backend architectures.
          </p>

          <p>
            Currently expanding my expertise in Artificial Intelligence,
            applying Python and data-driven approaches to develop smarter and
            more intelligent solutions.
          </p>
        </div>
      </section>
      <Skills />
    </>
  );
};

export default About;
