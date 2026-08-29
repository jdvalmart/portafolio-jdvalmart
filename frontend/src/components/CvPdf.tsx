import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({ family: "Helvetica", fonts: [{ src: "https://cdn.jsdelivr.net/npm/@react-pdf/renderer@3.4.2/fonts/Helvetica/Helvetica.ttf" }] });
Font.register({ family: "Helvetica-Bold", fonts: [{ src: "https://cdn.jsdelivr.net/npm/@react-pdf/renderer@3.4.2/fonts/Helvetica/Helvetica-Bold.ttf" }] });
Font.register({ family: "Helvetica-Oblique", fonts: [{ src: "https://cdn.jsdelivr.net/npm/@react-pdf/renderer@3.4.2/fonts/Helvetica/Helvetica-Oblique.ttf" }] });
Font.register({ family: "Helvetica-BoldOblique", fonts: [{ src: "https://cdn.jsdelivr.net/npm/@react-pdf/renderer@3.4.2/fonts/Helvetica/Helvetica-BoldOblique.ttf" }] });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#18181b",
    fontFamily: "Helvetica",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  role: {
    fontSize: 12,
    color: "#0d9488",
    marginBottom: 16,
    fontFamily: "Helvetica",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0d9488",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 6,
    borderBottom: "1px solid #e4e4e7",
    paddingBottom: 2,
    fontFamily: "Helvetica-Bold",
  },
  contactLine: {
    fontSize: 9,
    color: "#52525b",
    marginBottom: 1,
  },
  summaryText: {
    fontSize: 9.5,
    color: "#3f3f46",
    marginBottom: 8,
    textAlign: "justify",
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#27272a",
    marginTop: 6,
    marginBottom: 2,
    fontFamily: "Helvetica-Bold",
  },
  skillList: {
    fontSize: 9,
    color: "#52525b",
    marginBottom: 4,
  },
  expTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#18181b",
    marginTop: 10,
    marginBottom: 1,
    fontFamily: "Helvetica-Bold",
  },
  expCompany: {
    fontSize: 9,
    color: "#0d9488",
    marginBottom: 1,
  },
  expDate: {
    fontSize: 8.5,
    color: "#71717a",
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 8.5,
    color: "#3f3f46",
    marginBottom: 2,
    marginLeft: 8,
  },
  eduTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#18181b",
    marginTop: 8,
    marginBottom: 1,
    fontFamily: "Helvetica-Bold",
  },
  eduSchool: {
    fontSize: 9,
    color: "#52525b",
    marginBottom: 4,
  },
  langText: {
    fontSize: 9,
    color: "#3f3f46",
    marginTop: 4,
  },
  bullet: {
    fontSize: 8.5,
    color: "#3f3f46",
    marginBottom: 1.5,
    marginLeft: 8,
  },
  divider: {
    borderBottom: "0.5px solid #e4e4e7",
    marginVertical: 8,
  },
});

interface CvPdfProps {
  lang: "en" | "es";
}

