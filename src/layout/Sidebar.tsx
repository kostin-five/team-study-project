import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UnorderedListOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname === "/profile" ? "/profile" : "/";

  return (
    <Sider
      width={"20%"}
      style={{ borderInlineEnd: "none", boxShadow: "none", background: "#fff" }}
    >
      <Menu mode="inline" selectedKeys={[selectedKey]}>
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Проекты</Link>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UnorderedListOutlined />}>
          <Link to="/profile">Профиль</Link>
        </Menu.Item>
        <Menu.Item key="/chat" icon={<MessageOutlined />}>
          <Link to="/chat">Чат</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
