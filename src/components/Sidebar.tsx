import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  ToolOutlined,
  LineChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which menu item is selected based on current route
  let selectedKey: string = "";
  let openKey: string | undefined;
  const segments = path.split("/").filter(Boolean); // e.g. "/projects/calendar" -> ["projects","calendar"]
  if (segments.length > 0) {
    const section = segments[0]; // top-level section (profile, projects, tools, etc.)
    const subsection = segments[1]; // second-level (e.g., dashboard, calendar)
    if (section === "projects") {
      openKey = "projects"; // keep Projects menu open
      // If a specific subpage is in URL, select it; default to dashboard
      selectedKey = subsection ? subsection : "dashboard";
    } else {
      selectedKey = section;
      openKey = undefined;
    }
  }

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      style={{ backgroundColor: "#001529" }}
    >
      {/* Menu items with Russian labels and icons */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={openKey ? [openKey] : []}
        // Ensure the Projects submenu is open when on a projects subpage
        openKeys={openKey ? [openKey] : []}
      >
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">Личный кабинет</Link>
        </Menu.Item>
        <Menu.SubMenu key="projects" icon={<ProjectOutlined />} title="Проекты">
          <Menu.Item key="dashboard">
            <Link to="/projects/dashboard">Дэшбоард</Link>
          </Menu.Item>
          <Menu.Item key="calendar">
            <Link to="/projects/calendar">Календарь</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="tools" icon={<ToolOutlined />}>
          <Link to="/tools">Инструменты</Link>
        </Menu.Item>
        <Menu.Item key="analytics" icon={<LineChartOutlined />}>
          <Link to="/analytics">Аналитика</Link>
        </Menu.Item>
        <Menu.Item key="collaborations" icon={<TeamOutlined />}>
          <Link to="/collaborations">Коллаборации</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
