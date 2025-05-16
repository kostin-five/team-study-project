import React from "react";
import { Calendar, Badge } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { TasksData, Task } from "../../types/index";

interface CalendarViewProps {
  tasksData: TasksData;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasksData }) => {
  // Combine all tasks from all columns
  const allTasks: Task[] = [
    ...tasksData.todo,
    ...tasksData.inProgress,
    ...tasksData.done,
  ];

  const tasksOnDate = (date: Dayjs): Task[] => {
    return allTasks.filter((task) => {
      return dayjs(task.dueDate).isSame(date, "day");
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const dayTasks = tasksOnDate(value);
    if (dayTasks.length > 0) {
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {dayTasks.slice(0, 3).map((task) => (
            <li key={task.id}>
              <Badge
                color={
                  task.status === "done"
                    ? "gray"
                    : task.status === "inProgress"
                    ? "blue"
                    : "gold"
                }
                text={task.title}
              />
            </li>
          ))}
          {dayTasks.length > 3 && <li>...ещё {dayTasks.length - 3}</li>}
        </ul>
      );
    }
    return null;
  };

  return <Calendar fullscreen={false} dateCellRender={dateCellRender} />;
};

export default CalendarView;
