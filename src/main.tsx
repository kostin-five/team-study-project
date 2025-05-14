// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import { ProjectsProvider } from "./store/ProjectsContext";
import "antd/dist/reset.css"; // импорт стилей Ant Design

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ProjectsProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ProjectsProvider>
  </BrowserRouter>
);
