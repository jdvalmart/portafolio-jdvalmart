import { Helmet } from "react-helmet-async";
import { useState, useCallback } from "react";
import { useT } from "../i18n/useLanguage";
import { CvPdf } from "../components/CvPdf";

const CvPage = () => {
  const { t, lang } = useT();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const doc = pdf(<CvPdf lang={lang} />);
      const blob = await doc.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Juan_David_Valencia_CV_${lang.toUpperCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [lang]);

  return (
    <>
      <Helmet>
        <title>CV — Juan David Valencia | AI Developer</title>
        <meta name="description" content="Juan David Valencia — CV/Resume. Backend Python Developer & AI Engineer specializing in MCP, NLP, Backend Engineering, and production AI systems with Python, FastAPI, and LLMs." />
      </Helmet>

      <section className="max-w-4xl mx-auto py-20 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-center flex-1">{t.hero.cvBtn}</h2>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            aria-label={lang === "en" ? "Download CV as PDF" : "Descargar CV como PDF"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isGenerating ? (lang === "en" ? "Generating..." : "Generando...") : (lang === "en" ? "Download PDF" : "Descargar PDF")}
          </button>
        </div>

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
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Professional Summary" : "Resumen Profesional"}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {lang === "en"
                ? "Backend Python Developer & AI Engineer at Trajectory Inc. (Initus Area — Backend & AI Core) with 5+ years of experience. Building an enterprise MCP (Model Context Protocol) for Claude with 140+ custom tools exposing: PostgreSQL data access, REST API integrations, internal workflow automation, and business logic execution. Designing MCP tool schemas, implementing FastAPI endpoints, optimizing LLM tool-calling accuracy (>95%). Production ML pipelines: NLP (Transformers, spaCy, NLTK), XAI (LIME, SHAP, Grad-CAM), MLOps. Remote from Colombia."
                : "Backend Python Developer & AI Engineer en Trajectory Inc. (Área Initus — Backend & AI Core) con 5+ años de experiencia. Construyendo un MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas personalizadas que exponen: acceso a datos PostgreSQL, integraciones REST API, automatización de flujos internos y ejecución de lógica de negocio. Diseñando esquemas de herramientas MCP, implementando endpoints FastAPI, optimizando precisión de tool-calling de LLM (>95%). Pipelines ML en producción: NLP (Transformers, spaCy, NLTK), XAI (LIME, SHAP, Grad-CAM), MLOps. Remoto desde Colombia."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Technical Skills" : "Habilidades Técnicas"}</h3>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Programming Languages" : "Lenguajes de Programación"}</p>
                <p>{lang === "en" ? "Python (Expert), SQL (Advanced), TypeScript (Intermediate)" : "Python (Experto), SQL (Avanzado), TypeScript (Intermedio)"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI / ML Engineering" : "Ingeniería IA / ML"}</p>
                <p>{lang === "en"
                  ? "LLM fine-tuning, RAG pipelines, embedding models (ONNX), vector search (ChromaDB), model serving (FastAPI), MCP (Model Context Protocol), agent orchestration"
                  : "Fine-tuning de LLM, pipelines RAG, modelos de embedding (ONNX), búsqueda vectorial (ChromaDB), serving de modelos (FastAPI), MCP (Model Context Protocol), orquestación de agentes"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI / ML Frameworks" : "Frameworks IA / ML"}</p>
                <p>TensorFlow, scikit-learn, HuggingFace Transformers, NLTK, spaCy, LIME, SHAP, Grad-CAM</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</p>
                <p>{lang === "en" ? "PostgreSQL (Advanced), SQLAlchemy, asyncpg, Redis, data modeling, query optimization" : "PostgreSQL (Avanzado), SQLAlchemy, asyncpg, Redis, modelado de datos, optimización de consultas"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Backend & APIs" : "Backend y APIs"}</p>
                <p>{lang === "en" ? "FastAPI (Expert), REST API design, async Python, dependency injection, clean architecture" : "FastAPI (Experto), diseño de REST APIs, Python asíncrono, inyección de dependencias, arquitectura limpia"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "MLOps & Production" : "MLOps y Producción"}</p>
                <p>{lang === "en" ? "CI/CD for ML models, model registry, A/B testing, drift monitoring, Docker, observability" : "CI/CD para modelos ML, registro de modelos, A/B testing, monitoreo de drift, Docker, observabilidad"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Core Specialties" : "Especialidades Principales"}</p>
                <p>Python, SQL, AI/ML, MCP, NLP, RAG, XAI, FastAPI, PostgreSQL</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Professional Experience" : "Experiencia Profesional"}</h3>
            <div className="space-y-5 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="border-l-2 border-teal-500 pl-4">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {lang === "en" ? "Backend Python Developer | AI Engineer" : "Backend Python Developer | AI Engineer"}
                  {" "}
                  <a
                    href="https://www.trajectoryinc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Trajectory Inc.
                  </a>
                </p>
                <p className="text-xs text-zinc-400">{lang === "en" ? "Jun 1, 2026 — Present | Remote (Colombia) for Canadian company" : "1 Jun 2026 — Presente | Remoto (Colombia) para empresa canadiense"}</p>
                <p className="font-medium text-zinc-600 dark:text-zinc-400 mt-2 mb-1">{lang === "en" ? "Initus Area: Backend & AI Core" : "Área Initus: Backend & AI Core"}</p>
                <ul className="space-y-1.5 list-disc list-inside ml-2">
                  <li>{lang === "en" ? "MCP Development: Built 140+ MCP tools from ~6 initial: PostgreSQL queries, REST API wrappers, business workflow triggers, data transformation pipelines, auth/permission layers" : "Desarrollo MCP: Construcción de 140+ herramientas MCP desde ~6 iniciales: consultas PostgreSQL, wrappers REST API, triggers de flujos de negocio, pipelines de transformación de datos, capas de auth/permisos"}</li>
                  <li>{lang === "en" ? "Designed tool schemas (JSON Schema) optimizing Claude's tool-calling accuracy (>95%)" : "Diseño de esquemas de herramientas (JSON Schema) optimizando precisión de tool-calling de Claude (>95%)"}</li>
                  <li>{lang === "en" ? "Implemented MCP server with FastAPI: streaming responses, error handling, rate limiting" : "Implementación de servidor MCP con FastAPI: respuestas streaming, manejo de errores, rate limiting"}</li>
                  <li>{lang === "en" ? "Integrated with internal services: user management, billing, analytics, document processing" : "Integración con servicios internos: gestión de usuarios, facturación, analíticas, procesamiento de documentos"}</li>
                  <li>{lang === "en" ? "AI/ML Engineering: Production NLP: Transformer fine-tuning (BERT, Llama), custom tokenizers, ONNX export" : "Ingeniería IA/ML: NLP en producción: fine-tuning de Transformers (BERT, Llama), tokenizers personalizados, exportación ONNX"}</li>
                  <li>{lang === "en" ? "RAG pipelines: ChromaDB vector store, embedding models, hybrid search (keyword + semantic)" : "Pipelines RAG: almacén vectorial ChromaDB, modelos de embedding, búsqueda híbrida (keyword + semántica)"}</li>
                  <li>{lang === "en" ? "XAI integration: LIME/SHAP explanations for model decisions in production APIs" : "Integración XAI: explicaciones LIME/SHAP para decisiones de modelos en APIs de producción"}</li>
                  <li>{lang === "en" ? "MLOps: CI/CD for ML models, model registry, A/B testing framework, drift monitoring" : "MLOps: CI/CD para modelos ML, registro de modelos, framework A/B testing, monitoreo de drift"}</li>
                  <li>{lang === "en" ? "Backend Engineering: FastAPI async services: PostgreSQL (asyncpg/SQLAlchemy), Redis caching, WebSocket" : "Ingeniería Backend: Servicios async FastAPI: PostgreSQL (asyncpg/SQLAlchemy), Redis caching, WebSocket"}</li>
                  <li>{lang === "en" ? "Clean architecture: routers → services → repositories, dependency injection" : "Arquitectura limpia: routers → services → repositories, inyección de dependencias"}</li>
                  <li>{lang === "en" ? "Docker multi-stage builds, Railway/Render deployment, health checks, graceful shutdown" : "Docker multi-stage builds, despliegue en Railway/Render, health checks, graceful shutdown"}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Technology Media Operator" : "Operador de Medios Tecnológicos"}</p>
                <p className="text-xs text-zinc-400">{lang === "en" ? "2021 — May 2026" : "2021 — Mayo 2026"}</p>
                <p>{lang === "en" ? "Monitored critical security systems for 200+ users with 99% availability. Automated inventory management with Python and SQL, reducing manual work by 30%." : "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad. Automatización de gestión de inventario con Python y SQL, reduciendo trabajo manual 30%."}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI Bootcamp — MinTIC (Talento Tech)" : "Bootcamp IA — MinTIC (Talento Tech)"}</p>
                <p className="text-xs text-zinc-400">2025 — 2026</p>
                <p>{lang === "en" ? "20 intensive weeks covering ML, Deep Learning, NLP, XAI, MLOps, and Cloud. 33+ hands-on labs completed with TensorFlow, HuggingFace, and model deployment as APIs." : "20 semanas intensivas cubriendo ML, Deep Learning, NLP, XAI, MLOps y Cloud. 33+ laboratorios prácticos con TensorFlow, HuggingFace y despliegue de modelos como APIs."}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Full-Stack Developer Intern" : "Practicante Desarrollador Full-Stack"}</p>
                <p className="text-xs text-zinc-400">2022</p>
                <p>{lang === "en" ? "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Managed MySQL databases. First experience in agile teams with Scrum." : "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel. Gestión de bases de datos MySQL. Primera experiencia en equipos ágiles con Scrum."}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Education" : "Educación"}</h3>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Software Engineering" : "Ingeniería de Software"}</p>
                <p>Politécnico Grancolombiano — 2026</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Diploma in Computer Science" : "Diplomado en Ciencias de la Computación"}</p>
                <p>Politécnico Grancolombiano — 2025</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Software Analysis & Development" : "Análisis y Desarrollo de Software"}</p>
                <p>SENA — 2020-2022</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Languages" : "Idiomas"}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{lang === "en" ? "Spanish (Native), English (Intermediate)" : "Español (Nativo), Inglés (Intermedio)"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CvPage;