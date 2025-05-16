import React, { createContext, useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CalendarPage from "./pages/Calendar";
import Collaboration from "./pages/Collaboration";
import Profile from "./pages/Profile";
import Tools from "./pages/Tools";
import { Routes, Route } from "react-router-dom";

interface ThemeContextType {
  theme: "light" | "dark";
  updateTheme: (newTheme: "light" | "dark") => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  updateTheme: () => {},
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  const updateTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Sider theme={theme === "dark" ? "dark" : "light"}>
          <Sidebar />
        </Layout.Sider>
        <Layout>
          <Layout.Header
            style={{
              background: theme === "dark" ? "#1f1f1f" : "#fff",
              padding: "0 16px",
            }}
          >
            <h1 className="header-title">Team Study Project</h1>
          </Layout.Header>
          <Layout.Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tools" element={<Tools />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </ThemeContext.Provider>
  );
};

export default App;
