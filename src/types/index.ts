export interface Lesson {
  id: string;
  title: string;
  description: string;
  test: LessonTest;
}

export interface LessonTest {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: number; // timestamp
  status: "todo" | "inProgress" | "done";
}

export type TasksData = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};
