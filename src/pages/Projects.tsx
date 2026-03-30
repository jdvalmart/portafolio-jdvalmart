import React from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const Projects: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py16 px-4">
      <h2 className="text-gray-800 text-center mb-10">
        Scalable Full Stack applications with backend and AI integration
      </h2>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
