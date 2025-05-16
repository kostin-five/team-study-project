import React from "react";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./Calendar.module.css";

interface Task {
  date: Dayjs;
  title: string;
}
const tasks: Task[] = [
  { date: dayjs("2025-05-10"), title: "Project Kickoff" },
  { date: dayjs("2025-05-15"), title: "Design Review" },
  { date: dayjs("2025-05-20"), title: "Release v1.0" },
];

const CalendarPage: React.FC = () => {
  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const dayTasks = tasks.filter(
      (task) => task.date.format("YYYY-MM-DD") === dateStr
    );
    return (
      <ul className={styles.taskList}>
        {dayTasks.map((task) => (
          <li key={task.title} className={styles.taskItem}>
            {task.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Calendar</h2>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default CalendarPage;
