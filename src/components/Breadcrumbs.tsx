import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

// Mapping from route segment to breadcrumb name in Russian
const breadcrumbNameMap: { [key: string]: string } = {
  profile: "Личный кабинет",
  projects: "Проекты",
  dashboard: "Дэшбоард",
  calendar: "Календарь",
  tools: "Инструменты",
  analytics: "Аналитика",
  collaborations: "Коллаборации",
};

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  // e.g. "/projects/calendar" -> ["projects", "calendar"]

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = breadcrumbNameMap[segment] || segment;
    const isLast = index === pathSegments.length - 1;
    return (
      <Breadcrumb.Item key={url}>
        {isLast ? (
          // Last breadcrumb item: plain text
          <span>{name}</span>
        ) : (
          // Intermediate breadcrumb: clickable link
          <Link to={url}>{name}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ marginBottom: "16px" }}>{breadcrumbItems}</Breadcrumb>
  );
};

export default BreadcrumbsNav;
