// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/Header"; // Header component (without theme toggle now)
import BreadcrumbsNav from "./components/Breadcrumbs";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import ToolsPage from "./pages/ToolsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CollaborationsPage from "./pages/CollaborationsPage";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar with navigation tabs */}
      <Sidebar />
      <Layout>
        {/* Top header bar (now without theme switch) */}
        <HeaderBar />
        {/* Main content area with breadcrumbs and page content */}
        <Content style={{ padding: "16px" }}>
          {/* Breadcrumb navigation */}
          <BreadcrumbsNav />
          {/* Define application routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/projects/dashboard" element={<DashboardPage />} />
            <Route path="/projects/calendar" element={<CalendarPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            {/* Fallback for any unknown routes */}
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
