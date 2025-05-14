import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

interface ProfileData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      form.setFieldsValue(JSON.parse(stored));
    }
  }, [form]);

  const onFinish = (values: ProfileData) => {
    localStorage.setItem("profile", JSON.stringify(values));
  };

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Имя">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
