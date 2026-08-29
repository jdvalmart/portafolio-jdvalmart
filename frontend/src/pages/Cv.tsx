import { Helmet } from "react-helmet-async";
import { useT } from "../i18n/LanguageContext";

const CvPage = () => {
  const { t } = useT();

  return (
    <>
      <Helmet>
        <title>CV — Juan David Valencia | AI Developer</title>
        <meta name="description" content="Juan David Valencia — CV/Resume. AI Developer specializing in MCP, NLP, Backend Engineering, and production AI systems with Python, FastAPI, and LLMs." />
      </Helmet>

      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">{t.hero.cvBtn}</h2>

        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-6">
          {/* Name */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Juan David Valencia</h1>
            <p className="text-teal-600 dark:text-teal-400 text-lg">{t.hero.role}</p>
          </div>

          {/* Contact */}
          <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <p>Palmira, Valle del Cauca, Colombia</p>
            <p>juanvalencia9411@outlook.com</p>
            <p>linkedin.com/in/jdvalmart</p>
            <p>github.com/jdvalmart</p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Summary</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              AI Developer at Trajectory Inc. with 5+ years of experience combining
              backend engineering and AI expertise. Building an enterprise MCP for Claude with 140+ tools
              that connect company data, APIs, and workflows. Skilled in Python, FastAPI, PostgreSQL,
              Docker, LLMs, and MCP architecture. Working remotely from Colombia.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Languages</p>
                <p>Python, TypeScript, JavaScript, SQL</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">AI / ML</p>
                <p>TensorFlow, scikit-learn, HuggingFace, NLTK, spaCy, LIME, SHAP, Grad-CAM, MCP</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Backend</p>
                <p>FastAPI, NestJS, PostgreSQL, Docker</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Frontend (Secondary)</p>
                <p>React, TypeScript, Tailwind CSS, Vue.js</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">DevOps</p>
                <p>Docker, REST APIs, CI/CD, Netlify, Railway</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Specialties</p>
                <p>NLP, XAI, MCP, Transformers, Sentiment Analysis, NER</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Experience</h3>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  AI Developer —{" "}
                  <a
                    href="https://www.trajectoryinc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Trajectory Inc.
                  </a>
                </p>
                <p className="text-xs text-zinc-400">Jun 2026 — Present</p>
                <p>Developing an enterprise MCP for Claude with 140+ integrated tools in the Initus area. Connecting Claude to all company data, APIs, and workflows. Backend engineering with FastAPI and PostgreSQL. Remote from Colombia for this Canadian company.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Technology Media Operator</p>
                <p className="text-xs text-zinc-400">2021 — May 2026</p>
                <p>Monitored critical security systems for 200+ users with 99% availability. Automated inventory management with Python and SQL, reducing manual work by 30%.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">AI Bootcamp — MinTIC</p>
                <p className="text-xs text-zinc-400">2025 — 2026</p>
                <p>20 intensive weeks covering ML, Deep Learning, NLP, XAI, and MLOps. 33+ labs completed.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Full-Stack Developer Intern — SENA</p>
                <p className="text-xs text-zinc-400">2022</p>
                <p>Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Agile teams with Scrum.</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Education</h3>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Software Engineering</p>
                <p>Politecnico Grancolombiano — 2026</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Diploma in Computer Science</p>
                <p>Politecnico Grancolombiano — 2025</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Software Analysis & Development</p>
                <p>SENA — 2020-2022</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Languages</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Spanish (Native), English (Intermediate)</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CvPage;
