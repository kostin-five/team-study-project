import React, { createContext, useContext, useState, useRef } from "react";

interface Task {
  id: number;
  title: string;
  dueDate?: string; // due date in YYYY-MM-DD format (if assigned)
}

interface TaskGroups {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

interface Project {
  id: number;
  name: string;
  tasks: TaskGroups;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (name: string) => void;
  addTask: (projectId: number, title: string, dueDate?: string) => void;
  moveTask: (
    projectId: number,
    fromStatus: "todo" | "inProgress" | "done",
    toStatus: "todo" | "inProgress" | "done",
    fromIndex: number,
    toIndex: number
  ) => void;
}

// Create context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

/** Custom hook to use the ProjectContext */
export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

/** Provider component to wrap around components that need project data */
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Projects state
  const [projects, setProjects] = useState<Project[]>([
    // Initial example project with some tasks
    {
      id: 1,
      name: "Первый проект",
      tasks: {
        todo: [{ id: 1, title: "Пример задачи 1", dueDate: "2025-05-20" }],
        inProgress: [
          { id: 2, title: "Пример задачи 2", dueDate: "2025-05-18" },
        ],
        done: [{ id: 3, title: "Пример задачи 3", dueDate: "2025-05-15" }],
      },
    },
  ]);

  // Ref counters for unique IDs
  const nextProjectId = useRef(2); // start from 2 since we have initial project with id 1
  const nextTaskId = useRef(4); // next task id (initial tasks used 1,2,3)

  /** Add a new project with the given name */
  const addProject = (name: string) => {
    const newProject: Project = {
      id: nextProjectId.current,
      name,
      tasks: { todo: [], inProgress: [], done: [] },
    };
    nextProjectId.current += 1;
    setProjects((prev) => [...prev, newProject]);
  };

  /** Add a new task to a project (default to "To Do" status) */
  const addTask = (projectId: number, title: string, dueDate?: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const newTask: Task = {
            id: nextTaskId.current,
            title,
            dueDate,
          };
          nextTaskId.current += 1;
          // By default, add new task to "todo" list
          const updatedTasks: TaskGroups = {
            ...project.tasks,
            todo: [...project.tasks.todo, newTask],
          };
          return { ...project, tasks: updatedTasks };
        }
        return project;
      })
    );
  };

  /** Move or reorder a task within or between columns (statuses) */
  const moveTask = (
    projectId: number,
    fromStatus: "todo" | "inProgress" | "done",
    toStatus: "todo" | "inProgress" | "done",
    fromIndex: number,
    toIndex: number
  ) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;
        // Copy current task arrays for immutability
        const fromTasks = Array.from(project.tasks[fromStatus]);
        const toTasks =
          fromStatus === toStatus
            ? fromTasks
            : Array.from(project.tasks[toStatus]);
        // Remove task from source
        const [movedTask] = fromTasks.splice(fromIndex, 1);
        if (fromStatus === toStatus) {
          // Reordering within the same list
          fromTasks.splice(toIndex, 0, movedTask);
          // Put back reordered list into tasks group
          const newTasks: TaskGroups = {
            ...project.tasks,
            [fromStatus]: fromTasks,
          };
          return { ...project, tasks: newTasks };
        } else {
          // Inserting into a different status list
          toTasks.splice(toIndex, 0, movedTask);
          const newTasks: TaskGroups = {
            ...project.tasks,
            [fromStatus]: fromTasks,
            [toStatus]: toTasks,
          };
          return { ...project, tasks: newTasks };
        }
      })
    );
  };

  // Context value to be provided
  const value: ProjectContextType = {
    projects,
    addProject,
    addTask,
    moveTask,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
