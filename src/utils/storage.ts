// Utility functions for localStorage data persistence
import type { Lesson, TasksData } from "../types/index";

const LS_LESSONS = "lessons";
const LS_TASKS = "tasks";
const LS_TASK_ID = "taskIdCounter";
const LS_LESSON_ID = "lessonIdCounter";
const LS_TASK_EVENTS = "taskCompletions";
const LS_TEST_EVENTS = "testResults";
const LS_USER = "userName";

export function loadLessons(): Lesson[] {
  try {
    const data = localStorage.getItem(LS_LESSONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLessons(lessons: Lesson[]): void {
  localStorage.setItem(LS_LESSONS, JSON.stringify(lessons));
}

export function loadTasksData(): TasksData {
  try {
    const data = localStorage.getItem(LS_TASKS);
    if (data) {
      return JSON.parse(data);
    }
  } catch {}
  // Initialize default empty structure if none
  return { todo: [], inProgress: [], done: [] };
}

export function saveTasksData(tasksData: TasksData): void {
  localStorage.setItem(LS_TASKS, JSON.stringify(tasksData));
}

export function getNextTaskId(): string {
  let idCounter = 0;
  const stored = localStorage.getItem(LS_TASK_ID);
  if (stored) {
    idCounter = parseInt(stored, 10) || 0;
  }
  idCounter += 1;
  localStorage.setItem(LS_TASK_ID, idCounter.toString());
  return `task-${idCounter}`;
}

export function getNextLessonId(): string {
  let idCounter = 0;
  const stored = localStorage.getItem(LS_LESSON_ID);
  if (stored) {
    idCounter = parseInt(stored, 10) || 0;
  }
  idCounter += 1;
  localStorage.setItem(LS_LESSON_ID, idCounter.toString());
  return `lesson-${idCounter}`;
}

// Log a task completion event (timestamp)
export function addTaskCompletion(): void {
  const timestamp = Date.now();
  try {
    const data = localStorage.getItem(LS_TASK_EVENTS);
    const events: number[] = data ? JSON.parse(data) : [];
    events.push(timestamp);
    localStorage.setItem(LS_TASK_EVENTS, JSON.stringify(events));
  } catch {
    localStorage.setItem(LS_TASK_EVENTS, JSON.stringify([timestamp]));
  }
}

// Log a test completion event (timestamp)
export function addTestResult(): void {
  const timestamp = Date.now();
  try {
    const data = localStorage.getItem(LS_TEST_EVENTS);
    const events: number[] = data ? JSON.parse(data) : [];
    events.push(timestamp);
    localStorage.setItem(LS_TEST_EVENTS, JSON.stringify(events));
  } catch {
    localStorage.setItem(LS_TEST_EVENTS, JSON.stringify([timestamp]));
  }
}

export function loadTaskEvents(): number[] {
  try {
    const data = localStorage.getItem(LS_TASK_EVENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function loadTestEvents(): number[] {
  try {
    const data = localStorage.getItem(LS_TEST_EVENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function loadUserName(): string {
  const name = localStorage.getItem(LS_USER);
  return name || "";
}

export function saveUserName(name: string): void {
  localStorage.setItem(LS_USER, name);
}
