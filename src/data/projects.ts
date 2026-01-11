export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techs: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ToDo App",
    description:
      "Aplicación de lista de tareas desarrollada con React, TypeScript y Tailwind CSS, enfocada en demostrar dominio de los fundamentos de React y buenas prácticas de organización de componentes.",
    image: "/lista.png",
    techs: ["React", "TypeScript", "Tailwind", "Vite", "Bun"],
    liveUrl: "https://todoappts1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/todo-app-ts",
  },
  {
    id: 2,
    title: "E-commerce",
    description:
      "Este es un proyecto de aprendizaje de una tienda virtual, desarrollado con React y Vite. El objetivo principal fue practicar la arquitectura de componentes y la gestión de estado global.",
    image: "/e-commerce.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://eccommercevalmart.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/e-commerce-react",
  },
  {
    id: 3,
    title: "Manejador de extensiones",
    description:
      "¡Bienvenido a la lista de extensiones! Este es un proyecto educativo diseñado para dominar los fundamentos de React, el manejo de estado con Hooks, y la estilización moderna con Tailwind CSS.",
    image: "/extension.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://extensionmanag3r.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/extensions-manager-react",
  },

  {
    id: 4,
    title: "Explorador de Rick and Morty",
    description:
      "Este es un proyecto de aprendizaje de una tienda virtual, desarrollado con React y Vite. El objetivo principal fue practicar la arquitectura de componentes y la gestión de estado global.",
    image: "/explorador.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://rickmorty-reac.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/Rick-Morty-App-React",
  },
  {
    id: 5,
    title: "Consulta de Gifs",
    description:
      "Este es un proyecto de aprendizaje de una tienda virtual, desarrollado con React y Vite. El objetivo principal fue practicar la arquitectura de componentes y la gestión de estado global.",
    image: "/gifs.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://consulta-gifs.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/consulta-gif-react",
  },
];
