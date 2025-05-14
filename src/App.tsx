import React from "react";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="projects/:id" element={<ProjectPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;
