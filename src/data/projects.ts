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
    title: "Book-tracker",
    description:
      "Full Stack application to manage books and personal reading progress.",
    image: "/book-tracker.png",
    techs: [
      "React",
      "TypeScript",
      "Tailwind",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Railway",
    ],
    liveUrl: "https://book-tracker1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/book-tracker",
  },
  {
    id: 2,
    title: "Blog Backend API (In Progress)",
    description:
      "Backend API built with NestJS, currently under development. Includes authentication, role-based access control, and PostgreSQL integration, following a modular and scalable architecture.",
    image: "/lista.png",
    techs: [
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "Docker",
      "Railway",
    ],
    liveUrl: "",
    repoUrl: "https://github.com/jdvalmart/blog-backend-nestjs",
  },
  {
    id: 3,
    title: "ToDo App",
    description:
      "A to-do list application developed with React, TypeScript, and Tailwind CSS, focused on demonstrating mastery of React fundamentals and good component organization practices.",
    image: "/lista.png",
    techs: ["React", "TypeScript", "Tailwind", "Vite", "Bun"],
    liveUrl: "https://todoappts1.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/todo-app-ts",
  },
  {
    id: 4,
    title: "Expense Tracker",
    description:
      "Web application for tracking personal expenses, developed with React, TypeScript and Tailwind CSS.",
    image: "/costo.png",
    techs: ["React", "TypeScript", "Bun", "Tailwind", "Vite"],
    liveUrl: "https://expenses-tracker10.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/expense-tracker?tab=readme-ov-file",
  },
  {
    id: 5,
    title: "E-commerce",
    description:
      "This is a learning project for an online store, developed with React and Vite. The main objective was to practice component architecture and global state management.",
    image: "/e-commerce.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://eccommercevalmart.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/e-commerce-react",
  },

  {
    id: 6,
    title: "Extension manager",
    description:
      "Welcome to the extensions list! This is an educational project designed to help you master the fundamentals of React, state management with Hooks, and modern styling with Tailwind CSS.",
    image: "/extension.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://extensionmanag3r.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/extensions-manager-react",
  },

  {
    id: 7,
    title: "Rick and Morty Explorer",
    description:
      "This is a learning project for an online store, developed with React and Vite. The main objective was to practice component architecture and global state management.",
    image: "/explorador.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://rickmorty-reac.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/Rick-Morty-App-React",
  },
  {
    id: 8,
    title: "GIF search",
    description:
      "This is a learning project for an online store, developed with React and Vite. The main objective was to practice component architecture and global state management.",
    image: "/gifs.png",
    techs: ["React", "Tailwind", "Vite"],
    liveUrl: "https://consulta-gifs.netlify.app/",
    repoUrl: "https://github.com/jdvalmart/consulta-gif-react",
  },
];
