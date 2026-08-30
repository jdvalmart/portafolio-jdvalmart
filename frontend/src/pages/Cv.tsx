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
        <title>CV — Juan David Valencia | Backend Python Developer</title>
        <meta name="description" content="Juan David Valencia — CV/Resume. Backend Python Developer & AI Engineer at Trajectory Inc. Specializing in Python, SQL, MCP, FastAPI, and AI/ML systems." />
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
            <p>Bogotá, Colombia</p>
            <p>juanvalencia9411@outlook.com</p>
            <p>linkedin.com/in/jdvalmart</p>
            <p>github.com/jdvalmart</p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Professional Summary" : "Resumen Profesional"}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {lang === "en"
                ? "AI Software Developer at Trajectory Inc. (Initus Area — Backend & AI Core) since June 2026. Developing and maintaining scalable AI-powered applications: researching, designing, and implementing ML models; building RAG pipelines with ChromaDB and ONNX embeddings; developing enterprise MCP (Model Context Protocol) for Claude with 140+ tools. Full ML lifecycle: data collection, cleaning, model training, evaluation, optimization, and deployment. Collaborating with product team to deliver AI-based features. Prior: 6-month Full-Stack internship (SENA, 2022) with Vue.js, PHP/Laravel, MySQL. 5+ years as Technology Media Operator in private security. AI Bootcamp MinTIC (2025-2026): 20 weeks, 33 labs in ML, DL, NLP, XAI. On-site in Bogotá, Colombia."
                : "Desarrollador de Software IA en Trajectory Inc. (Área Initus — Backend & AI Core) desde junio 2026. Desarrollando y manteniendo aplicaciones escalables con IA: investigando, diseñando e implementando modelos ML; construyendo pipelines RAG con ChromaDB y embeddings ONNX; desarrollando MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas. Ciclo completo de ML: recolección y limpieza de datos, entrenamiento, evaluación, optimización y despliegue de modelos. Colaboración con equipo de producto para entregar funcionalidades basadas en IA. Previa: prácticas Full-Stack 6 meses (SENA, 2022) con Vue.js, PHP/Laravel, MySQL. 5+ años como Operador de Medios Tecnológicos en seguridad privada. Bootcamp IA MinTIC (2025-2026): 20 semanas, 33 labs ML, DL, NLP, XAI. Presencial en Bogotá, Colombia."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Technical Skills" : "Habilidades Técnicas"}</h3>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Programming Languages" : "Lenguajes de Programación"}</p>
                <p>{lang === "en" ? "Python, SQL, JavaScript" : "Python, SQL, JavaScript"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI / ML Engineering" : "Ingeniería IA / ML"}</p>
                <p>{lang === "en"
                  ? "ML algorithms (regression, classification, clustering, neural networks), LLM fine-tuning, RAG pipelines, embedding models (ONNX), vector search (ChromaDB), model serving (FastAPI), MCP, agent orchestration, model optimization"
                  : "Algoritmos ML (regresión, clasificación, clustering, redes neuronales), fine-tuning de LLM, pipelines RAG, modelos de embedding (ONNX), búsqueda vectorial (ChromaDB), serving de modelos (FastAPI), MCP, orquestación de agentes, optimización de modelos"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</p>
                <p>{lang === "en" ? "PostgreSQL, MySQL, ChromaDB, data cleaning, preprocessing, feature engineering" : "PostgreSQL, MySQL, ChromaDB, limpieza de datos, preprocesamiento, feature engineering"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Backend & APIs" : "Backend y APIs"}</p>
                <p>{lang === "en" ? "FastAPI, REST API design, async Python, clean architecture, Node.js basics" : "FastAPI, diseño de REST APIs, Python asíncrono, arquitectura limpia, Node.js básico"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Frontend & Mobile" : "Frontend y Móvil"}</p>
                <p>{lang === "en" ? "React, React Native basics, Vue.js basics" : "React, React Native básico, Vue.js básico"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Tools & Practices" : "Herramientas y Prácticas"}</p>
                <p>{lang === "en" ? "Docker (basic), Git, CI/CD basics, Linux/Unix, code reviews, testing, agile/Scrum" : "Docker (básico), Git, CI/CD básico, Linux/Unix, revisiones de código, pruebas, ágil/Scrum"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Core Specialties" : "Especialidades Principales"}</p>
                <p>Python, SQL, JavaScript, AI/ML, MCP, FastAPI, PostgreSQL, ChromaDB, RAG, LLMs</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Development Experience" : "Experiencia en Desarrollo"}</h3>
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
                <p className="text-xs text-zinc-400">{lang === "en" ? "Jun 2026 — Present | On-site Bogotá, Colombia (Canadian company)" : "Jun 2026 — Presente | Presencial Bogotá, Colombia (empresa canadiense)"}</p>
                <p className="font-medium text-zinc-600 dark:text-zinc-400 mt-2 mb-1">{lang === "en" ? "Initus Area: Backend & AI Core" : "Área Initus: Backend & AI Core"}</p>
                <ul className="space-y-1.5 list-disc list-inside ml-2">
                  <li>{lang === "en" ? "Develop and maintain scalable AI-powered web applications using Python, FastAPI, and React" : "Desarrollar y mantener aplicaciones web escalables con IA usando Python, FastAPI y React"}</li>
                  <li>{lang === "en" ? "Research, design, and implement ML models: algorithm selection, data preparation, training, evaluation, and optimization" : "Investigar, diseñar e implementar modelos ML: selección de algoritmos, preparación de datos, entrenamiento, evaluación y optimización"}</li>
                  <li>{lang === "en" ? "Build RAG pipelines with ChromaDB, ONNX embeddings, hybrid search; LLM integration patterns for production" : "Construir pipelines RAG con ChromaDB, embeddings ONNX, búsqueda híbrida; patrones de integración LLM para producción"}</li>
                  <li>{lang === "en" ? "Develop enterprise MCP (Model Context Protocol) for Claude with 140+ tools: PostgreSQL access, REST API wrappers, workflow automation, business logic" : "Desarrollar MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas: acceso PostgreSQL, wrappers REST API, automatización de flujos, lógica de negocio"}</li>
                  <li>{lang === "en" ? "Full ML lifecycle: data collection, cleaning, model training, evaluation, deployment, and monitoring" : "Ciclo completo de ML: recolección y limpieza de datos, entrenamiento, evaluación, despliegue y monitoreo de modelos"}</li>
                  <li>{lang === "en" ? "Collaborate with product team to define and deliver AI-based features; code reviews, testing, and problem resolution" : "Colaborar con equipo de producto para definir y entregar funcionalidades IA; revisiones de código, pruebas y resolución de problemas"}</li>
                  <li>{lang === "en" ? "Backend: FastAPI async services, PostgreSQL, clean architecture (routers→services→repositories)" : "Backend: Servicios async FastAPI, PostgreSQL, arquitectura limpia (routers→services→repositories)"}</li>
                  <li>{lang === "en" ? "Docker (basic), Git, CI/CD pipelines, on-site collaboration with Canadian team" : "Docker (básico), Git, pipelines CI/CD, colaboración presencial con equipo canadiense"}</li>
                </ul>
              </div>
              <div className="border-l-2 border-teal-500 pl-4">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Full-Stack Developer Intern (6 months)" : "Practicante Desarrollador Full-Stack (6 meses)"}</p>
                <p className="text-xs text-zinc-400">2022</p>
                <p>{lang === "en" ? "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel. Managed MySQL databases. Agile teams with Scrum. 6-month internship at SENA." : "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel. Gestión de bases de datos MySQL. Equipos ágiles con Scrum. Prácticas de 6 meses en SENA."}</p>
              </div>
            </div>
          </div>

          {/* Other Experience */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Other Experience" : "Otra Experiencia"}</h3>
            <div className="space-y-5 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Technology Media Operator" : "Operador de Medios Tecnológicos"}</p>
                <p className="text-xs text-zinc-400">{lang === "en" ? "2021 — May 2026" : "2021 — Mayo 2026"}</p>
                <p>{lang === "en" ? "Monitored critical security systems for 200+ users with 99% availability. Managed inventory and logistics operations in private security sector." : "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad. Gestión de inventario y operaciones logísticas en sector de seguridad privada."}</p>
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
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI Bootcamp — MinTIC (Talento Tech)" : "Bootcamp IA — MinTIC (Talento Tech)"}</p>
                <p>{lang === "en" ? "20 intensive weeks: ML, Deep Learning, NLP, XAI, MLOps, Cloud. 33+ labs with TensorFlow, HuggingFace, model deployment as APIs." : "20 semanas intensivas: ML, Deep Learning, NLP, XAI, MLOps, Cloud. 33+ labs con TensorFlow, HuggingFace, despliegue de modelos como APIs."}</p>
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