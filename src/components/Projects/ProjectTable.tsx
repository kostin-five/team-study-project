import React from "react";
import { Table } from "antd";
import styles from "./ProjectTable.module.css";

export interface Project {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <div className={styles.tableWrapper}>
      <Table<Project>
        columns={columns}
        dataSource={projects}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default ProjectTable;
