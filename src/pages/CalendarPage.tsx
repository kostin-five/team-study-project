import React from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useProjectContext } from "../context/ProjectsContext";

interface TaskEvent {
  date: string;
  title: string;
  project: string;
}

const CalendarPage: React.FC = () => {
  const { projects } = useProjectContext();

  // Gather all tasks from all projects to display on the calendar
  const allTaskEvents: TaskEvent[] = [];
  projects.forEach((project) => {
    const projectName = project.name;
    // Collect tasks from each status
    ["todo", "inProgress", "done"].forEach((status) => {
      const tasksArray =
        project.tasks[status as "todo" | "inProgress" | "done"];
      tasksArray.forEach((task) => {
        if (task.dueDate) {
          allTaskEvents.push({
            date: task.dueDate,
            title: task.title,
            project: projectName,
          });
        }
      });
    });
  });

  // Custom rendering of date cells to show task names on their due dates
  const dateCellRender = (date: Dayjs) => {
    const dateString = date.format("YYYY-MM-DD");
    const tasksForDate = allTaskEvents.filter(
      (task) => task.date === dateString
    );
    if (tasksForDate.length) {
      return (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {tasksForDate.map((task, index) => (
            <li key={index} style={{ fontSize: "12px" }}>
              {/* Display project name and task title */}
              <strong>{task.project}:</strong> {task.title}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default CalendarPage;
