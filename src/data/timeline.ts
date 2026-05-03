export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 2021,
    title: "Operador de Medios Tecnológicos",
    description:
      "Automatización de inventario con Python y SQL. Configuración de salas de cómputo. Primer contacto real con la tecnología en producción y resolución de problemas con scripts.",
  },
  {
    year: 2022,
    title: "Desarrollador Full-Stack (Prácticas SENA)",
    description:
      "Desarrollo de interfaces con Vue.js y backend con PHP/Laravel. Gestión de bases de datos MySQL. Experiencia en metodologías ágiles en equipo de desarrollo.",
  },
  {
    year: 2025,
    title: "Bootcamp IA — MinTIC",
    description:
      "20 semanas intensivas: Machine Learning, NLP, Deep Learning, XAI, MLOps. Proyectos con TensorFlow, HuggingFace, Transformer models, y despliegue de modelos.",
  },
  {
    year: 2026,
    title: "AI Engineer & ML Engineer",
    description:
      "Proyectos reales de IA desplegados: sistemas de recomendación con TF-IDF, clasificadores CNN con explicabilidad XAI, laboratorios NLP avanzados. Desarrollo full-stack con React, FastAPI y PostgreSQL.",
  },
];
