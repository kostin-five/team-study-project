import React from "react";
import { List } from "antd";
import styles from "./Analytics.module.css";

const Analytics: React.FC = () => {
  const reports = [
    "Weekly Status Report",
    "Project Milestones",
    "Team Performance",
    "Budget Overview",
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.reportsList}>
        <h2>Reports</h2>
        <List
          size="small"
          bordered
          dataSource={reports}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
      <div className={styles.chart}>
        <h2>Overview</h2>
        <div className={styles.chartPlaceholder}>Graph Placeholder</div>
      </div>
    </div>
  );
};

export default Analytics;
