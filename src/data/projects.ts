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
    id: 1,
    title: "ToDo App",
    description:
      "Aplicación de lista de tareas desarrollada con React, TypeScript y Tailwind CSS, enfocada en demostrar dominio de los fundamentos de React y buenas prácticas de organización de componentes.",
    image: "/tarea.png",
    techs: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://todoappts1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/todo-app-ts",
  },
];
