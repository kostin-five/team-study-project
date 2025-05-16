import React, { useState } from "react";
import { Radio, Divider } from "antd";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import ProjectTable from "../components/Projects/ProjectTable";
import type { Project } from "../components/Projects/ProjectTable";
import ProjectCard from "../components/Projects/ProjectCard";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"table" | "cards">("table");

  const projects: Project[] = [
    {
      id: "p1",
      name: "Project Alpha",
      status: "Active",
      description: "Alpha project description",
    },
    {
      id: "p2",
      name: "Project Beta",
      status: "Completed",
      description: "Beta project description",
    },
    {
      id: "p3",
      name: "Project Gamma",
      status: "Pending",
      description: "Gamma project description",
    },
  ];

  return (
    <div>
      <div className={styles.header}>
        <h2>Projects</h2>
        <Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
          <Radio.Button value="table">Table</Radio.Button>
          <Radio.Button value="cards">Cards</Radio.Button>
        </Radio.Group>
      </div>
      {view === "table" ? (
        <ProjectTable projects={projects} />
      ) : (
        <div className={styles.cardContainer}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      <Divider />
      <h2>Tasks</h2>
      <KanbanBoard />
    </div>
  );
};

export default Dashboard;
