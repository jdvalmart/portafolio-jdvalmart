import React from "react";
import { Skills } from "../components/Skills";

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Sobre mí</h2>

        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Soy <strong>Ingeniero de Software</strong> con enfoque en desarrollo
            frontend, especializado en la construcción de interfaces modernas
            con
            <strong> React y TypeScript</strong>.
          </p>

          <p>
            Me enfoco en escribir código limpio y mantenible, aplicando buenas
            prácticas, una componentización clara y separación de
            responsabilidades. Disfruto construir soluciones escalables y
            fáciles de mantener.
          </p>

          <p>
            Finalicé mi formación como Ingeniero de Software y complementé mis
            estudios con un{" "}
            <strong>bootcamp enfocado en Inteligencia Artificial</strong>.
            Actualmente continúo fortaleciendo mis conocimientos en desarrollo
            web moderno.
          </p>

          <p>
            Estoy buscando mi primera oportunidad profesional como desarrollador
            frontend, donde pueda aportar valor desde el primer día y seguir
            creciendo en un entorno de buenas prácticas y aprendizaje continuo.
          </p>
        </div>
      </section>
      <Skills />
    </>
  );
};

export default About;
