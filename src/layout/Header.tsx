import React from "react";
import { Layout } from "antd";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => (
  <AntHeader style={{ background: "#fff", padding: "0 16px" }}>
    <h2>Приложение проектов</h2>
  </AntHeader>
);

export default Header;
