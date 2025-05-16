import React, { useState } from "react";
import { useProjectContext } from "../context/ProjectsContext";
import { Button, Space } from "antd";
// Recharts library components for charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

const AnalyticsPage: React.FC = () => {
  const { projects } = useProjectContext();
  const [reportType, setReportType] = useState<"projects" | "status">(
    "projects"
  );

  // Prepare data for "By Projects" report: number of tasks per project
  const projectsData = projects.map((project) => {
    const totalTasks =
      project.tasks.todo.length +
      project.tasks.inProgress.length +
      project.tasks.done.length;
    return { name: project.name, tasks: totalTasks };
  });

  // Prepare data for "By Status" report: total tasks in To Do, In Progress, Done across all projects
  const totalTodo = projects.reduce((sum, p) => sum + p.tasks.todo.length, 0);
  const totalInProgress = projects.reduce(
    (sum, p) => sum + p.tasks.inProgress.length,
    0
  );
  const totalDone = projects.reduce((sum, p) => sum + p.tasks.done.length, 0);
  const statusData = [
    { name: "Запланировано", value: totalTodo },
    { name: "В процессе", value: totalInProgress },
    { name: "Выполнено", value: totalDone },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Аналитика</h2>
      {/* Report type selection buttons */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={reportType === "projects" ? "primary" : "default"}
          onClick={() => setReportType("projects")}
        >
          По проектам
        </Button>
        <Button
          type={reportType === "status" ? "primary" : "default"}
          onClick={() => setReportType("status")}
        >
          По статусам
        </Button>
      </Space>

      {/* Display corresponding chart based on selected report type */}
      {reportType === "projects" ? (
        // Bar chart of tasks per project
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        // Pie chart of tasks by status
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsPage;
