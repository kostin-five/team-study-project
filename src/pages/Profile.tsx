import React, { useContext } from "react";
import { Form, Input, Select, Button, Switch, message } from "antd";
import { ThemeContext } from "../App";
import styles from "./Profile.module.css";

interface ProfileData {
  name: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const storedProfile = localStorage.getItem("profile");
  const initialProfile: ProfileData = storedProfile
    ? JSON.parse(storedProfile)
    : { name: "", email: "", role: "User" };

  const [form] = Form.useForm<ProfileData>();

  const onFinish = (values: ProfileData) => {
    localStorage.setItem("profile", JSON.stringify(values));
    message.success("Profile saved successfully");
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialProfile}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Guest">Guest</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Profile
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.themeToggle}>
        <span>Theme:</span>
        <Switch
          checked={theme === "dark"}
          onChange={(checked) => updateTheme(checked ? "dark" : "light")}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
    </div>
  );
};

export default Profile;
