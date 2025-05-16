import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

/** Header bar (no theme switch, can include branding or user info if needed) */
const HeaderBar: React.FC = () => {
  return (
    <Header
      style={{
        padding: "0 16px",
        backgroundColor: "#001529" /* match sidebar dark background */,
      }}
    >
      {/* No theme toggle here. You can include logo or user info if required. */}
      <div style={{ color: "#fff", fontSize: "16px" }}>Team Study Project</div>
    </Header>
  );
};

export default HeaderBar;
