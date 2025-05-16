import React from "react";
import { Layout } from "antd";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => (
  <AntHeader style={{ background: "#fff", padding: "0 16px" }}>
    <h1>Приложение проектов</h1>
  </AntHeader>
);

export default Header;
