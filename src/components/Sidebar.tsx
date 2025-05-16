import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  ReadOutlined,
  AreaChartOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={[
        {
          key: "/account",
          icon: <UserOutlined />,
          label: <Link to="/account">Личный кабинет</Link>,
        },
        {
          key: "/lessons",
          icon: <ReadOutlined />,
          label: <Link to="/lessons">Уроки</Link>,
        },
        {
          key: "/analytics",
          icon: <AreaChartOutlined />,
          label: <Link to="/analytics">Аналитика</Link>,
        },
        {
          key: "/projects",
          icon: <ProjectOutlined />,
          label: <Link to="/projects">Проекты</Link>,
        },
      ]}
    />
  );
};

export default Sidebar;
