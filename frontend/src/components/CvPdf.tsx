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
      summary: "AI Software Developer at Trajectory Inc. (Initus Area — Backend & AI Core) since June 2026. Developing and maintaining scalable AI-powered applications: researching, designing, and implementing ML models; building RAG pipelines with ChromaDB and ONNX embeddings; developing enterprise MCP (Model Context Protocol) for Claude with 140+ tools. Full ML lifecycle: data collection, cleaning, model training, evaluation, optimization, and deployment. Collaborating with product team to deliver AI-based features. Prior: 6-month Full-Stack internship (SENA, 2022) with Vue.js, PHP/Laravel, MySQL. 5+ years as Technology Media Operator in private security. AI Bootcamp MinTIC (2025-2026): 20 weeks, 33 labs in ML, DL, NLP, XAI. On-site in Bogotá, Colombia.",
      contact: {
        location: "Bogotá, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      skills: {
        languages: "Python, SQL, JavaScript",
        ai_ml: "ML algorithms (regression, classification, clustering, neural networks), LLM fine-tuning, RAG pipelines, embedding models (ONNX), vector search (ChromaDB), model serving (FastAPI), MCP, agent orchestration, model optimization",
        databases: "PostgreSQL, MySQL, ChromaDB, data cleaning, preprocessing, feature engineering",
        backend_apis: "FastAPI, REST API design, async Python, clean architecture, Node.js basics",
        frontend_mobile: "React, React Native basics, Vue.js basics",
        tools_practices: "Docker (basic), Git, CI/CD basics, Linux/Unix, code reviews, testing, agile/Scrum",
        specialties: "Python, SQL, JavaScript, AI/ML, MCP, FastAPI, PostgreSQL, ChromaDB, RAG, LLMs",
      },
      devExperience: [
        {
          title: "AI Software Developer",
          company: "Trajectory Inc. — Initus Area (Backend & AI Core)",
          date: "Jun 2026 — Present | On-site Bogotá, Colombia (Canadian company)",
          details: [
            "Develop and maintain scalable AI-powered web applications using Python, FastAPI, and React",
            "Research, design, and implement ML models: algorithm selection, data preparation, training, evaluation, and optimization",
            "Build RAG pipelines with ChromaDB, ONNX embeddings, hybrid search; LLM integration patterns for production",
            "Develop enterprise MCP (Model Context Protocol) for Claude with 140+ tools: PostgreSQL access, REST API wrappers, workflow automation, business logic",
            "Full ML lifecycle: data collection, cleaning, model training, evaluation, deployment, and monitoring",
            "Collaborate with product team to deliver AI-based features; code reviews, testing, and problem resolution",
            "Backend: FastAPI async services, PostgreSQL, clean architecture (routers→services→repositories)",
            "Docker (basic), Git, CI/CD pipelines, on-site collaboration with Canadian team",
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
            "Monitored critical security systems for 200+ users with 99% availability",
            "Managed inventory and logistics operations in private security sector",
          ],
        },
      ],
      education: [
        { title: "Software Engineering", school: "Politécnico Grancolombiano — 2026" },
        { title: "Diploma in Computer Science", school: "Politécnico Grancolombiano — 2025" },
        { title: "Software Analysis & Development", school: "SENA — 2020-2022" },
        { title: "AI Bootcamp — MinTIC (Talento Tech)", school: "2025 — 2026 | 20 weeks, 33 labs: ML, DL, NLP, XAI, MLOps, Cloud" },
      ],
      languages: "Spanish (Native), English (Intermediate)",
      sections: {
        summary: "PROFESSIONAL SUMMARY",
        skills: "TECHNICAL SKILLS",
        devExperience: "DEVELOPMENT EXPERIENCE",
        otherExperience: "OTHER EXPERIENCE",
        education: "EDUCATION",
        languages: "LANGUAGES",
      },
    },
    es: {
      summary: "Desarrollador de Software IA en Trajectory Inc. (Área Initus — Backend & AI Core) desde junio 2026. Desarrollando y manteniendo aplicaciones escalables con IA: investigando, diseñando e implementando modelos ML; construyendo pipelines RAG con ChromaDB y embeddings ONNX; desarrollando MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas. Ciclo completo de ML: recolección y limpieza de datos, entrenamiento, evaluación, optimización y despliegue de modelos. Colaboración con equipo de producto para entregar funcionalidades basadas en IA. Previa: prácticas Full-Stack 6 meses (SENA, 2022) con Vue.js, PHP/Laravel, MySQL. 5+ años como Operador de Medios Tecnológicos en seguridad privada. Bootcamp IA MinTIC (2025-2026): 20 semanas, 33 labs ML, DL, NLP, XAI. Presencial en Bogotá, Colombia.",
      contact: {
        location: "Bogotá, Colombia",
        email: "juanvalencia9411@outlook.com",
        linkedin: "linkedin.com/in/jdvalmart",
        github: "github.com/jdvalmart",
      },
      skills: {
        languages: "Python, SQL, JavaScript",
        ai_ml: "Algoritmos ML (regresión, clasificación, clustering, redes neuronales), fine-tuning de LLM, pipelines RAG, modelos de embedding (ONNX), búsqueda vectorial (ChromaDB), serving de modelos (FastAPI), MCP, orquestación de agentes, optimización de modelos",
        databases: "PostgreSQL, MySQL, ChromaDB, limpieza de datos, preprocesamiento, feature engineering",
        backend_apis: "FastAPI, diseño de REST APIs, Python asíncrono, arquitectura limpia, Node.js básico",
        frontend_mobile: "React, React Native básico, Vue.js básico",
        tools_practices: "Docker (básico), Git, CI/CD básico, Linux/Unix, revisiones de código, pruebas, ágil/Scrum",
        specialties: "Python, SQL, JavaScript, IA/ML, MCP, FastAPI, PostgreSQL, ChromaDB, RAG, LLMs",
      },
      devExperience: [
        {
          title: "Desarrollador de Software IA",
          company: "Trajectory Inc. — Área Initus (Backend & AI Core)",
          date: "Jun 2026 — Presente | Presencial Bogotá, Colombia (empresa canadiense)",
          details: [
            "Desarrollar y mantener aplicaciones web escalables con IA usando Python, FastAPI y React",
            "Investigar, diseñar e implementar modelos ML: selección de algoritmos, preparación de datos, entrenamiento, evaluación y optimización",
            "Construir pipelines RAG con ChromaDB, embeddings ONNX, búsqueda híbrida; patrones de integración LLM para producción",
            "Desarrollar MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas: acceso PostgreSQL, wrappers REST API, automatización de flujos, lógica de negocio",
            "Ciclo completo de ML: recolección y limpieza de datos, entrenamiento, evaluación, despliegue y monitoreo de modelos",
            "Colaborar con equipo de producto para definir y entregar funcionalidades IA; revisiones de código, pruebas y resolución de problemas",
            "Backend: Servicios async FastAPI, PostgreSQL, arquitectura limpia (routers→services→repositories)",
            "Docker (básico), Git, pipelines CI/CD, colaboración presencial con equipo canadiense",
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
            "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad",
            "Gestión de inventario y operaciones logísticas en sector de seguridad privada",
          ],
        },
      ],
      education: [
        { title: "Ingeniería de Software", school: "Politécnico Grancolombiano — 2026" },
        { title: "Diplomado en Ciencias de la Computación", school: "Politécnico Grancolombiano — 2025" },
        { title: "Bootcamp IA — MinTIC (Talento Tech)", school: "2025 — 2026 | 20 semanas, 33 labs: ML, DL, NLP, XAI, MLOps, Cloud" },
        { title: "Análisis y Desarrollo de Software", school: "SENA — 2020-2022" },
      ],
      languages: "Español (Nativo), Inglés (Intermedio)",
      sections: {
        summary: "RESUMEN PROFESIONAL",
        skills: "HABILIDADES TÉCNICAS",
        devExperience: "EXPERIENCIA EN DESARROLLO",
        otherExperience: "OTRA EXPERIENCIA",
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
        <Text style={styles.role}>{lang === "en" ? "AI Software Developer" : "Desarrollador de Software IA"}</Text>

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

        <Text style={styles.skillCategory}>{lang === "en" ? "Data & Databases" : "Datos y Bases de Datos"}</Text>
        <Text style={styles.skillList}>{tr.skills.databases}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Backend & APIs" : "Backend y APIs"}</Text>
        <Text style={styles.skillList}>{tr.skills.backend_apis}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Frontend & Mobile" : "Frontend y Móvil"}</Text>
        <Text style={styles.skillList}>{tr.skills.frontend_mobile}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Tools & Practices" : "Herramientas y Prácticas"}</Text>
        <Text style={styles.skillList}>{tr.skills.tools_practices}</Text>

        <Text style={styles.skillCategory}>{lang === "en" ? "Core Specialties" : "Especialidades Principales"}</Text>
        <Text style={styles.skillList}>{tr.skills.specialties}</Text>

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

        {/* Languages */}
        <Text style={styles.sectionTitle}>{tr.sections.languages}</Text>
        <Text style={styles.langText}>{tr.languages}</Text>
      </Page>
    </Document>
  );
};

export default CvPdf;