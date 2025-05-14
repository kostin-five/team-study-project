import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Project, Task } from "../types";

interface ProjectsContextType {
  projects: Project[];
  addProject: (name: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id" | "completed">) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (name: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const addTask = (
    projectId: string,
    taskData: Omit<Task, "id" | "completed">
  ) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const newTask: Task = {
            id: Date.now().toString(),
            title: taskData.title,
            description: taskData.description,
            completed: false,
          };
          return { ...project, tasks: [...project.tasks, newTask] };
        }
        return project;
      })
    );
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, addTask }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjects должен использоваться внутри ProjectsProvider"
    );
  }
  return context;
};
