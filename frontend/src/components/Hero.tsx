import { Link, useNavigate } from "react-router-dom";
import { useT } from "../i18n/useLanguage";
import { useState, useCallback } from "react";
import { CvPdf } from "./CvPdf";

export const Hero = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);

  const handleDownloadCV = useCallback(async () => {
    setIsGeneratingCV(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const doc = pdf(<CvPdf lang={lang} />);
      const generatedBlob = await doc.toBlob();
      const url = URL.createObjectURL(generatedBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Juan_David_Valencia_CV_${lang.toUpperCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      navigate("/cv");
    } finally {
      setIsGeneratingCV(false);
    }
  }, [lang, navigate]);

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
            {t.hero.greeting}
            <br />
            <span className="text-teal-600 dark:text-teal-400">
              {t.hero.role}
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
            >
              {t.hero.projectsBtn}
            </a>

            <Link
              to="/about"
              className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition"
            >
              {t.hero.aboutBtn}
            </Link>
            <button
              onClick={handleDownloadCV}
              disabled={isGeneratingCV}
              className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              aria-label={lang === "en" ? "Download CV as PDF" : "Descargar CV como PDF"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isGeneratingCV ? (lang === "en" ? "Generating..." : "Generando...") : t.hero.cvBtn}
            </button>
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