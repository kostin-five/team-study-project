export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