export const CvPdf = ({ lang }: CvPdfProps) => {
  const translations = {
    en: {
      summary: "Backend Python Developer & AI Engineer at Trajectory Inc. (Initus Area — Backend & AI Core) with 5+ years of experience. Building an enterprise MCP (Model Context Protocol) for Claude with 140+ custom tools exposing: PostgreSQL data access, REST API integrations, internal workflow automation, and business logic execution. Designing MCP tool schemas, implementing FastAPI endpoints, optimizing LLM tool-calling accuracy. Production ML pipelines: NLP (Transformers, spaCy, NLTK), XAI (LIME, SHAP, Grad-CAM), MLOps. Remote from Colombia.",
      contact: {
        location: "Palmira, Valle del Cauca, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      skills: {
        languages: "Python (Expert), SQL (Advanced), TypeScript (Intermediate)",
        ai_ml: "LLM fine-tuning, RAG pipelines, embedding models (ONNX), vector search (ChromaDB), model serving (FastAPI), MCP (Model Context Protocol), agent orchestration",
        ai_ml_tools: "TensorFlow, scikit-learn, HuggingFace Transformers, NLTK, spaCy, LIME, SHAP, Grad-CAM",
        data_databases: "PostgreSQL (Advanced), SQLAlchemy, asyncpg, Redis, data modeling, query optimization",
        backend_apis: "FastAPI (Expert), REST API design, async Python, dependency injection, clean architecture",
        mlops: "CI/CD for ML models, model registry, A/B testing, drift monitoring, Docker, observability",
        specialties: "Python, SQL, AI/ML, MCP, NLP, RAG, XAI, FastAPI, PostgreSQL",
      },
      experience: [
        {
          title: "Backend Python Developer | AI Engineer",
          company: "Trajectory Inc. — Initus Area (Backend & AI Core)",
          date: "Jun 1, 2026 — Present | Remote (Colombia) for Canadian company",
          details: [
            "MCP Development: Built 140+ MCP tools from ~6 initial: PostgreSQL queries, REST API wrappers, business workflow triggers, data transformation pipelines, auth/permission layers",
            "Designed tool schemas (JSON Schema) optimizing Claude's tool-calling accuracy (>95%)",
            "Implemented MCP server with FastAPI: streaming responses, error handling, rate limiting",
            "Integrated with internal services: user management, billing, analytics, document processing",
            "AI/ML Engineering: Production NLP: Transformer fine-tuning (BERT, Llama), custom tokenizers, ONNX export",
            "RAG pipelines: ChromaDB vector store, embedding models, hybrid search (keyword + semantic)",
            "XAI integration: LIME/SHAP explanations for model decisions in production APIs",
            "MLOps: CI/CD for ML models, model registry, A/B testing framework, drift monitoring",
            "Backend Engineering: FastAPI async services: PostgreSQL (asyncpg/SQLAlchemy), Redis caching, WebSocket",
            "Clean architecture: routers → services → repositories, dependency injection",
            "Docker multi-stage builds, Railway/Render deployment, health checks, graceful shutdown",
          ],
        },
        {
          title: "Technology Media Operator",
          company: "Private Security Sector",
          date: "2021 — May 2026",
          details: [
            "Monitored critical security systems for 200+ users with 99% availability",
            "Automated inventory management with Python and SQL, reducing manual work by 30%",
            "Discovered passion for automation and backend development",
          ],
        },
        {
          title: "AI Bootcamp — MinTIC (Talento Tech)",
          company: "",
          date: "2025 — 2026",
          details: [
            "20 intensive weeks covering ML, Deep Learning, NLP, XAI, MLOps, and Cloud",
            "33+ hands-on labs completed with TensorFlow, HuggingFace, and model deployment as APIs",
            "CNN image classifier achieving 87.14% accuracy on CIFAR-10 with XAI explainability",
            "Transformer fine-tuning with HuggingFace for text classification and NER",
            "Big Data processing with Apache Spark and distributed messaging with Apache Kafka",
          ],
        },
        {
          title: "Full-Stack Developer Intern",
          company: "SENA",
          date: "2022",
          details: [
            "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel",
            "Managed MySQL databases",
            "First experience in agile teams with Scrum",
          ],
        },
      ],
      education: [
        { title: "Software Engineering", school: "Politécnico Grancolombiano — 2026" },
        { title: "Diploma in Computer Science", school: "Politécnico Grancolombiano — 2025" },
        { title: "Software Analysis & Development", school: "SENA — 2020-2022" },
      ],
      languages: "Spanish (Native), English (Intermediate)",
      sections: {
        summary: "PROFESSIONAL SUMMARY",
        skills: "TECHNICAL SKILLS",
        experience: "PROFESSIONAL EXPERIENCE",
        education: "EDUCATION",
        languages: "LANGUAGES",
      },
    },
    es: {
      summary: "Backend Python Developer & AI Engineer en Trajectory Inc. (Área Initus — Backend & AI Core) con 5+ años de experiencia. Construyendo un MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas personalizadas que exponen: acceso a datos PostgreSQL, integraciones REST API, automatización de flujos internos y ejecución de lógica de negocio. Diseñando esquemas de herramientas MCP, implementando endpoints FastAPI, optimizando precisión de tool-calling de LLM. Pipelines ML en producción: NLP (Transformers, spaCy, NLTK), XAI (LIME, SHAP, Grad-CAM), MLOps. Remoto desde Colombia.",
      contact: {
        location: "Palmira, Valle del Cauca, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      skills: {
        languages: "Python (Experto), SQL (Avanzado), TypeScript (Intermedio)",
        ai_ml: "Fine-tuning de LLM, pipelines RAG, modelos de embedding (ONNX), búsqueda vectorial (ChromaDB), serving de modelos (FastAPI), MCP (Model Context Protocol), orquestación de agentes",
        ai_ml_tools: "TensorFlow, scikit-learn, HuggingFace Transformers, NLTK, spaCy, LIME, SHAP, Grad-CAM",
        data_databases: "PostgreSQL (Avanzado), SQLAlchemy, asyncpg, Redis, modelado de datos, optimización de consultas",
        backend_apis: "FastAPI (Experto), diseño de REST APIs, Python asíncrono, inyección de dependencias, arquitectura limpia",
        mlops: "CI/CD para modelos ML, registro de modelos, A/B testing, monitoreo de drift, Docker, observabilidad",
        specialties: "Python, SQL, IA/ML, MCP, NLP, RAG, XAI, FastAPI, PostgreSQL",
      },
      experience: [
        {
          title: "Backend Python Developer | AI Engineer",
          company: "Trajectory Inc. — Área Initus (Backend & AI Core)",
          date: "1 Jun 2026 — Presente | Remoto (Colombia) para empresa canadiense",
          details: [
            "Desarrollo MCP: Construcción de 140+ herramientas MCP desde ~6 iniciales: consultas PostgreSQL, wrappers REST API, triggers de flujos de negocio, pipelines de transformación de datos, capas de auth/permisos",
            "Diseño de esquemas de herramientas (JSON Schema) optimizando precisión de tool-calling de Claude (>95%)",
            "Implementación de servidor MCP con FastAPI: respuestas streaming, manejo de errores, rate limiting",
            "Integración con servicios internos: gestión de usuarios, facturación, analíticas, procesamiento de documentos",
            "Ingeniería IA/ML: NLP en producción: fine-tuning de Transformers (BERT, Llama), tokenizers personalizados, exportación ONNX",
            "Pipelines RAG: almacén vectorial ChromaDB, modelos de embedding, búsqueda híbrida (keyword + semántica)",
            "Integración XAI: explicaciones LIME/SHAP para decisiones de modelos en APIs de producción",
            "MLOps: CI/CD para modelos ML, registro de modelos, framework A/B testing, monitoreo de drift",
            "Ingeniería Backend: Servicios async FastAPI: PostgreSQL (asyncpg/SQLAlchemy), Redis caching, WebSocket",
            "Arquitectura limpia: routers → services → repositories, inyección de dependencias",
            "Docker multi-stage builds, despliegue en Railway/Render, health checks, graceful shutdown",
          ],
        },
        {
          title: "Operador de Medios Tecnológicos",
          company: "Sector Seguridad Privada",
          date: "2021 — Mayo 2026",
          details: [
            "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad",
            "Automatización de gestión de inventario con Python y SQL, reduciendo trabajo manual 30%",
            "Descubrimiento de pasión por automatización y desarrollo backend",
          ],
        },
        {
          title: "Bootcamp IA — MinTIC (Talento Tech)",
          company: "",
          date: "2025 — 2026",
          details: [
            "20 semanas intensivas cubriendo ML, Deep Learning, NLP, XAI, MLOps y Cloud",
            "33+ laboratorios prácticos con TensorFlow, HuggingFace y despliegue de modelos como APIs",
            "Clasificador CNN con 87.14% accuracy en CIFAR-10 con explicabilidad XAI",
            "Fine-tuning de Transformers con HuggingFace para clasificación de texto y NER",
            "Procesamiento Big Data con Apache Spark y mensajería distribuida con Apache Kafka",
          ],
        },
        {
          title: "Practicante Desarrollador Full-Stack",
          company: "SENA",
          date: "2022",
          details: [
            "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel",
            "Gestión de bases de datos MySQL",
            "Primera experiencia en equipos ágiles con Scrum",
          ],
        },
      ],
      education: [
        { title: "Ingeniería de Software", school: "Politécnico Grancolombiano — 2026" },
        { title: "Diplomado en Ciencias de la Computación", school: "Politécnico Grancolombiano — 2025" },
        { title: "Análisis y Desarrollo de Software", school: "SENA — 2020-2022" },
      ],
      languages: "Español (Nativo), Inglés (Intermedio)",
      sections: {
        summary: "RESUMEN PROFESIONAL",
        skills: "HABILIDADES TÉCNICAS",
        experience: "EXPERIENCIA PROFESIONAL",
        education: "EDUCACIÓN",
        languages: "IDIOMAS",
      },
    },
  };

  const tr = translations[lang];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>Juan David Valencia</Text>
        <Text style={styles.role}>{lang === "en" ? "Backend Python Developer & AI Engineer" : "Backend Python Developer & AI Engineer"}</Text>

        {/* Contact */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
          <Text style={styles.contactLine}>{tr.contact.location}</Text>
          <Text style={styles.contactLine}>{tr.contact.email}</Text>
          <Text style={styles.contactLine}>{tr.contact.linkedin}</Text>
          <Text style={styles.contactLine}>{tr.contact.github}</Text>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <Text style={styles.sectionTitle}>{tr.sections.summary}</Text>
        <Text style={styles.summaryText}>{tr.summary}</Text>

        {/* Skills */}
        <Text style={styles.sectionTitle}>{tr.sections.skills}</Text>
        <Text style={styles.skillCategory}>Languages</Text>
        <Text style={styles.skillList}>{tr.skills.languages}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "AI / ML Engineering" : "Ingeniería IA / ML"}</Text>
        <Text style={styles.skillList}>{tr.skills.ai_ml}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "AI / ML Frameworks" : "Frameworks IA / ML"}</Text>
        <Text style={styles.skillList}>{tr.skills.ai_ml_tools}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</Text>
        <Text style={styles.skillList}>{tr.skills.data_databases}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Backend & APIs" : "Backend y APIs"}</Text>
        <Text style={styles.skillList}>{tr.skills.backend_apis}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "MLOps & Production" : "MLOps y Producción"}</Text>
        <Text style={styles.skillList}>{tr.skills.mlops}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Core Specialties" : "Especialidades Principales"}</Text>
        <Text style={styles.skillList}>{tr.skills.specialties}</Text>

        <View style={styles.divider} />

        {/* Experience */}
        <Text style={styles.sectionTitle}>{tr.sections.experience}</Text>
        {tr.experience.map((exp, i) => (
          <View key={i}>
            <Text style={styles.expTitle}>{exp.title}</Text>
            {exp.company && <Text style={styles.expCompany}>{exp.company}</Text>}
            <Text style={styles.expDate}>{exp.date}</Text>
            {exp.details.map((detail, j) => (
              <Text key={j} style={styles.bullet}>• {detail}</Text>
            ))}
          </View>
        ))}

        <View style={styles.divider} />

        {/* Education */}
        <Text style={styles.sectionTitle}>{tr.sections.education}</Text>
        {tr.education.map((edu, i) => (
          <View key={i}>
            <Text style={styles.eduTitle}>{edu.title}</Text>
            <Text style={styles.eduSchool}>{edu.school}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        {/* Languages */}
        <Text style={styles.sectionTitle}>{tr.sections.languages}</Text>
        <Text style={styles.langText}>{tr.languages}</Text>
      </Page>
    </Document>
  );
};

export default CvPdf;