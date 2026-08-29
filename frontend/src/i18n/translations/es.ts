const es = {

    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy Juan David",
      role: "Backend Python Developer & AI Engineer en Trajectory Inc.",
      subtitle:
        "Backend Python Developer especializado en IA/ML y MCP. Construyo sistemas de IA en producción — desde herramientas MCP y pipelines RAG hasta backends FastAPI escalables. Actualmente construyendo MCP empresarial para Claude (140+ herramientas) en área Initus.",
      projectsBtn: "Proyectos",
      aboutBtn: "Sobre mí",
      cvBtn: "Descargar CV",
    },
    home: {
      stats: [
        { label: "Años de Experiencia", value: 5, suffix: "+" },
        { label: "Herramientas MCP", value: 152, suffix: "+" },
        { label: "Labs ML", value: 33, suffix: "+" },
        { label: "Actualmente en", value: 0, suffix: "Trajectory" },
      ],
      ctaTitle: "¿Tienes un proyecto de IA en mente?",
      ctaSubtitle:
        "Construyo soluciones completas de backend e IA: desde herramientas MCP y modelos ML hasta APIs escalables. Hablemos de cómo puedo ayudarte.",
      ctaContact: "Contáctame",
      ctaProjects: "Ver Proyectos",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Aplicaciones de Machine Learning, NLP, Backend y Full Stack",
      all: "Todos",
      aiMl: "IA & ML",
      fullStack: "Full Stack",
      noProjects: "No se encontraron proyectos para esta categoría.",
    },
    about: {
      title: "Sobre mí",
      p1:
        "Soy Backend Python Developer & AI Engineer en Trajectory Inc., construyendo un MCP (Model Context Protocol) empresarial para Claude con más de 140 herramientas integradas. Trabajo en el área Initus — el núcleo de backend e IA de la empresa. Mi trabajo abarca desarrollo de herramientas MCP, ingeniería backend con FastAPI, sistemas de NLP e infraestructura de IA en producción.",
      p2:
        "Mi formación en IA (MinTIC) cubrió el pipeline completo de machine learning — preparación de datos, entrenamiento, evaluación, interpretabilidad y MLOps — en 20 semanas intensivas con 33 laboratorios prácticos. Trabajo diariamente con Python, FastAPI, PostgreSQL, Docker, LLMs y arquitectura MCP.",
      p3:
        "Radicado en Palmira, Colombia. Trabajando remotamente para Trajectory Inc. (Canadá) desde el 1 de junio de 2026.",
      philosophy: "Filosofía",
      quote:
        "\"No hay ascensor hacia lo que vale la pena. Se sube por las escaleras, un escalón a la vez.\"",
      quoteAuthor: "— Juan David Valencia",
      goals: "Objetivos Actuales",
      goal1: "Dominar arquitectura MCP y ecosistemas de agentes de IA",
      goal2: "Construir y desplegar un producto SaaS personal de IA",
      goal3: "Contribuir a proyectos open-source de IA/MCP",
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
          desc: "Monitoreo de sistemas críticos de seguridad para 200+ usuarios con 99% disponibilidad. Descubrí la automatización escribiendo scripts en Python y SQL para optimizar inventario — reduciendo trabajo manual 30%.",
        },
        {
          title: "Practicante Desarrollador Full-Stack (SENA)",
          desc: "Construcción de interfaces frontend con Vue.js y APIs backend con PHP/Laravel. Gestión de bases de datos MySQL. Primera experiencia en equipos ágiles con Scrum.",
        },
        {
          title: "Bootcamp IA — MinTIC (Talento Tech)",
          desc: "20 semanas intensivas: Machine Learning, NLP, Deep Learning, XAI, MLOps y Cloud. 33 laboratorios completados con TensorFlow, HuggingFace y despliegue de modelos como APIs.",
        },
        {
          title: "Diplomado en Ciencias de la Computación",
          desc: "Patrones de arquitectura de software (SOA, JEE, .NET), algoritmos avanzados (teoría de grafos, búsqueda en texto, estructuras de datos) y análisis de complejidad en Politécnico Grancolombiano.",
        },
        {
          title: "Backend Python Developer | AI Engineer — Trajectory Inc.",
          desc: "Área Initus (Backend & AI Core). Construyendo MCP empresarial para Claude con 140+ herramientas: acceso PostgreSQL, wrappers REST API, automatización flujos, lógica de negocio. Esquemas MCP, endpoints FastAPI, optimización tool-calling LLM (>95%). NLP producción: fine-tuning Transformers, RAG (ChromaDB), XAI (LIME/SHAP), MLOps. Remoto desde Colombia desde 1 jun 2026.",
        },
      ],
    },
    certs: {
      title: "Certificaciones",
      entries: [
        { name: "Bootcamp IA", issuer: "MinTIC" },
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
        "¡Hola! Soy el asistente virtual de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y educación. ¿En qué te ayudo? \u{1F60A}",
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