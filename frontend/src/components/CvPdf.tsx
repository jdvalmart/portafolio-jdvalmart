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
  badge: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#0d9488",
    backgroundColor: "#f0fdfa",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});

interface CvPdfProps {
  lang: "en" | "es";
}

export const CvPdf = ({ lang }: CvPdfProps) => {
  const translations = {
    en: {
      summary: "AI Software Developer at Trajectory Inc., specialized in building scalable AI-powered applications and services for the enterprise. My focus is 100% on AI-driven software development, covering the full ML lifecycle: from algorithm research and design to deployment, optimization, and monitoring of models in production. My Software Engineering background and intensive AI bootcamp (MinTIC) enable me to combine software engineering discipline with advanced deep learning, NLP, and MLOps techniques. Previously spent 5 years monitoring critical security systems, forging operational discipline, zero-error tolerance, and high-availability principles that I now apply to building robust AI agents and data pipelines.",
      contact: {
        location: "Bogotá, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      badges: [
        "Available: On-site, Remote, Hybrid",
        "Open to relocation in Colombia",
      ],
      skills: {
        ai_ml: "Models: Regression, Classification, Clustering, Neural Networks (MLP, CNN, LSTM). LLMs & RAG: Fine-tuning, RAG Pipelines, Embeddings (ONNX), Vector Search (ChromaDB). NLP & XAI: Transformers (HuggingFace), spaCy, NLTK; LIME, SHAP, Grad-CAM.",
        backend_apis: "Languages: Python (Advanced), SQL, JavaScript. Frameworks: FastAPI (Expert), Node.js (Basic). Architecture: REST APIs, Async Services, Clean Architecture, MCP (Model Context Protocol).",
        data_databases: "Processing: Pandas, NumPy, Feature Engineering, Data Cleaning. Storage: PostgreSQL, MySQL, ChromaDB.",
        devops_practices: "Tools: Git/GitHub, Docker (Basic), CI/CD (Basic). Methodologies: Agile/Scrum, Code Reviews, Testing.",
      },
      devExperience: [
        {
          title: "AI Software Developer",
          company: "Trajectory Inc. — Initus Area (Backend & AI Core)",
          date: "Jun 2026 — Present | On-site Bogotá, Colombia (Canadian company)",
          details: [
            "Enterprise AI Architecture: Develop and maintain scalable AI-powered web applications using Python, FastAPI, and React.",
            "Production RAG Pipelines: Build Retrieval-Augmented Generation pipelines with ChromaDB and ONNX embeddings, implementing hybrid search and LLM integration patterns for production environments.",
            "Enterprise MCP at Scale: Lead development of enterprise MCP (Model Context Protocol) for Claude, a 140+ tool system integrating PostgreSQL access, REST API wrappers, and complex business workflow automation.",
            "Full ML Lifecycle: Manage complete machine learning lifecycle: data collection, cleaning, preparation; training, evaluation, optimization, and deployment of models.",
            "Robust Backend: Develop async backend services with FastAPI, PostgreSQL, applying clean architecture principles (routers → services → repositories).",
            "Agile Collaboration: Actively collaborate with product team to define features, conduct code reviews, testing, and problem resolution in high-demand environment with Canadian team.",
          ],
        },
        {
          title: "Full-Stack Developer Intern (6 months)",
          company: "SENA",
          date: "2022",
          details: [
            "Built frontend interfaces with Vue.js and backend APIs with PHP/Laravel",
            "Managed MySQL databases",
            "Agile teams with Scrum. 6-month internship at SENA",
          ],
        },
      ],
      otherExperience: [
        {
          title: "Technology Media Operator",
          company: "Private Security Sector",
          date: "2021 — May 2026",
          details: [
            "Critical Systems Management: Real-time monitoring of CCTV, alarms, and radiocommunications for 200+ users, maintaining 99% availability.",
            "Python Automation: Developed automation scripts with Python and SQL for inventory management, reducing manual processing time by 30%.",
            "Operational Discipline: Rigorous process documentation, incident management, and technology infrastructure maintenance, forging a culture of reliability and zero errors.",
          ],
        },
      ],
      education: [
        { title: "Software Engineering", school: "Politécnico Grancolombiano — 2026" },
        { title: "AI Bootcamp (Basic & Intermediate) — Talento Tech, MinTIC", school: "2025 — 2026 | 20 weeks, 33 labs: ML, DL, NLP, XAI, MLOps, Cloud" },
        { title: "Diploma in Computer Science", school: "Politécnico Grancolombiano — 2025" },
        { title: "Software Analysis & Development Technologist", school: "SENA — 2020-2022" },
      ],
      certifications: "Python · FastAPI · PostgreSQL · Docker · Git & GitHub · React · TypeScript · Machine Learning · Deep Learning",
      languages: "Spanish (Native), English (Intermediate)",
      sections: {
        summary: "PROFESSIONAL SUMMARY",
        skills: "KEY TECHNICAL SKILLS",
        devExperience: "DEVELOPMENT EXPERIENCE",
        otherExperience: "OTHER EXPERIENCE",
        education: "EDUCATION & CERTIFICATIONS",
        languages: "LANGUAGES",
      },
    },
    es: {
      summary: "Desarrollador de Software IA en Trajectory Inc., especializado en la construcción de aplicaciones y servicios de IA escalables para el ámbito empresarial. Mi enfoque es 100% en el desarrollo de software impulsado por inteligencia artificial, abarcando el ciclo de vida completo del machine learning: desde la investigación y diseño de algoritmos hasta el despliegue, optimización y monitoreo de modelos en producción. Mi formación como Ingeniero de Software y mi paso por un bootcamp intensivo de IA (MinTIC) me permiten unir la disciplina de la ingeniería de software con las técnicas más avanzadas de deep learning, NLP y MLOps. Antes de dedicarme a la IA, pasé 5 años monitoreando sistemas de seguridad críticos. Esa experiencia forjó mi disciplina operativa, mi tolerancia cero al error y mi habilidad para mantener sistemas con alta disponibilidad, principios que ahora aplico para construir agentes de IA y pipelines de datos robustos y confiables.",
      contact: {
        location: "Bogotá, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      badges: [
        "Disponible: Presencial, Remoto, Híbrido",
        "Abierto a reubicación en Colombia",
      ],
      skills: {
        ai_ml: "Modelos: Regresión, Clasificación, Clustering, Redes Neuronales (MLP, CNN, LSTM). LLMs & RAG: Fine-tuning, Pipelines RAG, Embeddings (ONNX), Búsqueda Vectorial (ChromaDB). NLP & XAI: Transformers (HuggingFace), spaCy, NLTK; LIME, SHAP, Grad-CAM.",
        backend_apis: "Lenguajes: Python (Avanzado), SQL, JavaScript. Frameworks: FastAPI (Experto), Node.js (Básico). Arquitectura: APIs REST, Servicios Async, Arquitectura Limpia, MCP (Model Context Protocol).",
        data_databases: "Procesamiento: Pandas, NumPy, Feature Engineering, Limpieza de Datos. Almacenamiento: PostgreSQL, MySQL, ChromaDB.",
        devops_practices: "Herramientas: Git/GitHub, Docker (Básico), CI/CD (Básico). Metodologías: Ágil/Scrum, Revisiones de Código, Testing.",
      },
      devExperience: [
        {
          title: "Desarrollador de Software IA",
          company: "Trajectory Inc. — Área Initus (Backend & AI Core)",
          date: "Jun 2026 — Presente | Presencial Bogotá, Colombia (empresa canadiense)",
          details: [
            "Arquitectura de IA Empresarial: Desarrollo y mantenimiento de aplicaciones web escalables con IA utilizando Python, FastAPI y React.",
            "Pipelines RAG en Producción: Construyo pipelines de Retrieval-Augmented Generation (RAG) con ChromaDB y embeddings ONNX, implementando búsqueda híbrida y patrones de integración LLM para entornos productivos.",
            "Desarrollo MCP a Escala: Lidero el desarrollo del MCP (Model Context Protocol) empresarial para Claude, un sistema con más de 140 herramientas que integra acceso a PostgreSQL, wrappers de APIs REST y automatización de flujos de negocio complejos.",
            "Ciclo de Vida del ML: Gestiono el ciclo completo de machine learning: recolección, limpieza y preparación de datos; entrenamiento, evaluación, optimización y despliegue de modelos.",
            "Backend Robusto: Desarrollo servicios backend asíncronos con FastAPI, utilizando PostgreSQL y aplicando principios de arquitectura limpia (routers → services → repositories).",
            "Colaboración Ágil: Colaboro activamente con el equipo de producto para definir funcionalidades, realizo revisiones de código, pruebas y resolución de problemas en un entorno de alta exigencia con equipo canadiense.",
          ],
        },
        {
          title: "Practicante Desarrollador Full-Stack (6 meses)",
          company: "SENA",
          date: "2022",
          details: [
            "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel",
            "Gestión de bases de datos MySQL",
            "Equipos ágiles con Scrum. Prácticas de 6 meses en SENA",
          ],
        },
      ],
      otherExperience: [
        {
          title: "Operador de Medios Tecnológicos",
          company: "Sector Seguridad Privada",
          date: "2021 — Mayo 2026",
          details: [
            "Gestión de Sistemas Críticos: Monitoreo en tiempo real de sistemas CCTV, alarmas y radiocomunicaciones para más de 200 usuarios, manteniendo un 99% de disponibilidad.",
            "Automatización con Python: Desarrollé scripts de automatización con Python y SQL para la gestión de inventario, reduciendo el tiempo de procesamiento manual en un 30%.",
            "Disciplina Operativa: Documentación rigurosa de procesos, gestión de incidencias y mantenimiento de infraestructura tecnológica, forjando una cultura de confiabilidad y cero errores.",
          ],
        },
      ],
      education: [
        { title: "Ingeniería de Software", school: "Politécnico Grancolombiano — 2026" },
        { title: "Bootcamp IA (Básico e Intermedio) — Talento Tech, MinTIC", school: "2025 — 2026 | 20 semanas, 33 labs: ML, DL, NLP, XAI, MLOps, Cloud" },
        { title: "Diplomado en Ciencias de la Computación", school: "Politécnico Grancolombiano — 2025" },
        { title: "Tecnólogo en Análisis y Desarrollo de Software", school: "SENA — 2020-2022" },
      ],
      certifications: "Python · FastAPI · PostgreSQL · Docker · Git & GitHub · React · TypeScript · Machine Learning · Deep Learning",
      languages: "Español (Nativo), Inglés (Intermedio)",
      sections: {
        summary: "RESUMEN PROFESIONAL",
        skills: "HABILIDADES TÉCNICAS CLAVE",
        devExperience: "EXPERIENCIA EN DESARROLLO",
        otherExperience: "OTRA EXPERIENCIA",
        education: "FORMACIÓN Y CERTIFICACIONES",
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
        <Text style={styles.role}>{lang === "en" ? "AI Software Developer" : "Desarrollador de Software IA"}</Text>

        {/* Badges */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
          {tr.badges.map((badge, i) => (
            <Text key={i} style={styles.badge}>{badge}</Text>
          ))}
        </View>

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
        <Text style={styles.skillCategory}>{lang === "en" ? "AI & Machine Learning" : "AI & Machine Learning"}</Text>
        <Text style={styles.skillList}>{tr.skills.ai_ml}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Backend & APIs" : "Backend & APIs"}</Text>
        <Text style={styles.skillList}>{tr.skills.backend_apis}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</Text>
        <Text style={styles.skillList}>{tr.skills.data_databases}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "DevOps & Practices" : "DevOps y Prácticas"}</Text>
        <Text style={styles.skillList}>{tr.skills.devops_practices}</Text>

        <View style={styles.divider} />

        {/* Development Experience */}
        <Text style={styles.sectionTitle}>{tr.sections.devExperience}</Text>
        {tr.devExperience.map((exp, i) => (
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

        {/* Other Experience */}
        <Text style={styles.sectionTitle}>{tr.sections.otherExperience}</Text>
        {tr.otherExperience.map((exp, i) => (
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

        {/* Certifications */}
        <Text style={styles.sectionTitle}>Certifications</Text>
        <Text style={styles.skillList}>{tr.certifications}</Text>

        <View style={styles.divider} />

        {/* Languages */}
        <Text style={styles.sectionTitle}>{tr.sections.languages}</Text>
        <Text style={styles.langText}>{tr.languages}</Text>
      </Page>
    </Document>
  );
};

export default CvPdf;