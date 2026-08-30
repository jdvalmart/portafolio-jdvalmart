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
        <title>CV — Juan David Valencia | AI Software Developer</title>
        <meta name="description" content="Juan David Valencia — CV/Resume. AI Software Developer at Trajectory Inc. Specializing in Python, FastAPI, LLMs, RAG, MCP, and Machine Learning." />
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

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-full">
              {lang === "en" ? "Available: On-site, Remote, Hybrid" : "Disponible: Presencial, Remoto, Híbrido"}
            </span>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-full">
              {lang === "en" ? "Open to relocation in Colombia" : "Abierto a reubicación en Colombia"}
            </span>
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
                ? "AI Software Developer at Trajectory Inc., specialized in building scalable AI-powered applications and services for the enterprise. My focus is 100% on AI-driven software development, covering the full ML lifecycle: from algorithm research and design to deployment, optimization, and monitoring of models in production. My Software Engineering background and intensive AI bootcamp (MinTIC) enable me to combine software engineering discipline with advanced deep learning, NLP, and MLOps techniques. Previously spent 5 years monitoring critical security systems, forging operational discipline, zero-error tolerance, and high-availability principles that I now apply to building robust AI agents and data pipelines."
                : "Desarrollador de Software IA en Trajectory Inc., especializado en la construcción de aplicaciones y servicios de IA escalables para el ámbito empresarial. Mi enfoque es 100% en el desarrollo de software impulsado por inteligencia artificial, abarcando el ciclo de vida completo del machine learning: desde la investigación y diseño de algoritmos hasta el despliegue, optimización y monitoreo de modelos en producción. Mi formación como Ingeniero de Software y mi paso por un bootcamp intensivo de IA (MinTIC) me permiten unir la disciplina de la ingeniería de software con las técnicas más avanzadas de deep learning, NLP y MLOps. Antes de dedicarme a la IA, pasé 5 años monitoreando sistemas de seguridad críticos. Esa experiencia forjó mi disciplina operativa, mi tolerancia cero al error y mi habilidad para mantener sistemas con alta disponibilidad, principios que ahora aplico para construir agentes de IA y pipelines de datos robustos y confiables."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Key Technical Skills" : "Habilidades Técnicas Clave"}</h3>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI & Machine Learning" : "AI & Machine Learning"}</p>
                <p>{lang === "en"
                  ? "Models: Regression, Classification, Clustering, Neural Networks (MLP, CNN, LSTM). LLMs & RAG: Fine-tuning, RAG Pipelines, Embeddings (ONNX), Vector Search (ChromaDB). NLP & XAI: Transformers (HuggingFace), spaCy, NLTK; LIME, SHAP, Grad-CAM."
                  : "Modelos: Regresión, Clasificación, Clustering, Redes Neuronales (MLP, CNN, LSTM). LLMs & RAG: Fine-tuning, Pipelines RAG, Embeddings (ONNX), Búsqueda Vectorial (ChromaDB). NLP & XAI: Transformers (HuggingFace), spaCy, NLTK; LIME, SHAP, Grad-CAM."}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Backend & APIs" : "Backend & APIs"}</p>
                <p>{lang === "en"
                  ? "Languages: Python (Advanced), SQL, JavaScript. Frameworks: FastAPI (Expert), Node.js (Basic). Architecture: REST APIs, Async Services, Clean Architecture, MCP (Model Context Protocol)."
                  : "Lenguajes: Python (Avanzado), SQL, JavaScript. Frameworks: FastAPI (Experto), Node.js (Básico). Arquitectura: APIs REST, Servicios Async, Arquitectura Limpia, MCP (Model Context Protocol)."}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</p>
                <p>{lang === "en"
                  ? "Processing: Pandas, NumPy, Feature Engineering, Data Cleaning. Storage: PostgreSQL, MySQL, ChromaDB."
                  : "Procesamiento: Pandas, NumPy, Feature Engineering, Limpieza de Datos. Almacenamiento: PostgreSQL, MySQL, ChromaDB."}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "DevOps & Practices" : "DevOps y Prácticas"}</p>
                <p>{lang === "en"
                  ? "Tools: Git/GitHub, Docker (Basic), CI/CD (Basic). Methodologies: Agile/Scrum, Code Reviews, Testing."
                  : "Herramientas: Git/GitHub, Docker (Básico), CI/CD (Básico). Metodologías: Ágil/Scrum, Revisiones de Código, Testing."}</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Professional Experience" : "Experiencia Profesional"}</h3>
            <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="border-l-2 border-teal-500 pl-4">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {lang === "en" ? "AI Software Developer" : "Desarrollador de Software IA"}
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
                <p className="text-xs text-zinc-400">{lang === "en" ? "On-site, Bogotá · June 2026 — Present" : "Presencial, Bogotá · Junio 2026 – Presente"}</p>
                <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">{lang === "en" ? "Initus Area — Backend & AI Core" : "Área Initus — Backend & AI Core"}</p>
                <ul className="space-y-1.5 list-disc list-inside ml-2 mt-2">
                  <li>{lang === "en" ? "Enterprise AI Architecture: Develop and maintain scalable AI-powered web applications using Python, FastAPI, and React." : "Arquitectura de IA Empresarial: Desarrollo y mantenimiento de aplicaciones web escalables con IA utilizando Python, FastAPI y React."}</li>
                  <li>{lang === "en" ? "Production RAG Pipelines: Build Retrieval-Augmented Generation pipelines with ChromaDB and ONNX embeddings, implementing hybrid search and LLM integration patterns for production environments." : "Pipelines RAG en Producción: Construyo pipelines de Retrieval-Augmented Generation (RAG) con ChromaDB y embeddings ONNX, implementando búsqueda híbrida y patrones de integración LLM para entornos productivos."}</li>
                  <li>{lang === "en" ? "Enterprise MCP at Scale: Lead development of enterprise MCP (Model Context Protocol) for Claude, a 140+ tool system integrating PostgreSQL access, REST API wrappers, and complex business workflow automation." : "Desarrollo MCP a Escala: Lidero el desarrollo del MCP (Model Context Protocol) empresarial para Claude, un sistema con más de 140 herramientas que integra acceso a PostgreSQL, wrappers de APIs REST y automatización de flujos de negocio complejos."}</li>
                  <li>{lang === "en" ? "Full ML Lifecycle: Manage complete machine learning lifecycle: data collection, cleaning, preparation; training, evaluation, optimization, and deployment of models." : "Ciclo de Vida del ML: Gestiono el ciclo completo de machine learning: recolección, limpieza y preparación de datos; entrenamiento, evaluación, optimización y despliegue de modelos."}</li>
                  <li>{lang === "en" ? "Robust Backend: Develop async backend services with FastAPI, PostgreSQL, applying clean architecture principles (routers → services → repositories)." : "Backend Robusto: Desarrollo servicios backend asíncronos con FastAPI, utilizando PostgreSQL y aplicando principios de arquitectura limpia (routers → services → repositories)."}</li>
                  <li>{lang === "en" ? "Agile Collaboration: Actively collaborate with product team to define features, conduct code reviews, testing, and problem resolution in high-demand environment with Canadian team." : "Colaboración Ágil: Colaboro activamente con el equipo de producto para definir funcionalidades, realizo revisiones de código, pruebas y resolución de problemas en un entorno de alta exigencia con equipo canadiense."}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Technology Media Operator" : "Operador de Medios Tecnológicos"}</p>
                <p className="text-xs text-zinc-400">{lang === "en" ? "Palmira · 2021 — May 2026 (5 years)" : "Palmira · 2021 – Mayo 2026 (5 años)"}</p>
                <ul className="space-y-1.5 list-disc list-inside ml-2 mt-2">
                  <li>{lang === "en" ? "Critical Systems Management: Real-time monitoring of CCTV, alarms, and radiocommunications for 200+ users, maintaining 99% availability." : "Gestión de Sistemas Críticos: Monitoreo en tiempo real de sistemas CCTV, alarmas y radiocomunicaciones para más de 200 usuarios, manteniendo un 99% de disponibilidad."}</li>
                  <li>{lang === "en" ? "Python Automation: Developed automation scripts with Python and SQL for inventory management, reducing manual processing time by 30%." : "Automatización con Python: Desarrollé scripts de automatización con Python y SQL para la gestión de inventario, reduciendo el tiempo de procesamiento manual en un 30%."}</li>
                  <li>{lang === "en" ? "Operational Discipline: Rigorous process documentation, incident management, and technology infrastructure maintenance, forging a culture of reliability and zero errors." : "Disciplina Operativa: Documentación rigurosa de procesos, gestión de incidencias y mantenimiento de infraestructura tecnológica, forjando una cultura de confiabilidad y cero errores."}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Full-Stack Developer Intern" : "Practicante Desarrollador Full-Stack"}</p>
                <p className="text-xs text-zinc-400">SENA · 2022</p>
                <p className="mt-2">{lang === "en" ? "Developed interfaces with Vue.js, integrated REST APIs, and debugged JSON in Laravel projects." : "Desarrollo de interfaces con Vue.js, integración de APIs REST y depuración de JSON en proyectos con Laravel."}</p>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Featured Projects" : "Proyectos Destacados"}</h3>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Corporate MCP — Trajectory" : "MCP Corporativo — Trajectory"}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Python, FastAPI, MCP, Claude</p>
                <p className="mt-1">{lang === "en" ? "MCP server with 140+ tools connecting Claude to all enterprise data and workflows." : "Servidor MCP con 140+ herramientas conectando a Claude con toda la información y flujos empresariales."}</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Pequelectores</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">React, TypeScript, FastAPI, Python, scikit-learn</p>
                <p className="mt-1">{lang === "en" ? "Children's book recommender with TF-IDF + Cosine Similarity, XAI, gamification, JWT auth." : "Sistema de recomendación de libros infantiles con TF-IDF + Cosine Similarity, XAI y gamificación con auth JWT."}</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">MachineDeepLearning</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Python, TensorFlow, scikit-learn, XAI</p>
                <p className="mt-1">{lang === "en" ? "20+ practical labs covering EDA, supervised/unsupervised ML, NLP, neural networks, model deployment." : "20+ laboratorios prácticos cubriendo EDA, ML supervisado/no supervisado, NLP, redes neuronales y despliegue de modelos."}</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">XAI CIFAR-10</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Python, TensorFlow, LIME, SHAP, Grad-CAM</p>
                <p className="mt-1">{lang === "en" ? "CNN with 87.14% accuracy on CIFAR-10, implementing three XAI techniques for computer vision models." : "CNN con 87.14% de precisión en CIFAR-10, implementando tres técnicas de explicabilidad para modelos de visión por computadora."}</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">Book Tracker</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">React, TypeScript, FastAPI, PostgreSQL, Docker</p>
                <p className="mt-1">{lang === "en" ? "Complete CRUD app with documented REST API, Docker Compose containerization, cloud deployment." : "Aplicación CRUD completa con API REST documentada, contenerización con Docker Compose y despliegue en la nube."}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{lang === "en" ? "Education & Certifications" : "Formación y Certificaciones"}</h3>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Software Engineering" : "Ingeniería de Software"}</p>
                <p>Politécnico Grancolombiano — 2026</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "AI Bootcamp (Basic & Intermediate) — Talento Tech, MinTIC" : "Bootcamp Inteligencia Artificial (Básico e Intermedio) — Talento Tech, MinTIC"}</p>
                <p>{lang === "en" ? "20 intensive weeks: Machine Learning, Deep Learning (MLP, CNN, LSTM), NLP, XAI, MLOps." : "20 semanas intensivas: Machine Learning, Deep Learning (MLP, CNN, LSTM), NLP, XAI, MLOps."}</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Diploma in Computer Science" : "Diplomado en Ciencias de la Computación"}</p>
                <p>Politécnico Grancolombiano — 2025</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Software Analysis & Development Technologist" : "Tecnólogo en Análisis y Desarrollo de Software"}</p>
                <p>SENA — 2020–2022</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">{lang === "en" ? "Certifications" : "Certificaciones"}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{lang === "en" ? "Python · FastAPI · PostgreSQL · Docker · Git & GitHub · React · TypeScript · Machine Learning · Deep Learning" : "Python · FastAPI · PostgreSQL · Docker · Git & GitHub · React · TypeScript · Machine Learning · Deep Learning"}</p>
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