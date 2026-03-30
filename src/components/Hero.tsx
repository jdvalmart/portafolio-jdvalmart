export const Hero = () => {
  return (
    <section className="min-h-svh flex items-start md:items-center pt-24 md:pt-0 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 break-words">
            Hi, I'm Juan David ✌🏾
            <br />
            <span className="text-indigo-600">
              Software Engineer & Full Stack Developer
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            I build scalable web applications and APIs using React, FastApi, and
            NestJS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Projects
            </a>

            <a
              href="/about"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              About Me
            </a>
            <a
              href="/cv/JuanDavidValencia_FullStackDeveloper_CV_Eng.pdf"
              download="/cv/JuanDavidValencia_FullStackDeveloper_CV_Eng.pdf"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition"
            >
              download CV
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
