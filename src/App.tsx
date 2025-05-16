import React from "react";
import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PersonalAccount from "./components/PersonalAccount";
import LessonsPage from "./components/lessons/LessonsPage";
import LessonDetail from "./components/lessons/LessonDetail";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import ProjectsPage from "./components/projects/ProjectsPage";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200}>
        <Sidebar />
      </Sider>
      <Layout >
        <Content style={{ padding: "16px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/account" replace />} />
            <Route path="/account" element={<PersonalAccount />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
