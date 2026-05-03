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
            Hi, I'm Juan David
            <br />
            <span className="text-teal-600 dark:text-teal-400">
              AI Engineer & ML Engineer
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            From security tech operations to AI Engineer. I build complete
            applications — from ML pipelines to production APIs —
            integrating machine learning to solve real-world problems.
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
          <svg
            viewBox="0 0 200 200"
            className="w-72 h-72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="AI & Machine Learning illustration"
          >
            {/* Neural network nodes */}
            <circle cx="40" cy="40" r="6" className="fill-teal-500" />
            <circle cx="100" cy="30" r="6" className="fill-teal-600" />
            <circle cx="160" cy="40" r="6" className="fill-teal-500" />
            <circle cx="40" cy="100" r="8" className="fill-teal-600" />
            <circle cx="100" cy="100" r="10" className="fill-teal-500" />
            <circle cx="160" cy="100" r="8" className="fill-teal-600" />
            <circle cx="40" cy="160" r="6" className="fill-teal-500" />
            <circle cx="100" cy="170" r="6" className="fill-teal-600" />
            <circle cx="160" cy="160" r="6" className="fill-teal-500" />
            {/* Connections */}
            <line x1="46" y1="40" x2="94" y2="36" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="106" y1="36" x2="154" y2="40" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="46" y1="46" x2="94" y2="92" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="106" y1="36" x2="94" y2="92" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="154" y1="46" x2="106" y2="92" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="46" y1="160" x2="94" y2="164" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="106" y1="164" x2="154" y2="160" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="48" y1="106" x2="94" y2="108" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="106" y1="108" x2="152" y2="106" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="48" y1="94" x2="48" y2="154" className="stroke-teal-300" strokeWidth="1.5" />
            <line x1="152" y1="94" x2="152" y2="154" className="stroke-teal-300" strokeWidth="1.5" />
            {/* Data pulse animation */}
            <circle cx="100" cy="100" r="4" className="fill-teal-600">
              <animate attributeName="r" values="4;14;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
};
