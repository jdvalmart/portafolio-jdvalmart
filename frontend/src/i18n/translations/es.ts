const es = {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mi",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy Juan David",
      role: "AI Developer en Trajectory Inc.",
      subtitle:
        "Ingeniero de Software especializado en IA, NLP y desarrollo Backend. Construyo sistemas de IA en produccion — desde herramientas MCP y pipelines de ML hasta APIs escalables.",
      projectsBtn: "Proyectos",
      aboutBtn: "Sobre mi",
      cvBtn: "Descargar CV",
    },
    home: {
      stats: [
        { label: "Años de Experiencia", value: 5, suffix: "+" },
        { label: "Herramientas MCP", value: 140, suffix: "+" },
        { label: "Labs ML", value: 33, suffix: "+" },
        { label: "Actualmente en", value: 0, suffix: "Trajectory" },
      ],
      ctaTitle: "¿Tienes un proyecto de IA en mente?",
      ctaSubtitle:
        "Construyo soluciones completas de backend e IA: desde herramientas MCP y modelos ML hasta APIs escalables. Hablemos de como puedo ayudarte.",
      ctaContact: "Contactame",
      ctaProjects: "Ver Proyectos",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Aplicaciones de Machine Learning, NLP, Backend y Full Stack",
      all: "Todos",
      aiMl: "IA & ML",
      fullStack: "Full Stack",
      noProjects: "No se encontraron proyectos para esta categoria.",
    },
    about: {
      title: "Sobre mi",
      p1:
        "Soy AI Developer en Trajectory Inc., construyendo un MCP (Model Context Protocol) empresarial para Claude con mas de 140 herramientas integradas. Trabajo en el area Initus — el nucleo de backend e IA de la empresa. Mi trabajo abarca desarrollo de herramientas MCP, ingenieria backend con FastAPI, sistemas de NLP e infraestructura de IA en produccion.",
      p2:
        "Mi formacion en IA (MinTIC) cubrio el pipeline completo de machine learning — preparacion de datos, entrenamiento, evaluacion, interpretabilidad y MLOps — en 20 semanas intensivas con 33 laboratorios practicos. Trabajo diariamente con Python, FastAPI, PostgreSQL, Docker, LLMs y arquitectura MCP.",
      p3:
        "Radicado en Palmira, Colombia. Trabajando remotamente para Trajectory Inc. (Canada) desde junio de 2026.",
      philosophy: "Filosofia",
      quote:
        "\"No hay ascensor hacia lo que vale la pena. Se sube por las escaleras, un escalon a la vez.\"",
      quoteAuthor: "— Juan David Valencia",
      goals: "Objetivos Actuales",
      goal1: "Dominar arquitectura MCP y ecosistemas de agentes de IA",
      goal2: "Construir y desplegar un producto SaaS personal de IA",
      goal3: "Contribuir a proyectos open-source de IA/MCP",
      goal4: "Certificacion cloud (AWS/GCP)",
    },
    contact: {
      title: "Contacto",
      intro:
        "Si tienes una oportunidad, una idea o simplemente quieres contactarme, estare encantado de hablar contigo.",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@correo.com",
      subjectPlaceholder: "¿De que se trata?",
      messagePlaceholder: "Tu mensaje...",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
      successTitle: "¡Gracias por contactarme!",
      successText: "Este es un portafolio demo — enviame un correo directo a",
      errorText:
        "Algo salio mal. Intenta de nuevo o envia un correo directamente.",
      sendEmail: "Enviar Correo",
      linkedIn: "LinkedIn",
      huggingFace: "HuggingFace",
      gitHub: "GitHub",
      validation: {
        name: "El nombre debe tener al menos 2 caracteres",
        email: "Ingresa un correo valido",
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
      title: "Linea de Experiencia",
      entries: [
        {
          title: "Inicie estudios de tecnologia (SENA)",
          desc: "Comencé el programa de Analisis y Desarrollo de Software mientras trabajaba tiempo completo. Primer contacto con programacion, bases de datos y diseno de software.",
        },
        {
          title: "Operador de Medios Tecnologicos",
          desc: "Monitoree sistemas de seguridad criticos para mas de 200 usuarios con 99% de disponibilidad. Descubri la automatizacion escribiendo scripts en Python y SQL para optimizar el inventario — reduciendo el trabajo manual en un 30%.",
        },
        {
          title: "Practicas como Desarrollador Full-Stack (SENA)",
          desc: "Construi interfaces frontend con Vue.js y APIs backend con PHP/Laravel. Administre bases de datos MySQL. Primera experiencia en equipos agiles con Scrum.",
        },
        {
          title: "Bootcamp IA — MinTIC",
          desc: "20 semanas intensivas con Talento Tech: Machine Learning, NLP, Deep Learning, XAI, MLOps y Cloud. 33 laboratorios completados con TensorFlow, HuggingFace y despliegue de modelos como APIs.",
        },
        {
          title: "Diplomado en Ciencias de la Computacion",
          desc: "Arquitectura de software (SOA, JEE, .NET), algoritmia avanzada (teoria de grafos, busqueda en texto, estructuras de datos) y analisis de complejidad en el Politecnico Grancolombiano.",
        },
        {
          title: "AI Developer — Trajectory Inc.",
          desc: "Desarrollando un MCP empresarial para Claude con mas de 140 herramientas integradas en el area Initus (backend e IA). El MCP conecta a Claude con todos los datos, APIs y flujos de la empresa. Trabajando remotamente desde Colombia para esta empresa canadiense desde junio de 2026.",
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
        "¡Hola! Soy el asistente virtual de Juan David. Puedo contarte sobre sus habilidades, proyectos, experiencia y educacion. ¿En que puedo ayudarte? \u{1F60A}",
      assistant: "Asistente IA",
      placeholder: "Preguntame lo que quieras...",
      sendMessage: "Enviar mensaje",
      closeChat: "Cerrar chat",
      openChat: "Abrir chat",
      fallback:
        "Pregunta interesante. No tengo informacion especifica sobre eso, pero puedo contarte sobre los proyectos, habilidades y experiencia de Juan David. ¿Que te gustaria saber? \u{1F60A}",
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
      accuracy: "precision",
      labs: "labs",
      books: "libros",
      details: "Detalles",
    },
  },

export default es;
