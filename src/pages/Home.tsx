import React from "react";

const Home: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto py-16s text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Hola soy <span className="text-blue-500">Juan David Valencia</span>
      </h1>

      <p className="text-gray-600 text-lg mb-4">
        Ingeniero de Software, desarrollador Full-Stack enfocado en React,
        TypeScript, Nodejs, NestJS y buenas práticas.
      </p>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["React", "TypeScript", "Tailwind", "Vite", "Nodejs", "NestJS"].map(
          (tech) => (
            <span
              key={tech}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ),
        )}
      </div>

      <a
        href="./Projects"
        className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition  "
      >
        Ver Proyectos
      </a>
    </section>
  );
};

export default Home;
