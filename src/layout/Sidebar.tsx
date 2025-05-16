import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();
  // Определяем текущий выбранный пункт меню на основании маршрута
  const selectedKey = location.pathname.startsWith("/project")
    ? "projects"
    : location.pathname === "/chat"
    ? "chat"
    : location.pathname === "/profile"
    ? "profile"
    : "projects";

  return (
    <Sider breakpoint="md" collapsedWidth="0">
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ height: "100%" }}
      >
        <Menu.Item key="projects" icon={<PieChartOutlined />}>
          <Link to="/">Проекты</Link>
        </Menu.Item>
        <Menu.Item key="chat" icon={<MessageOutlined />}>
          <Link to="/chat">Чат</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">Профиль</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
