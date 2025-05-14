import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const PageLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Sidebar />
      <Layout style={{ minHeight: "100vh", width: "100%" }}>
        <Header />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            width: "100%",
            background: "#fff",
          }}
        >
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>
              <Link to="/">Главная</Link>
              <div
                style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 16 }}
              />
            </Breadcrumb.Item>
            {location.pathname.includes("/projects/") && (
              <Breadcrumb.Item>Детали проекта</Breadcrumb.Item>
            )}
            {location.pathname === "/profile" && (
              <Breadcrumb.Item>Профиль</Breadcrumb.Item>
            )}
            <div
              style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 16 }}
            />
          </Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
