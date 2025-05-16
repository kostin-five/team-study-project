import React from "react";
import { Card } from "antd";
import type { Project } from "./ProjectTable";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card title={project.name} className={styles.card}>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>{project.description}</p>
    </Card>
  );
};

export default ProjectCard;
