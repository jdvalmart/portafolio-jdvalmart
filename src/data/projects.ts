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
    techs: ["React", "TypeScript", "Tailwind"],
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
];
