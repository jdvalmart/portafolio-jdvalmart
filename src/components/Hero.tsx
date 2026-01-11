export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Ingeniero de Software <br />
            <span className="text-indigo-600">
              Frontend Developer con React y TypeScript
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Desarrollo aplicaciones web modernas con enfoque en buenas
            prácticas, arquitectura limpia y experiencia de usuario.
          </p>

          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl">
            Ingeniero de Software con formación en desarrollo web moderno. He
            construido proyectos con React, TypeScript y Tailwind CSS, y
            finalicé un bootcamp enfocado en Inteligencia Artificial.
          </p>

          <div className="flex gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Ver proyectos
            </a>

            <a
              href="/about"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              Sobre mí
            </a>
            <a
              href="/cv/Juan-David-Valencia-cv.pdf"
              download="/cv/Juan-David-Valencia-cv.pdf"
              rel="noopener noreferrer"
              className="px-6 py-3 text-zinc-700 dark:text-zinc-400 hover:underline transition"
            >
              Descargar CV
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="hidden md:flex justify-center">
          <img
            src="/lanzamiento.gif"
            alt="Ilustración desarrollo web"
            className="w-80"
          />
        </div>
      </div>
    </section>
  );
};
