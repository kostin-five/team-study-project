import React, { useContext } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../App";
// import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/" : location.pathname;
  const { theme } = useContext(ThemeContext);

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      theme={theme === "dark" ? "dark" : "light"}
    >
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="/collaboration" icon={<TeamOutlined />}>
        <Link to="/collaboration">Collaboration</Link>
      </Menu.Item>
      <Menu.Item key="/analytics" icon={<BarChartOutlined />}>
        <Link to="/analytics">Analytics</Link>
      </Menu.Item>
      <Menu.Item key="/tools" icon={<ToolOutlined />}>
        <Link to="/tools">Tools</Link>
      </Menu.Item>
      <Menu.Item key="/profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
