const es = {

    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy Juan David",
      role: "Desarrollador de Software IA en Trajectory Inc.",
      subtitle:
        "Desarrollador de Software IA especializado en ML, RAG y MCP. Construyendo aplicaciones escalables con IA: investigando e implementando modelos ML, pipelines RAG con ChromaDB/ONNX, MCP empresarial para Claude (140+ herramientas). Python, SQL, JavaScript, FastAPI, React. Presencial en Bogotá.",
      projectsBtn: "Proyectos",
      aboutBtn: "Sobre mí",
      cvBtn: "Descargar CV",
    },
    home: {
      stats: [
        { label: "Años en Tech", value: 5, suffix: "+" },
        { label: "Herramientas MCP", value: 140, suffix: "+" },
        { label: "Labs ML", value: 33, suffix: "+" },
        { label: "Actualmente en", value: 0, suffix: "Trajectory" },
      ],
      ctaTitle: "¿Tienes un proyecto de IA en mente?",
      ctaSubtitle:
        "Construyo soluciones de backend e IA: desde herramientas MCP y modelos ML hasta APIs escalables. Hablemos de cómo puedo ayudarte.",
      ctaContact: "Contáctame",
      ctaProjects: "Ver Proyectos",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Aplicaciones de Machine Learning, NLP, Backend e IA",
      all: "Todos",
      aiMl: "IA & ML",
      fullStack: "Full Stack",
      noProjects: "No se encontraron proyectos para esta categoría.",
    },
    about: {
      title: "Sobre mí",
      p1:
        "Soy Desarrollador de Software IA en Trajectory Inc., construyendo aplicaciones escalables con IA en el área Initus — el núcleo de backend e IA de la empresa. Mi trabajo abarca el ciclo completo de ML: investigación y diseño de algoritmos, preparación de datos, entrenamiento, evaluación, optimización y despliegue de modelos. Construyo pipelines RAG con ChromaDB y embeddings ONNX, desarrollo MCP (Model Context Protocol) empresarial para Claude con 140+ herramientas, y colaboro con el equipo de producto para entregar funcionalidades basadas en IA.",
      p2:
        "Mi formación en IA (MinTIC) cubrió el pipeline completo de machine learning — preparación de datos, entrenamiento, evaluación, interpretabilidad y MLOps — en 20 semanas intensivas con 33 laboratorios prácticos. Trabajo diariamente con Python, FastAPI, PostgreSQL, Docker, LLMs, React y arquitectura MCP.",
      p3:
        "Radicado en Bogotá, Colombia. Trabajando presencialmente para Trajectory Inc. (Canadá) desde junio de 2026.",
      philosophy: "Filosofía",
      quote:
        "\"No hay ascensor hacia lo que vale la pena. Se sube por las escaleras, un escalón a la vez.\"",
      quoteAuthor: "— Juan David Valencia",
      goals: "Objetivos Actuales",
      goal1: "Dominar desarrollo de modelos ML y ecosistemas de agentes IA",
      goal2: "Construir y desplegar un producto SaaS personal de IA",
      goal3: "Contribuir a proyectos open-source de IA/ML",
      goal4: "Certificación cloud (AWS/GCP)",
    },
    contact: {
      title: "Contacto",
      intro:
        "Si tienes una oportunidad, una idea o simplemente quieres contactarme, estaré encantado de hablar contigo.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      subjectPlaceholder: "¿De qué se trata?",
      messagePlaceholder: "Tu mensaje...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      successTitle: "¡Gracias por contactarme!",
      successText: "Este es un portafolio demo — envíame un email directo a",
      errorText:
        "Algo salió mal. Inténtalo de nuevo o envía email directamente.",
      sendEmail: "Enviar Email",
      linkedIn: "LinkedIn",
      huggingFace: "HuggingFace",
      gitHub: "GitHub",
      validation: {
        name: "El nombre debe tener al menos 2 caracteres",
        email: "Por favor ingresa un email válido",
        subject: "El asunto debe tener al menos 3 caracteres",
        message: "El mensaje debe tener al menos 10 caracteres",
      },
    },
    skills: {
      title: "Habilidades",
    },
    featured: {
      title: "Proyectos Destacados",
      viewAll: "Ver Todos",
    },
    coreSkills: "Habilidades Principales",
    timeline: {
      title: "Línea de Tiempo",
      entries: [
        {
          title: "Inicio Estudios Tecnológicos (SENA)",
          desc: "Comencé Análisis y Desarrollo de Software mientras trabajaba tiempo completo. Primer contacto con programación, bases de datos y diseño de software.",
        },
        {
          title: "Operador de Medios Tecnológicos",
          desc: "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad. Gestión de inventario y operaciones logísticas en sector de seguridad privada.",
        },
        {
          title: "Practicante Desarrollador Full-Stack (SENA) — 6 meses",
          desc: "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel. Gestión de bases de datos MySQL. Primera experiencia en equipos ágiles con Scrum. Prácticas de 6 meses.",
        },
        {
          title: "Diplomado en Ciencias de la Computación",
          desc: "Patrones de arquitectura de software (SOA, JEE, .NET), algoritmos avanzados (teoría de grafos, búsqueda en texto, estructuras de datos) y análisis de complejidad en Politécnico Grancolombiano.",
        },
        {
          title: "Backend Python Developer | AI Engineer — Trajectory Inc.",
          desc: "Área Initus (Backend & AI Core). Construyendo MCP empresarial para Claude con 140+ herramientas: acceso PostgreSQL, wrappers REST API, automatización flujos, lógica de negocio. Esquemas MCP, endpoints FastAPI, optimización tool-calling LLM. Pipelines RAG: ChromaDB, embeddings ONNX, búsqueda híbrida. Backend: FastAPI async, PostgreSQL, arquitectura limpia. Presencial en Bogotá para empresa canadiense.",
        },
      ],
    },
    certs: {
      title: "Certificaciones y Formación",
      entries: [
        { name: "Bootcamp IA — MinTIC (Talento Tech)", issuer: "2025 — 2026 | 20 semanas, 33 labs" },
        { name: "Diplomado en C.C.", issuer: "Politécnico" },
        { name: "Ing. de Software", issuer: "Politécnico" },
        { name: "Desarrollo Soft.", issuer: "SENA" },
      ],
    },
    footer: {
      builtWith: "Construido con React · TypeScript · Tailwind",
      rights: "Todos los derechos reservados.",
    },
    chatbot: {
      welcome:
        "¡Hola! Soy el asistente virtual de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y formación. ¿En qué te ayudo? \u{1F60A}",
      assistant: "Asistente IA",
      placeholder: "Pregúntame lo que quieras...",
      sendMessage: "Enviar mensaje",
      closeChat: "Cerrar chat",
      openChat: "Abrir chat",
      fallback:
        "Pregunta interesante. No tengo información específica sobre eso, pero puedo contarte sobre los proyectos, habilidades y experiencia de Juan David. ¿Qué te gustaría saber? \u{1F60A}",
    },
    darkMode: {
      light: "Cambiar a modo claro",
      dark: "Cambiar a modo oscuro",
    },
    skipToContent: "Saltar al contenido",
    backToTop: "Volver arriba",
    projectCard: {
      viewDemo: "Ver Demo",
      codeRepo: "Repositorio",
      accuracy: "precisión",
      labs: "labs",
      books: "libros",
      details: "Detalles",
    },
  }

export default es;