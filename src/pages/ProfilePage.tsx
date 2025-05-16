import React, { useState } from "react";
import { Form, Input, Button, Descriptions, message } from "antd";

interface ProfileData {
  name: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  // Profile data state (could be fetched from server; here we use local state)
  const [profile, setProfile] = useState<ProfileData>({
    name: "Иван Иванов",
    email: "ivan@example.com",
  });
  const [editing, setEditing] = useState<boolean>(false);

  // Handle profile form submission
  const onFinish = (values: ProfileData) => {
    // Save the new profile data
    setProfile(values);
    setEditing(false);
    // Show success animation/notification
    message.success("Профиль сохранён");
  };

  return (
    <div style={{ maxWidth: 400 }}>
      {editing ? (
        // Editing mode: show form to edit profile
        <Form layout="vertical" initialValues={profile} onFinish={onFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Введите email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Сохранить
            </Button>
            <Button onClick={() => setEditing(false)}>Отмена</Button>
          </Form.Item>
        </Form>
      ) : (
        // View mode: display profile info with Edit button
        <>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Имя">{profile.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          </Descriptions>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={() => setEditing(true)}
          >
            Редактировать
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
