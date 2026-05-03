export const Hero = () => {
  return (
    <section className="relative min-h-svh flex items-start md:items-center pt-24 md:pt-0 overflow-x-hidden bg-[linear-gradient(to_bottom_right,#f0fdfa,#ecfeff)] dark:bg-[linear-gradient(to_bottom_right,#0f172a,#042f2e)]">
      {/* CSS grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.teal.300/15)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 break-words">
            Hi, I'm Juan David ✌🏾
            <br />
            <span className="text-teal-600 dark:text-teal-400">
              AI Engineer & ML Engineer
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            I build ML/NLP solutions with transformers and deploy models via
            FastAPI. From data pipelines to interpretable AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
            >
              Projects
            </a>

            <a
              href="/about"
              className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition"
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
            alt="AI & ML Engineering illustration"
            loading="lazy"
            className="w-80"
          />
        </div>
      </div>
    </section>
  );
};
